import type { SaveData } from '../types';
const KEY='echoes-of-vacuum-3d-save-v1';
export const saveGame=(data:SaveData)=>localStorage.setItem(KEY,JSON.stringify(data));
export function loadGame():SaveData|null{try{const v=JSON.parse(localStorage.getItem(KEY)??'null') as SaveData|null;return v?.version===1?v:null}catch{return null}}
