import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export interface ComponentOwnProps<E extends ElementType = ElementType> {
  /** 渲染的组件或 HTML 元素，省略时默认为 div */
  is?: E;
  /** 子节点 */
  children?: ReactNode;
}

export type ComponentProps<E extends ElementType = ElementType> = ComponentOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof ComponentOwnProps<E>>;
