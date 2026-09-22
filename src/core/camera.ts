import * as THREE from 'three';

export class StrategyCamera {
  camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, .1, 300);
  target = new THREE.Vector3();
  yaw = .72;
  pitch = .78;
  distance = 38;
  private dragMode: 'pan' | 'rotate' | null = null;
  private last = new THREE.Vector2();
  private keys = new Set<string>();

  constructor(private dom: HTMLElement) {
    this.dom.style.touchAction = 'none';
    this.bind();
    this.update();
  }

  private bind() {
    this.dom.addEventListener('wheel', e => {
      e.preventDefault();
      this.distance = THREE.MathUtils.clamp(this.distance + e.deltaY * .025, 10, 80);
    }, { passive: false });
    this.dom.addEventListener('pointerdown', e => {
      if (e.button === 1 || e.button === 2) {
        this.dragMode = e.button === 2 ? 'rotate' : 'pan';
        this.last.set(e.clientX, e.clientY);
        this.dom.setPointerCapture(e.pointerId);
      }
    });
    this.dom.addEventListener('pointerup', e => {
      this.dragMode = null;
      if (this.dom.hasPointerCapture(e.pointerId)) this.dom.releasePointerCapture(e.pointerId);
    });
    this.dom.addEventListener('pointercancel', () => this.dragMode = null);
    this.dom.addEventListener('contextmenu', e => e.preventDefault());
    this.dom.addEventListener('pointermove', e => {
      if (!this.dragMode) return;
      const dx = e.clientX - this.last.x, dy = e.clientY - this.last.y;
      this.last.set(e.clientX, e.clientY);
      if (this.dragMode === 'rotate') {
        this.yaw -= dx * .006;
        this.pitch = THREE.MathUtils.clamp(this.pitch + dy * .005, .3, 1.35);
      } else this.pan(-dx * .035, -dy * .035);
    });
    addEventListener('keydown', e => {
      if (['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyQ','KeyE','Home'].includes(e.code)) {
        if (e.code === 'Home') this.reset(); else this.keys.add(e.code);
        e.preventDefault();
      }
    });
    addEventListener('keyup', e => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());
  }

  private pan(rightAmount: number, forwardAmount: number) {
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this.target.addScaledVector(right, rightAmount).addScaledVector(forward, forwardAmount);
    this.target.x = THREE.MathUtils.clamp(this.target.x, -58, 58);
    this.target.z = THREE.MathUtils.clamp(this.target.z, -58, 58);
  }

  private keyboard(dt: number) {
    const speed = 18 * dt * THREE.MathUtils.clamp(this.distance / 38, .55, 1.7);
    let right = 0, forward = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) right -= speed;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) right += speed;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) forward -= speed;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) forward += speed;
    if (right || forward) this.pan(right, forward);
    if (this.keys.has('KeyQ')) this.yaw += 1.15 * dt;
    if (this.keys.has('KeyE')) this.yaw -= 1.15 * dt;
  }

  reset() { this.target.set(0,0,0); this.yaw=.72; this.pitch=.78; this.distance=38; }

  update(dt=0) {
    if (dt) this.keyboard(dt);
    this.camera.position.set(
      this.target.x + Math.sin(this.yaw)*Math.cos(this.pitch)*this.distance,
      this.target.y + Math.sin(this.pitch)*this.distance,
      this.target.z + Math.cos(this.yaw)*Math.cos(this.pitch)*this.distance
    );
    this.camera.lookAt(this.target);
  }
}
