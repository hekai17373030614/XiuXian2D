/**
 * 事件触发配置
 */
export interface TriggerConfig {
  /** 是否同步执行 */
  sync?: boolean;
  /** 延迟执行时间（毫秒） */
  delay?: number;
  /** 是否缓存最后一次触发的数据 */
  cache?: boolean;
  /** 缓存时间（毫秒），超时后自动清除 */
  cacheTime?: number;
  /** 是否在注册时立即触发缓存数据 */
  triggerOnRegister?: boolean;
}

/**
 * 缓存数据结构
 */
export interface CacheData<T = unknown> {
  data: T;
  triggerOnRegister: boolean;
}

/**
 * 事件回调函数类型
 */
export type EventCallback<T = unknown> = (data: T) => void;

/**
 * 事件总线接口
 */
export interface IEventBus {
  /**
   * 触发事件
   * @param key 事件名称
   * @param data 传递给回调的数据
   * @param opt 触发配置
   */
  trigger<T>(key: string, data: T, opt?: TriggerConfig): void;

  /**
   * 注册事件监听
   * @param key 事件名称
   * @param callback 回调函数
   */
  on<T>(key: string, callback: EventCallback<T>): void;

  /**
   * 注册一次性事件监听（触发后自动注销）
   * @param key 事件名称
   * @param callback 回调函数
   */
  once<T>(key: string, callback: EventCallback<T>): void;

  /**
   * 注销事件监听
   * @param key 事件名称
   * @param callback 要移除的回调函数
   */
  off<T>(key: string, callback: EventCallback<T>): void;

  /**
   * 清除指定事件的所有监听和缓存
   * @param key 事件名称（不传则清除所有）
   */
  clear(key?: string): void;

  /**
   * 检查是否有指定事件的监听
   * @param key 事件名称
   * @param callback 可选，指定回调函数
   */
  has<T>(key: string, callback?: EventCallback<T>): boolean;

  /**
   * 获取指定事件的监听数量
   * @param key 事件名称
   */
  listenerCount(key: string): number;
}

/**
 * 事件总线单例钩子
 */
export type UseEventHook = () => IEventBus;
