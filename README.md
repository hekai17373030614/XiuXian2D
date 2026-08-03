### 项目介绍

项目结构
d:\Project\XiuXian2D
├── public/ # 静态公共资源（如 favicon, robots.txt 等）
├── src/
│ ├── assets/ # 静态资源文件（图片、音频、字体等）
│ │ ├── images/
│ │ └── audio/
│ │
│ ├── components/ # 可复用的通用UI组件
│ │ └── Button/
│ │ ├── index.tsx
│ │ └── Button.scss
│ │
│ ├── game/ # 🚀 核心业务逻辑与类 (原 word 目录)
│ │ ├── entities/ # 游戏实体类 (如玩家、敌人、物品等)
│ │ │ ├── Player.ts
│ │ │ └── Enemy.ts
│ │ ├── systems/ # 游戏系统类 (如时间、战斗、存档等)
│ │ │ └── TimeSystem.ts
│ │ ├── data/ # 游戏数据配置 (如关卡、技能表等)
│ │ │ └── levels.ts
│ │ └── index.ts # 游戏逻辑统一导出入口
│ │
│ ├── pages/ # 页面级UI组件
│ │ ├── Home/
│ │ │ ├── index.tsx
│ │ │ └── Home.scss
│ │ └── Profile/
│ │ └── index.tsx
│ │
│ ├── routers/ # 路由配置与懒加载模块
│ │ ├── index.tsx # 路由总配置 (router-data.ts)
│ │ └── Home.route.tsx # 路由模块 (包含 loader/action)
│ │
│ ├── styles/ # 全局样式与变量
│ │ └── variable.scss
│ │
│ ├── types/ # 全局 TypeScript 类型定义
│ │ ├── game.d.ts # 游戏相关类型
│ │ └── index.d.ts
│ │
│ ├── utils/ # 通用工具函数
│ │ └── format.ts
│ │
│ ├── main.tsx # 应用入口
│ └── index.css # 全局样式入口
│
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
