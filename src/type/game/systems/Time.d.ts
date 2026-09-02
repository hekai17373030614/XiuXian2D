export interface Time {
  timeScale: number;
  getTime(temp?: string): Date | string;
  setTimeScale?: (scale: number) => void;
  advanceTime?: (realSeconds: number) => void;
}

export interface TimeConfig {
  /**
   * 时间比例
   */
  timeScale?: number;
}
