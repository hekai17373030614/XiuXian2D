import './index.scss';
import './index.mobile.scss';
import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import { WorldSystem } from '@/game/index';
import SystemController from '@/components/SystemController';

export default function IndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<WorldSystem | null>(null);
  const dayCountRef = useRef<number>(0);
  const baseTimeScaleRef = useRef<number>(1);

  // 处理时间流速变化
  const handleTimeRateChange = (rate: number) => {
    const effectiveScale = baseTimeScaleRef.current * rate;
    worldRef.current?.systemTime.setTimeScale(effectiveScale);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // 创建 world 对象，获取时间系统实例
    const worldInstance = new WorldSystem();
    worldRef.current = worldInstance;
    baseTimeScaleRef.current = worldInstance.systemTime.timeScale;

    // 创建引擎
    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);

    // 创建方形平面（地面）
    const groundSize = 10;
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {
      width: groundSize,
      height: groundSize,
    });
    ground.position.y = 0;

    // 给地面添加材质使其可见
    const groundMaterial = new BABYLON.StandardMaterial('groundMat', scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    groundMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    ground.material = groundMaterial;

    // 创建球体，直径占平面宽度的 1/3
    const sphereDiameter = groundSize / 3;
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
      diameter: sphereDiameter,
    });
    sphere.position.y = sphereDiameter / 2;

    // 给球体添加材质
    const sphereMaterial = new BABYLON.StandardMaterial('sphereMat', scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
    sphereMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    sphere.material = sphereMaterial;

    // 创建摄像机
    const cameraDistance = 15;
    const cameraAngle = Math.PI / 4;
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2 - cameraAngle,
      cameraDistance,
      BABYLON.Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvasRef.current, true);

    // 创建环境光
    const ambientLight = new BABYLON.HemisphericLight(
      'ambientLight',
      new BABYLON.Vector3(0, 1, 0),
      scene,
    );
    ambientLight.intensity = 0.3;

    // 创建模拟太阳的点光源
    const sunLight = new BABYLON.PointLight('sunLight', new BABYLON.Vector3(5, 5, 0), scene);
    sunLight.intensity = 1.0;
    sunLight.diffuse = new BABYLON.Color3(1, 0.95, 0.8);

    // 创建太阳球体
    const sunMesh = BABYLON.MeshBuilder.CreateSphere('sunMesh', { diameter: 0.5 }, scene);
    const sunMaterial = new BABYLON.StandardMaterial('sunMat', scene);
    sunMaterial.emissiveColor = new BABYLON.Color3(1, 0.9, 0.6);
    sunMaterial.disableLighting = true;
    sunMesh.material = sunMaterial;
    sunMesh.parent = sunLight;

    // 创建模拟月亮的点光源
    const moonLight = new BABYLON.PointLight('moonLight', new BABYLON.Vector3(-5, 5, 0), scene);
    moonLight.intensity = 0;
    moonLight.diffuse = new BABYLON.Color3(0.6, 0.7, 1.0);

    // 创建月球球体
    const moonMesh = BABYLON.MeshBuilder.CreateSphere('moonMesh', { diameter: 0.35 }, scene);
    const moonMaterial = new BABYLON.StandardMaterial('moonMat', scene);
    moonMaterial.emissiveColor = new BABYLON.Color3(0.6, 0.7, 1.0);
    moonMaterial.disableLighting = true;
    moonMesh.material = moonMaterial;
    moonMesh.parent = moonLight;
    moonMesh.setEnabled(false);

    // 太阳运转参数
    const orbitRadius = 8;
    const maxHeight = 10;
    let lastDayCount = 0;

    // 根据小时计算太阳颜色和亮度
    const getSunColorAndIntensity = (
      hour: number,
    ): { color: BABYLON.Color3; intensity: number } => {
      // 6点和19点：橘黄色，较暗
      // 13点：最亮，暖白色
      const progress = (hour - 6) / 13; // 0~1, 6点为0，19点为1

      // 计算与中午13点的距离
      const distanceFromNoon = Math.abs(hour - 13);
      const maxDistance = 7; // 最大距离是 13-6=7 或 19-13=6
      const normalizedDistance = distanceFromNoon / maxDistance;

      // 亮度：中午最亮(1.0)，早晚较暗(0.3)
      const intensity = 0.3 + 0.7 * (1 - normalizedDistance);

      // 颜色：
      // 橘黄色 (1, 0.6, 0.2) -> 暖白色 (1, 0.95, 0.85)
      const r = 1;
      const g = 0.6 + 0.35 * (1 - normalizedDistance);
      const b = 0.2 + 0.65 * (1 - normalizedDistance);

      return {
        color: new BABYLON.Color3(r, g, b),
        intensity,
      };
    };

    scene.registerBeforeRender(() => {
      const deltaTime = engine.getDeltaTime() / 1000;

      // 推进世界时间
      worldRef.current?.systemTime.advanceTime(deltaTime);

      // 获取当前游戏时间
      const gameTime = worldRef.current?.systemTime.currentTime;
      if (!gameTime) return;

      const hours = gameTime.getHours();
      const minutes = gameTime.getMinutes();
      const totalHours = hours + minutes / 60;

      // 检测新的一天
      const currentDayCount = Math.floor(gameTime.getTime() / 86400000);
      if (currentDayCount > lastDayCount) {
        lastDayCount = currentDayCount;
        dayCountRef.current += 1;
        console.log(
          `[游戏日志] 第 ${dayCountRef.current} 天，当前游戏时间: ${worldRef.current?.getTime('YYYY-MM-DD HH:mm:ss')}`,
        );
      }

      // 太阳和月亮的可见性逻辑（带1小时缓冲渐变）
      // 太阳活跃时段: 5:00 ~ 20:00 (完全可见 7:00~18:00)
      // 月亮活跃时段: 18:00 ~ 7:00 (完全可见 20:00~5:00)
      // 缓冲区: 各1小时，日月同时出现，渐灭渐亮

      // 计算在指定时段内的可见度系数 (0~1)，支持跨零点
      const getFadeFactor = (
        hour: number,
        activeStart: number,
        fullStart: number,
        fullEnd: number,
        activeEnd: number,
      ): number => {
        // 计算总持续时间（支持跨零点）
        const totalDuration = (activeEnd - activeStart + 24) % 24;
        // 将时间归一化到 activeStart 为起点的坐标系
        const offsetHour = (((hour - activeStart) % 24) + 24) % 24;
        const fullStartOffset = (((fullStart - activeStart) % 24) + 24) % 24;
        const fullEndOffset = (((fullEnd - activeStart) % 24) + 24) % 24;

        if (offsetHour > totalDuration) return 0;
        if (offsetHour >= fullStartOffset && offsetHour <= fullEndOffset) return 1;
        if (offsetHour < fullStartOffset) {
          return offsetHour / (fullStartOffset || 1);
        }
        return (totalDuration - offsetHour) / (totalDuration - fullEndOffset || 1);
      };

      const sunFade = getFadeFactor(totalHours, 5, 7, 18, 20);
      const moonFade = getFadeFactor(totalHours, 18, 20, 5, 7);

      // 太阳
      if (sunFade > 0) {
        const progress = (totalHours - 5) / 15;
        const angle = progress * Math.PI;

        sunLight.position.x = orbitRadius * Math.cos(angle);
        sunLight.position.z = -orbitRadius * Math.sin(angle);
        sunLight.position.y = Math.sin(angle) * maxHeight + 2;

        const { color, intensity } = getSunColorAndIntensity(totalHours);
        sunLight.diffuse = color;
        sunLight.intensity = intensity * sunFade;
        sunMaterial.emissiveColor = color;

        sunMesh.setEnabled(true);
      } else {
        sunMesh.setEnabled(false);
        sunLight.intensity = 0;
      }

      // 月亮
      if (moonFade > 0) {
        const nightProgress = totalHours >= 18 ? (totalHours - 18) / 13 : (totalHours + 6) / 13;
        const moonAngle = nightProgress * Math.PI;

        moonLight.position.x = orbitRadius * Math.cos(moonAngle);
        moonLight.position.z = -orbitRadius * Math.sin(moonAngle);
        moonLight.position.y = Math.sin(moonAngle) * maxHeight + 2;

        moonLight.intensity = 0.3 * moonFade;
        moonMesh.setEnabled(true);
      } else {
        moonMesh.setEnabled(false);
        moonLight.intensity = 0;
      }
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <div className="screen-content">
      <SystemController onTimeRateChange={handleTimeRateChange} />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'none',
        }}
      />
    </div>
  );
}
