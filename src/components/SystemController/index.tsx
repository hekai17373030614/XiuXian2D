import { useState } from 'react';
import TimeController from './components/TimeController';

export default function SystemController() {
  const systemConfig = useState();
  return (
    <div className="system-controller">
      <div className="right-controller">
        <TimeController />
      </div>
    </div>
  );
}
