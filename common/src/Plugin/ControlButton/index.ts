import { CBInstanceAdapted, CBInstanceSerialized } from './type';

export * from './schema';
export * from './type';

export function toCBInstanceSerialized(
  cbInstance: CBInstanceAdapted
): CBInstanceSerialized {
  const { error, ...props } = cbInstance;
  return { ...props };
}
