/**
 * 时间系统
 * 主要想法：
 * 1. 获取现实时间
 * 2. 通过比例稀释现实时间，以一天为单位。稀释后时间度过以月为单位。
 * 3. 储存时间比例
 * 4. 可以控制时间流速？
 * 5. 直接跳过一段时间
 */
import type { Time, TimeConfig } from '@/type/game/systems/Time';

class SystemTime implements Time {
  currentTime: Date;
  timeScale: number;
  constructor(config: TimeConfig = {}) {
    const { timeScale = 30 } = config;
    this.currentTime = new Date();
    this.timeScale = timeScale;
  }
  update(scale: number) {

  }
}