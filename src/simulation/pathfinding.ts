import {Vector3} from 'three';
export class Mover{target:Vector3|null=null;constructor(public position:Vector3,public speed:number){} setTarget(v:Vector3){this.target=v.clone()} update(dt:number){if(!this.target)return;const d=this.target.clone().sub(this.position);if(d.length()<.15){this.target=null;return}this.position.add(d.normalize().multiplyScalar(Math.min(this.speed*dt,d.length())))}}
