/* eslint-disable */

import type { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconXiangqing: FunctionComponent<Props> = ({ size = 14, color, style: _style, className, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  /* prettier-ignore */
  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} className={className} style={style} {...rest}>
      <path
        d="M527.63663 877.280404c211.094766 0 382.205888-171.123402 382.205888-382.204865 0-211.080439-171.110099-382.203842-382.204865-382.203842-211.095789 0-382.204865 171.123402-382.204865 382.203842S316.541865 877.280404 527.63663 877.280404zM527.637654 160.64577c184.687326 0 334.428745 149.730163 334.428745 334.428745-0.001023 184.698582-149.742443 334.429769-334.429769 334.429769-184.686303-0.001023-334.428745-149.73221-334.428745-334.429769C193.206862 310.37798 342.949304 160.64577 527.637654 160.64577zM551.525714 423.413406l-47.777143 0 0 238.877529 47.77612 0L551.525714 423.413406zM551.525714 327.862189l-47.777143 0 0 47.77612 47.777143 0L551.525714 327.862189z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </svg>
  );
};

export default IconXiangqing;
