import { moveItem } from '@/src/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ulid } from 'ulid';
type AnyObject = {
  [K: symbol | string | number]: any;
};
type Item = {
  id: string;
};
type Props<T extends Item> = {
  items: T[];
  itemParser: (rawObj: unknown) => T;
  onChange?: (items: T[]) => void;
  /**
   * アイテムの表示に使う
   */
  itemView: (props: ItemViewProps<T>) => React.ReactNode;
};

export function SortableLite<T extends Item = Item>({
  items: items,
  itemView,
  itemParser,
  onChange,
}: Props<T>) {
  const [activeId, _setActiveId] = useState<string | null>(null);
  const $activeId = useRef<string | null>(null);
  // setDragImage用のHTML要素
  const $refs = useRef(new Map<string, HTMLElement>());

  const setActiveId = (id: string | null) => {
    _setActiveId(id);
    $activeId.current = id;
  };

  // 操作を受け取るやつ
  const reduce = (event: SortableEvent<T>) => {
    switch (event.name) {
      case 'Move': {
        const fromIndex = items.findIndex((v) => v.id === event.itemId);
        if (fromIndex < 0) return;
        const res = moveItem(items, fromIndex, event.toIndex);
        onChange?.(res);
        break;
      }
      case 'Delete': {
        const res = items.filter((v) => v.id !== event.itemId);
        onChange?.(res);
        break;
      }
      case 'Add': {
        const res = [...items];
        res.splice(event.toIndex ?? items.length, 0, event.item);
        onChange?.(res);
        break;
      }
      case 'Edit': {
        const res = items.map((v) => {
          if (v.id === event.itemId) return event.newItem;
          return v;
        });
        onChange?.(res);
        break;
      }
    }
  };

  const getDragData = (e: React.DragEvent) => {
    try {
      const rawData = e.dataTransfer.getData('text/plain');
      const rawJson = JSON.parse(rawData);
      return itemParser(rawJson);
    } catch {
      return null;
    }
  };

  const generateView = (item: T, index: number) => {
    return itemView({
      item,
      index: () => index,
      reduce,
      isActive: item.id === activeId,
      handleProps: {
        draggable: true,
        onDragEnd(e) {
          e.stopPropagation();
          e.preventDefault();
          setActiveId(null);
        },
        onDragStart(e) {
          e.stopPropagation();
          e.dataTransfer.setData('text/plain', JSON.stringify(item));
          e.dataTransfer.dropEffect = 'move';
          e.dataTransfer.effectAllowed = 'copyMove';
          const elm = $refs.current.get(item.id);
          if (elm) {
            const rect = elm.getBoundingClientRect();
            const posX = e.clientX - rect.left;
            const posY = e.clientY - rect.top;
            e.dataTransfer.setDragImage(elm, posX, posY);
          }
          setActiveId(item.id);
        },
      },
      itemProps: {
        ref(elm) {
          if (elm) {
            $refs.current.set(item.id, elm);
          }
        },
        onDrop(e) {
          e.preventDefault();
          const data = getDragData(e);
          if (!data) return;
          const elm = $refs.current.get(item.id);
          let toIndex = index;
          if (elm) {
            const rect = elm.getBoundingClientRect();
            const posY = e.clientY - rect.top;
            const ratioY = Math.min(1, Math.max(0, posY / rect.height));
            const shift = Math.round(ratioY);
            toIndex += shift;
          }
          const hasItem = items.find((v) => v.id === data.id);
          const withCtrl = e.ctrlKey || e.metaKey;
          if (hasItem && !withCtrl) {
            if (data.id === item.id) return;
            reduce({
              name: 'Move',
              itemId: data.id,
              toIndex,
            });
          } else {
            const newItem = structuredClone(data);
            newItem.id = ulid();
            reduce({
              name: 'Add',
              toIndex,
              item: newItem,
            });
          }
        },
        onDragOver(e) {
          e.preventDefault();
          if ($activeId.current && !e.ctrlKey) {
            e.dataTransfer.dropEffect = 'move';
          } else {
            e.dataTransfer.dropEffect = 'copy';
          }
        },
      },
    });
  };

  const views = useMemo(() => {
    const list = items.map((v, i) => {
      return {
        item: v,
        view: generateView(v, i),
        isActive: v.id === activeId,
      };
    });
    return list;
  }, [items]);

  const viewsWithAttr = useMemo(() => {
    return views.map(({ item, view, isActive }, index) => {
      if (item.id === activeId || isActive) {
        return generateView(item, index);
      }
      return view;
    });
  }, [views, activeId]);

  return <>{viewsWithAttr}</>;
}

type AddEvent<T extends Item> = {
  name: 'Add';
  toIndex?: number;
  item: T;
};
type DeleteEvent<T extends Item> = {
  name: 'Delete';
  itemId: T['id'];
};
type MoveEvent<T extends Item> = {
  name: 'Move';
  itemId: T['id'];
  toIndex: number;
};
type EditEvent<T extends Item> = {
  name: 'Edit';
  itemId: T['id'];
  newItem: T;
};
type SortableEvent<T extends Item> =
  | AddEvent<T>
  | DeleteEvent<T>
  | MoveEvent<T>
  | EditEvent<T>;

export type ItemViewProps<T extends Item> = {
  item: T;
  index: () => number;
  isActive: boolean;
  reduce: (event: SortableEvent<T>) => void;
  handleProps: {
    draggable: true;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
  };
  itemProps: {
    ref: (elm: HTMLElement | null) => void;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
  };
};
