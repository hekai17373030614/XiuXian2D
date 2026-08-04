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

export class SystemTime implements Time {
  currentTime: Date;
  timeScale: number;
  constructor(config: TimeConfig = {}) {
    const { timeScale = 200 } = config;
    this.currentTime = new Date();
    this.timeScale = timeScale;
  }

  /** 更新时间比例 */
  setTimeScale(scale: number) {
    this.timeScale = scale;
  }

  /** 推进游戏时间（秒） */
  advanceTime(realSeconds: number) {
    const gameSeconds = realSeconds * this.timeScale;
    this.currentTime = new Date(this.currentTime.getTime() + gameSeconds * 1000);
  }

  getTime(temp?: string) {
    if (!temp) {
      return this.currentTime;
    }
    const year = this.currentTime.getFullYear();
    const month = this.currentTime.getMonth() + 1;
    const day = this.currentTime.getDate();
    const hour = this.currentTime.getHours();
    const minute = this.currentTime.getMinutes();
    const second = this.currentTime.getSeconds();

    return temp
      .replaceAll(/(y|Y){4}/g, year.toString())
      .replaceAll(/MM/g, month.toString())
      .replaceAll(/(d|D){2}/g, day.toString())
      .replaceAll(/HH/g, hour.toString())
      .replaceAll(/hh/g, (hour % 12).toString())
      .replaceAll(/mm/g, minute.toString())
      .replaceAll(/(s|S){2}/g, second.toString());
  }
}
