import { Button, ButtonAdapted, ButtonSerialized } from '../Button';
import { CBInstanceAdapted, CBInstanceSerialized, ControlButtonInstance } from '../ControlButton';
export type PageItem = Button | ControlButtonInstance;
export type PageItemAdapted = ButtonAdapted | CBInstanceAdapted;
export type PageItemSerialized = ButtonSerialized | CBInstanceSerialized;
/**
 * ページ情報
 */
export type Page = {
    id: string;
    name: string;
    w: number;
    h: number;
    items: PageItem[];
};
/**
 * 内部で登録されるページ情報
 */
export type PageAdapted = Omit<Page, 'items'> & {
    items: PageItemAdapted[];
};
/**
 * 表示する際に使うページ情報
 */
export type PageSerialized = Omit<Page, 'items'> & {
    items: PageItemSerialized[];
};
