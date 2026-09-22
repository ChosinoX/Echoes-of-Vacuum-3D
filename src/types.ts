import type { Vector3 } from 'three';
export type ResourceKey='energy'|'oxygen'|'water'|'food'|'metal'|'crystals';
export interface Resources extends Record<ResourceKey,number>{colonists:number}
export type BuildingType='command'|'solar'|'oxygen'|'hydroponics'|'mining'|'storage'|'habitat';
export interface BuildingData{ id:string; type:BuildingType; position:[number,number,number]; rotation:number; progress:number; materialsDelivered?:boolean }
export interface SaveData{version:1;resources:Resources;buildings:BuildingData[];rover:[number,number,number];sol:number}
export interface Selectable{kind:'rover'|'building';id:string;objectPosition:Vector3}
