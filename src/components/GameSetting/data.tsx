export const initConfigColumns = [
  {
    title: '时间比例',
    value: 'timeradio',
    type: 'number',
    min: 200,
    max: 3000,
    step: 1,
    defaultValue: 1,
    desc: '游戏时间d = 实际时间d * 时间比例',
    extra: () => <div>?</div>,
  },
  {
    // 尝试使用 webworker 直接多线程运算
    title: '世界自动运转间隔',
    value: 'updateLimit',
    type: 'radio',
    // option:
    desc: '游戏NPC状态更新间隔，默认1个月（游戏内）',
  },
  {
    title: '世界初始大小',
    value: 'wordSize',
    type: 'radio',
    options: [
      {
        text: '小',
        value: 1000,
      },
      {
        text: '中',
        value: 2000,
      },
      {
        text: '大',
        value: 3000,
      },
      {
        text: '巨大',
        value: 4000,
      },
    ],
  },
  {
    title: '初始灵气浓度',
    value: 'reikiDensity',
    type: 'radio',
    options: [],
  },
  {
    title: '初始人口密度',
    value: 'peopleDensity',
    type: 'radio',
    options: [],
  },
  {
    title: '初始资源总量',
    value: 'totalResource',
    type: 'radio',
  },
  {
    title: '资源生长速度',
    value: 'resourceGrowSpeed',
    type: 'radio',
  },
  {
    title: 'NPC修炼速度',
    value: 'NPCPracticeSpeed',
    type: 'radio',
  },
  {
    title: 'NPC悟性',
    value: 'NPCInsight',
    desc: '按比例提高NPC悟性，悟性影响NPC武学、功法相关的领悟速度和概率',
    type: 'radio',
  },
  {
    title: 'NPC资质',
    value: 'NPCAptitude',
    desc: '按比例提高NPC资质，资质影响NPC上限，调高可能会导致出现大批高手',
    type: 'radio',
  },
  {
    title: 'NPC属性',
    value: 'NPCAttribute',
    desc: '按比例提高NPC实际属性，影响NPC同等级同功法下，实际的战斗数值',
    type: 'radio',
  },
  {
    title: 'NPC运势',
    value: 'NPCFortune',
    desc: '真爱降临！好男人都是我的辣！',
    type: 'radio',
  },
];
