import { ulid } from 'ulid';
import { zPage } from './schema';
export * from './schema';
/**
 * ページの初期値を返す
 */
export function getDefaultPage() {
    return structuredClone(zPage.parse({ id: ulid() }));
}
