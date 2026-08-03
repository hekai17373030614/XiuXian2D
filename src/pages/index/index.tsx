import './index.scss';
import './index.mobile.scss';
import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

export default function IndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

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
    sphere.position.y = sphereDiameter / 2; // 球体中心在平面上方

    // 给球体添加材质
    const sphereMaterial = new BABYLON.StandardMaterial('sphereMat', scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
    sphereMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    sphere.material = sphereMaterial;

    // 创建摄像机，位置在斜向上 45 度左右
    const cameraDistance = 15;
    const cameraAngle = Math.PI / 4; // 45度
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2, // 水平角度
      Math.PI / 2 - cameraAngle, // 垂直角度（45度）
      cameraDistance, // 距离
      BABYLON.Vector3.Zero(), // 目标点
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

    // 创建一个可见的球体来表示太阳
    const sunMesh = BABYLON.MeshBuilder.CreateSphere('sunMesh', { diameter: 0.5 }, scene);
    const sunMaterial = new BABYLON.StandardMaterial('sunMat', scene);
    sunMaterial.emissiveColor = new BABYLON.Color3(1, 0.9, 0.6);
    sunMaterial.disableLighting = true;
    sunMesh.material = sunMaterial;
    sunMesh.parent = sunLight;

    // 让太阳围绕平面圆形运转
    let angle = 0;
    const orbitRadius = 8;
    const orbitSpeed = 0.005;

    scene.registerBeforeRender(() => {
      angle += orbitSpeed;
      sunLight.position.x = orbitRadius * Math.cos(angle);
      sunLight.position.z = orbitRadius * Math.sin(angle);
      sunLight.position.y = 5 + 2 * Math.sin(angle * 0.5); // 添加一些高度变化
    });

    // 渲染循环
    engine.runRenderLoop(() => {
      scene.render();
    });

    // 窗口大小调整
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <div className="screen-content">
      <div className="system-time-control">
        
      </div>
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