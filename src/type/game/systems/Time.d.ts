export interface Time {
  currentTime: Date;
  timeScale: number;
}

export interface TimeConfig {
  /**
   * 时间比例
   */
  timeScale?: number;
}