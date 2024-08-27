import { ulid } from 'ulid';
import { Page } from './type';
import { zPage } from './schema';

export type * from './type';
export * from './schema';

/**
 * ページの初期値を返す
 */
export function getDefaultPage(): Page {
  return structuredClone(zPage.parse({ id: ulid() }));
}
