import type {IGameSystem} from '@/type/components/GameSystem/type';
import { cloneDeep } from 'es-toolkit';

export class GameSystem implements IGameSystem {
  config: GameConfig;
  constructor(config: GameConfig) {
    this.config = config;
  }

  getConfig(key?:string) {
    if(!key) {
      return Object.freeze(cloneDeep(this.config));
    }
    const path = key.split('.');
    let config = this.config;
    for(const p of path) {
      config = config[p];
      if(!config) {
        return null;
      }
    }
    return Object.freeze(cloneDeep(config));
  }

  setConfig(nConfig: Partial<GameConfig>) {
    
  }
}