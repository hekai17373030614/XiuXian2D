import type { ElementType } from 'react';
import type { ComponentProps } from '@/type/components/Component';

export default function Component<E extends ElementType = ElementType>({
  is,
  children,
  ...rest
}: ComponentProps<E>) {
  const Tag = (is ?? 'div') as ElementType;
  return <Tag {...rest}>{children}</Tag>;
}
