import type { TimeControllerProps } from '@/type/components/SystemController/TimeController';

import { useState, useEffect, useRef } from 'react';
import './index.scss';

export default function TimeController({
  customSpeed = 10,
  value,
  onChange,
  isMobile = false,
}: TimeControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 固定选项
  const options = [2, 5, customSpeed];

  // 处理点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile]);

  const handleSelect = (speed: number) => {
    onChange(speed);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // 移动端样式
  if (isMobile) {
    return (
      <div className="time-controller time-controller--mobile" ref={dropdownRef}>
        <button className="time-controller__current" onClick={() => setIsOpen(!isOpen)}>
          <span className="time-controller__current-text">{value}x</span>
          <svg
            className={`time-controller__arrow ${isOpen ? 'time-controller__arrow--up' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="time-controller__dropdown">
            {options.map((speed) => (
              <div
                key={speed}
                className={`time-controller__dropdown-item ${
                  value === speed ? 'time-controller__dropdown-item--active' : ''
                }`}
                onClick={() => handleSelect(speed)}
              >
                {speed}x
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 桌面端样式
  return (
    <div className="time-controller">
      {options.map((speed) => (
        <button
          key={speed}
          className={`time-controller__btn ${
            value === speed ? 'time-controller__btn--active' : ''
          }`}
          onClick={() => handleSelect(speed)}
        >
          {speed}x
        </button>
      ))}
    </div>
  );
}
