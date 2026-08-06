import './index.scss';
import './index.mobile.scss';
import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import { WorldSystem } from '@/game/index';
import SystemController from '@/components/SystemController';

export default function IndexPage() {
  return (
    <div className="screen-content">
      <SystemController />
    </div>
  );
}
