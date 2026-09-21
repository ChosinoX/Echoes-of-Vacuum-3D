import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';import type{Group}from'three';
/** Production asset seam: authored GLB files replace procedural preview meshes without touching gameplay. */
export class AssetPipeline{private loader=new GLTFLoader();async load(url:string):Promise<Group>{return(await this.loader.loadAsync(url)).scene}}
