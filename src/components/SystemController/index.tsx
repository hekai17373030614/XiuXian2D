import { useCallback, useState } from 'react';
import TimeController from './components/TimeController';
import './index.scss';

export default function SystemController({
  onTimeRateChange,
}: {
  onTimeRateChange?: (rate: number) => void;
}) {
  const [systemConfig, updateSystemConfig] = useState({ timeFlowRate: 1 });
  const updateTimeRate = useCallback(
    (speed: number) => {
      updateSystemConfig({ timeFlowRate: speed });
      onTimeRateChange?.(speed);
    },
    [onTimeRateChange],
  );
  return (
    <div className="system-controller">
      <div className="right-controller">
        <TimeController value={systemConfig.timeFlowRate} onChange={updateTimeRate} />
      </div>
    </div>
  );
}
