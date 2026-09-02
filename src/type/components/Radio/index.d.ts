export interface RadioOption {
  text?: string;
  value: number | string;
}

export interface RadioProps extends React.ComponentPropsWithRef<React.ElementType> {
  /** 当前值（双向绑定） */
  value: number | string;
  /** 值变化事件（用于双向绑定） */
  onInput: (value: number | string) => void;
  /** 值改变事件（选择完成后触发） */
  onChange?: (value: number | string) => void;
  /** 选项列表 */
  options: RadioOption[];
  /** 主题色，默认 $theme-color */
  color?: string;
}
