import { useCallback, useState } from 'react';
import TimeController from './components/TimeController';
import styles from './index.module.scss';
import './index.mobile.module.scss';
import './index.scss';

export default function SystemController() {
  const [systemConfig, updateSystemConfig] = useState({ timeFlowRate: 1 });
  const updateTimeRate = useCallback((speed: number) => {
    updateSystemConfig({ timeFlowRate: speed });
  }, []);
  return (
    <div className={`${styles['system-controller']} no-event`}>
      <div className={`${styles['top-controller']} no-event`}>
        <div className={`${styles['top-left-controller']} no-event`}></div>
        <div className={`${styles['top-right-controller']} no-event`}>
          <TimeController value={systemConfig.timeFlowRate} onChange={updateTimeRate} />
        </div>
      </div>
      <div className={`${styles['bottom-controller']} no-event`}>
        <div className={`${styles['bottom-left-controller']} no-event`}></div>
        <div className={`${styles['bottom-right-controller']} no-event`}></div>
      </div>
    </div>
  );
}
