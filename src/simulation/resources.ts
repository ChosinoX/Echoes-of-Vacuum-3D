import type { BuildingType,ResourceKey,Resources } from '../types';
export const INITIAL_RESOURCES:Resources={energy:86,oxygen:72,water:61,food:48,metal:340,crystals:24,colonists:5};
export const COSTS:Record<BuildingType,Partial<Record<ResourceKey,number>>>={command:{metal:0},solar:{metal:45,crystals:4},oxygen:{metal:70,crystals:8},hydroponics:{metal:90,water:8},mining:{metal:110,crystals:6},storage:{metal:55},habitat:{metal:80,crystals:4}};
export const LABELS:Record<BuildingType,string>={command:'Command Center',solar:'Solar Plant',oxygen:'Oxygen Generator',hydroponics:'Hydroponics',mining:'Mining Complex',storage:'Storage',habitat:'Habitat'};
export function canAfford(r:Resources,type:BuildingType){return Object.entries(COSTS[type]).every(([k,v])=>r[k as ResourceKey]>=v!)}
export function pay(r:Resources,type:BuildingType){for(const [k,v] of Object.entries(COSTS[type]))r[k as ResourceKey]-=v!}
export function tickResources(r:Resources,counts:Record<BuildingType,number>,dt:number){r.energy=Math.min(100,r.energy+dt*(counts.solar*0.35-counts.oxygen*0.07-counts.hydroponics*0.06-0.02));r.oxygen=Math.min(100,r.oxygen+dt*(counts.oxygen*0.18-r.colonists*.012));r.water=Math.min(100,r.water+dt*(counts.hydroponics*.025-r.colonists*.005));r.food=Math.min(100,r.food+dt*(counts.hydroponics*.09-r.colonists*.009));r.metal+=dt*counts.mining*.018;r.crystals+=dt*counts.mining*.003}
