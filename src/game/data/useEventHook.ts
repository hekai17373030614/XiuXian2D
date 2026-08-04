import type { TriggerConfig, CacheData, EventCallback } from '@/type/game/data/EventBus';

/**
 * 事件总线 - 提供发布/订阅模式的事件通信
 */
class EventBus {
  private eventMap: Map<string, Set<EventCallback>>;
  private cacheMap: Map<string, CacheData>;
  private cacheTimers: Map<string, ReturnType<typeof setTimeout>>;

  constructor() {
    this.eventMap = new Map();
    this.cacheMap = new Map();
    this.cacheTimers = new Map();
  }

  /**
   * 触发事件
   * @param key 事件名称
   * @param data 传递给回调的数据
   * @param opt 触发配置
   */
  trigger<T>(key: string, data: T, opt?: TriggerConfig): void {
    const callbacks = this.eventMap.get(key);
    // 触发前处理缓存
    this.__handleCache(key, data, opt);

    // 无监听器时，直接处理缓存逻辑
    if (!callbacks) {
      return;
    }

    // 支持延迟触发
    if (opt?.delay && opt.delay > 0) {
      setTimeout(() => {
        this.__dispatch(key, data, opt);
      }, opt.delay);
      return;
    }

    this.__dispatch(key, data, opt);
  }

  /**
   * 分发事件给所有监听者
   */
  private __dispatch<T>(key: string, data: T, opt?: TriggerConfig): void {
    const callbacks = this.eventMap.get(key);
    if (!callbacks) return;
    if (opt?.sync) {
      this.__triggerSync(key, data);
      return;
    }
    callbacks.forEach((callback) => {
      try {
        callback(data);
      } catch (err) {
        console.error(`[EventBus] Error in callback for "${key}":`, err);
      }
    });
  }

  /**
   * 同步触发所有监听者（按顺序 await）
   */
  private async __triggerSync<T>(key: string, data: T): Promise<void> {
    const callbacks = this.eventMap.get(key);
    if (!callbacks) return;
    for (const callback of callbacks) {
      try {
        await callback(data);
      } catch (err) {
        console.error(`[EventBus] Error in sync callback for "${key}":`, err);
      }
    }
  }

  /**
   * 处理缓存逻辑
   */
  private __handleCache<T>(key: string, data: T, opt?: TriggerConfig): void {
    if (!opt?.cache) return;

    // 清除旧的缓存定时器
    const oldTimer = this.cacheTimers.get(key);
    if (oldTimer) {
      clearTimeout(oldTimer);
      this.cacheTimers.delete(key);
    }

    this.cacheMap.set(key, {
      data,
      triggerOnRegister: !!opt.triggerOnRegister,
    });

    // 设置缓存过期
    if (opt.cacheTime && opt.cacheTime > 0 && opt.cacheTime !== Infinity) {
      const timer = setTimeout(() => {
        this.cacheMap.delete(key);
        this.cacheTimers.delete(key);
      }, opt.cacheTime);
      this.cacheTimers.set(key, timer);
    }
  }

  /**
   * 注册事件监听
   * @param key 事件名称
   * @param callback 回调函数
   */
  on<T>(key: string, callback: EventCallback<T>): void {
    if (typeof callback !== 'function') {
      throw new Error('[EventBus] callback must be a function');
    }

    const callbacks = this.eventMap.get(key) ?? new Set<EventCallback>();
    callbacks.add(callback as EventCallback);
    this.eventMap.set(key, callbacks);

    // 如果有缓存且配置了 triggerOnRegister，立即触发
    const cacheData = this.cacheMap.get(key);
    if (cacheData?.triggerOnRegister) {
      callback(cacheData.data as T);
    }
  }

  /**
   * 注册一次性事件监听（触发后自动注销）
   * @param key 事件名称
   * @param callback 回调函数
   */
  once<T>(key: string, callback: EventCallback<T>): void {
    const wrapper = ((data: unknown) => {
      callback(data as T);
      this.off(key, wrapper);
    }) as EventCallback<T>;
    this.on(key, wrapper);
  }

  /**
   * 注销事件监听
   * @param key 事件名称
   * @param callback 要移除的回调函数
   */
  off<T>(key: string, callback: EventCallback<T>): void {
    const callbacks = this.eventMap.get(key);
    if (!callbacks) return;

    callbacks.delete(callback as EventCallback);
    if (callbacks.size === 0) {
      this.eventMap.delete(key);
    }
  }

  /**
   * 清除指定事件的所有监听和缓存
   * @param key 事件名称（不传则清除所有）
   */
  clear(key?: string): void {
    if (key) {
      this.eventMap.delete(key);
      this.__clearCache(key);
      return;
    }
    // 清除所有
    this.eventMap.clear();
    this.cacheMap.clear();
    this.cacheTimers.forEach((timer) => clearTimeout(timer));
    this.cacheTimers.clear();
  }

  /**
   * 清除指定 key 的缓存
   */
  private __clearCache(key: string): void {
    this.cacheMap.delete(key);
    const timer = this.cacheTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.cacheTimers.delete(key);
    }
  }

  /**
   * 检查是否有指定事件的监听
   */
  has<T>(key: string, callback?: EventCallback<T>): boolean {
    const callbacks = this.eventMap.get(key);
    return (
      !!callbacks &&
      (callback ? callbacks.has(callback as EventCallback) : callbacks.size > 0)
    );
  }

  /**
   * 获取指定事件的监听数量
   */
  listenerCount(key: string): number {
    return this.eventMap.get(key)?.size ?? 0;
  }
}

// 单例实例
let instance: EventBus | null = null;

/**
 * 获取事件钩子单例实例
 */
export function useEventHook(): EventBus {
  if (!instance) {
    instance = new EventBus();
  }
  return instance;
}
