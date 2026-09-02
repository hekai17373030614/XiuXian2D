import type { RadioProps, RadioOption } from '@/type/components/Radio';

import classNames from 'classnames';
import styles from './index.module.scss';
import ThumbIcon from './thumb.svg?react';

import { useState, useRef, useCallback, useEffect, useMemo, type CSSProperties } from 'react';

function lightenHexColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(2.55 * percent));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(2.55 * percent));
  const b = Math.min(255, (num & 0xff) + Math.round(2.55 * percent));
  return `rgb(${r}, ${g}, ${b})`;
}

const DEFAULT_COLOR = '#5260ff';

export default function Radio({
  value,
  onInput,
  onChange,
  options = [],
  color,
  className,
  style,
  ...resConfig
}: RadioProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const preventClickRef = useRef(false);
  const optionsRef = useRef(options);
  const onInputRef = useRef(onInput);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);
  useEffect(() => {
    onInputRef.current = onInput;
  }, [onInput]);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const [isDragging, setIsDragging] = useState(false);

  const themeColor = color || DEFAULT_COLOR;

  // 轨道/分段仍使用 CSS 变量控制
  const cssVars = useMemo<CSSProperties>(() => {
    if (color) {
      return {
        '--radio-color': color,
        '--radio-color-light': lightenHexColor(color, 20),
        color,
      } as CSSProperties;
    }
    return { color: themeColor } as CSSProperties;
  }, [color, themeColor]);

  const currentIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value),
  );

  const getPositionPercent = (index: number) => {
    if (options.length <= 1) return 0;
    return (index / (options.length - 1)) * 100;
  };

  const findNearestIndex = (percent: number) => {
    const len = optionsRef.current.length;
    if (len <= 1) return 0;
    const index = Math.round((percent / 100) * (len - 1));
    return Math.max(0, Math.min(len - 1, index));
  };

  const getPercentFromEvent = (e: MouseEvent | TouchEvent) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : (e as MouseEvent).clientX;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, percent));
  };

  const updateValueFromPercent = (percent: number, fireChange: boolean) => {
    const nearestIndex = findNearestIndex(percent);
    const option = optionsRef.current[nearestIndex];
    if (option && option.value !== valueRef.current) {
      onInputRef.current(option.value);
      if (fireChange) {
        onChangeRef.current?.(option.value);
      }
    }
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (preventClickRef.current) {
      preventClickRef.current = false;
      return;
    }
    const percent = getPercentFromEvent(e);
    updateValueFromPercent(percent, true);
  };

  const handleSegmentClick = (option: RadioOption) => {
    onInputRef.current(option.value);
    onChangeRef.current?.(option.value);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const percent = getPercentFromEvent(e);
    updateValueFromPercent(percent, false);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      preventClickRef.current = true;
      setTimeout(() => {
        preventClickRef.current = false;
      }, 0);
      onChangeRef.current?.(valueRef.current);
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  const currentPercent = getPositionPercent(currentIndex);

  return (
    <div
      className={classNames(styles['radio'], className)}
      style={{ ...cssVars, ...style }}
      {...resConfig}
    >
      <div className={styles['radio__track']} ref={trackRef} onClick={handleTrackClick}>
        <div
          className={styles['radio__fill']}
          style={{
            // 百分比相对 padding box（已减去 4px 边框），需按进度比例补偿边框宽度，确保 100% 时完全覆盖右端
            width: `calc(${currentPercent}% + ${(currentPercent / 25).toFixed(2)}px)`,
            // 100% 时右端圆角与轨道右端对齐，避免露出直角
            ...(currentPercent >= 100 ? { borderRadius: '6px' } : {}),
          }}
        />
        {options.map((option, index) => (
          <div
            key={String(option.value)}
            className={classNames(styles['radio__segment'], {
              [styles['radio__segment--active']]: index === currentIndex,
              [styles['radio__segment--first']]: index === 0,
              [styles['radio__segment--last']]: index === options.length - 1,
            })}
            style={{ left: `${getPositionPercent(index)}%` }}
            onClick={(e) => {
              e.stopPropagation();
              handleSegmentClick(option);
            }}
          />
        ))}
        <div
          className={classNames(styles['radio__thumb'], {
            [styles['radio__thumb--dragging']]: isDragging,
          })}
          style={{ left: `${currentPercent}%` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <ThumbIcon className="thumb-icon" />
        </div>
      </div>
    </div>
  );
}
