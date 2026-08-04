import { SystemTime } from '../TimeSystem/index';

export class WorldSystem {
  systemTime: SystemTime;
  constructor() {
    this.systemTime = new SystemTime();
  }
  getTime(temp?: string) {
    return this.systemTime.getTime(temp);
  }
}