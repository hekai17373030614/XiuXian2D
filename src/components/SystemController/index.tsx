import styles from './index.module.scss';
import './index.mobile.module.scss';
import './index.scss';

import { useCallback, useState } from 'react';
import TimeController from './components/TimeController';
import GameSetting from '@/components/GameSetting';
import { Mask } from 'antd-mobile';

export default function SystemController() {
  const [systemConfig, updateSystemConfig] = useState({ timeFlowRate: 1 });
  const updateTimeRate = useCallback((speed: number) => {
    updateSystemConfig({ timeFlowRate: speed });
  }, []);

  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={`${styles['system-controller']} no-event`}>
        <div className={`${styles['top-controller']} no-event`}>
          <div className={`${styles['top-left-controller']} no-event`}></div>
          <div className={`${styles['top-right-controller']} no-event`}>
            <TimeController value={systemConfig.timeFlowRate} onChange={updateTimeRate} />
            <div style={{ pointerEvents: 'all' }} onClick={() => setVisible(true)}>
              Setting {String(visible)}
            </div>
          </div>
        </div>
        <div className={`${styles['bottom-controller']} no-event`}>
          <div className={`${styles['bottom-left-controller']} no-event`}></div>
          <div className={`${styles['bottom-right-controller']} no-event`}></div>
        </div>
      </div>

      <Mask visible={visible} onMaskClick={() => setVisible(false)} opacity={0}>
        <div className={styles['setting-mask-content']}>
          <GameSetting />
        </div>
      </Mask>
    </>
  );
}
