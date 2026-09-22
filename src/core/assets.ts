import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader=new GLTFLoader(),cache=new Map<string,Promise<THREE.Group>>();
async function source(url:string){if(!cache.has(url))cache.set(url,loader.loadAsync(url).then(g=>g.scene));return cache.get(url)!}
export async function attachGLB(target:THREE.Group,url:string,targetHeight:number,offset=new THREE.Vector3()){
 const model=(await source(url)).clone(true),box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3());
 model.scale.setScalar(targetHeight/Math.max(size.y,.001));
 const fitted=new THREE.Box3().setFromObject(model),center=fitted.getCenter(new THREE.Vector3());
 model.position.set(-center.x+offset.x,-fitted.min.y+offset.y,-center.z+offset.z);
 model.traverse(o=>{if(o instanceof THREE.Mesh){o.castShadow=true;o.receiveShadow=true}});
 target.add(model);return model
}
export class AssetPipeline{async load(url:string){return(await source(url)).clone(true)}}
