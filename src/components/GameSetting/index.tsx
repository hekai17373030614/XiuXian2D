import { useRef } from 'react';
/**
 * 游戏设置内容
 * 时间内容
 *    时间比例 - 游戏中1s相当于现实中x秒，需要显示转化后一天多少分钟
 *
 * 世界自动运转
 *    更新间隔 - 游戏NPC状态更新间隔，默认1个月（游戏内）
 *
 * 难度
 *    难度等级 - 游戏难度等级，默认1级
 *      详细设置内容：
 *      比例调整
 *      NPC修炼速度 - 游戏中NPC修炼速度，默认1倍 (0.5 - 3)
 *      NPC悟性 - 游戏中NPC悟性，默认1倍 (0.5 - 3)
 *      NPC资质 - 游戏中NPC资质，默认1倍 (0.5 - 3)
 *      NPC属性 - 游戏中NPC属性，默认1倍 (0.5 - 3)
 *      NPC运势 - 游戏中NPC运势，默认1倍 (0.5 - 2)
 *  世界
 *    世界大小 - 初始世界大小，大小影响资源多少，灵气浓度，人口密度
 *    初始灵气浓度 - 初始世界灵气浓度，默认100
 *    初始人口密度 - 初始人口密度，默认100
 *    资源调整
 *      资源数量 - 初始资源数量，默认1000
 *      资源密度 - 初始资源密度，默认100
 *      资源生成速度 - 资源生成速度，默认1倍 (0.5 - 1.5)
 */

export function GameSetting({ config }) {
  const settingColumns = useRef([
    {
      title: '世界时间',
      value: 'timeConfig',
      columns: [
        {
          title: '时间比例',
          desc: '游戏中1s相当于现实中{X}s',
          value: 'scale',
          extra: (value) => {
            return <div></div>;
          },
        },
      ],
    },
  ]);

  const settingDomList = settingColumns.current.map((config) => {
    const { title, columns } = config;
    return (
      <section className="setting-section">
        <h1>{title}</h1>
      </section>
    );
  });
  return <div className="game-setting-content">{settingDomList}</div>;
}
