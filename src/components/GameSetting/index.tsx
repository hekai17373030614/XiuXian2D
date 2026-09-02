import { useCallback, useState } from 'react';
import styles from './index.module.scss';

import { initConfigColumns } from './data';
import Radio from '@/components/Radio';
import Component from '@/components/Component';
import { Popover } from 'antd-mobile';
import { IconXiangqing } from '@/components/Iconfont';

const formInputMap: Record<string, React.ElementType> = {
  radio: Radio,
};

export default function GameSetting() {
  const [descPopVisible, updateDescPopVisible] = useState('');
  const onPopverVisibleChange = useCallback((visible: boolean, key: string) => {
    updateDescPopVisible(visible ? key : '');
  }, []);
  const [settingForm, updateSettingForm] = useState<Record<string, unknown>>({});

  const settingDomItems = initConfigColumns.map((config) => {
    const { title, value, type, desc, extra, options } = config;
    const InputDom = formInputMap[type] || 'div';
    return (
      <>
        <div className={styles['setting-form-item']} key={value}>
          <div className={styles['setting-form-title']}>
            {title}
            {desc ? (
              <Popover
                visible={descPopVisible === value}
                content={desc}
                trigger="click"
                placement="right"
                onVisibleChange={(visible) => onPopverVisibleChange(visible, value)}
              >
                <IconXiangqing />
              </Popover>
            ) : null}
          </div>
          <div className={styles['setting-form-input-content']}>
            <Component
              is={InputDom}
              value={settingForm[value]}
              onInput={(nVal: unknown) => updateSettingForm({ ...settingForm, [value]: nVal })}
              options={options}
              className={styles['setting-input-item']}
            />
          </div>
        </div>
        {extra}
      </>
    );
  });
  return <div className="game-setting-content">{settingDomItems}</div>;
}
