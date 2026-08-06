export interface IGameSystem {
  getConfig(key?:string): GameConfig | null;
}