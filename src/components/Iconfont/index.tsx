/* eslint-disable */

import type { SVGAttributes, FunctionComponent } from 'react';
import IconXiangqing from './IconXiangqing';
export { default as IconXiangqing } from './IconXiangqing';

export type IconNames = 'xiangqing';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'xiangqing':
      return <IconXiangqing {...rest} />;
    default:
      return null;
  }
};

export default IconFont;
