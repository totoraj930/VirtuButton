import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moveItem<T = any>(
  arr: T[],
  currentIndex: number,
  targetIndex: number
): T[] {
  const targetItem = arr[currentIndex];
  const resArr = arr.map((target, i) => (i === currentIndex ? null : target));
  resArr.splice(targetIndex, 0, targetItem);
  return resArr.flatMap((target) => (target !== null ? [target] : []));
}

type EventMapForTarget<T> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends Element
      ? HTMLElementEventMap
      : never;
/**
 * removeEventListenerするの面倒だから
 * useEffectとかで使うやつ
 */
export function addEventListenerWithCleanup<
  T extends Window | Document | Element,
  K extends keyof EventMapForTarget<T>,
>(
  target: T,
  type: K,
  listener: (this: T, ev: EventMapForTarget<T>[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  target.addEventListener(type as string, listener as EventListener, options);
  return () => {
    target.removeEventListener(
      type as string,
      listener as EventListener,
      options
    );
  };
}
