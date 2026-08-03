export interface TimeControllerProps {
  /** 第三个快进速度，范围 2-30 的整数 */
  customSpeed?: number;
  /** 当前快进速度（v-model） */
  value: number;
  /** 快进速度变化事件 */
  onChange: (speed: number) => void;
  /** 移动端模式 */
  isMobile?: boolean;
}