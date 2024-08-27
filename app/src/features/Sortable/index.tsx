import { moveItem } from '../../utils';
import { produce } from 'immer';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

export type Group<T extends Item = Item> = {
  id: string;
  items: (Item & T)[];
};

export type Item = {
  id: string;
};

export const groupsAtom = atom<Group[]>([]);

type AnyObject = {
  [K: symbol | string | number]: any;
};
export const addItemAtom = atom(
  null,
  (
    _,
    set,
    p: {
      groupId: string;
      newItem: Item & AnyObject;
    }
  ) => {
    set(groupsAtom, (prev) => {
      return prev.map(
        produce((group) => {
          if (group.id === p.groupId) {
            group.items.push(p.newItem);
          }
        })
      );
    });
  }
);

export const editItemAtom = atom(
  null,
  (_, set, p: { itemId: string; newItem: Item & AnyObject }) => {
    set(groupsAtom, (prev) => {
      return prev.map(
        produce((group) => {
          const itemIndex = group.items.findIndex(({ id }) => id === p.itemId);
          if (itemIndex >= 0) {
            group.items[itemIndex] = p.newItem;
          }
        })
      );
    });
  }
);

export const deleteItemAtom = atom(null, (_, set, p: { itemId: string }) => {
  set(groupsAtom, (prev) => {
    return prev.map(
      produce((group) => {
        const hasItem = group.items.find(({ id }) => id === p.itemId);
        if (hasItem) {
          group.items = group.items.filter(({ id }) => id !== p.itemId);
        }
      })
    );
  });
});

export const moveItemAtom = atom(
  null,
  (
    _,
    set,
    p: {
      itemId: string;
      fromGroupId: string;
      toGroupId: string;
      toIndex: number;
    }
  ) => {
    set(groupsAtom, (prev) => {
      // Itemを探す
      let item: Item | undefined;
      for (const group of prev) {
        item = group.items.find(({ id }) => id === p.itemId);
        if (item) break;
      }
      if (!item) return prev;

      if (p.fromGroupId === p.toGroupId) {
        // 同一グループ内での移動
        return prev.map(
          produce((group) => {
            if (group.id !== p.fromGroupId) return;
            const fromIndex = group.items.findIndex(
              ({ id }) => id === p.itemId
            );
            if (fromIndex < 0) return;
            group.items = moveItem(group.items, fromIndex, p.toIndex);
          })
        );
      } else {
        // 異なるグループ間での移動
        return prev.map(
          produce((group) => {
            if (group.id === p.fromGroupId) {
              // 現在のグループから削除
              group.items = group.items.filter(({ id }) => id !== p.itemId);
            } else if (group.id === p.toGroupId) {
              // 移動先グループに追加
              group.items.splice(p.toIndex, 0, item);
            }
          })
        );
      }
    });
  }
);

type GroupProps<T extends Item, E extends React.ElementType> = {
  groupId: string;
  children: (props: ItemViewProps<T>) => React.ReactNode;
  as?: E;
};

type ItemViewProps<T extends Item> = {
  item: T;
  group: Group<T>;
  index: () => number;
  isActive: boolean;
  edit: (p: { itemId: string; newItem: T }) => void;
  delete: (p: { itemId: string }) => void;
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

export function SortableGroup<
  T extends Item,
  E extends React.ElementType = 'div',
>({
  groupId,
  children: itemView,
  as: _as,
  ...wrapProps
}: GroupProps<T, E> &
  Omit<React.ComponentPropsWithRef<E>, keyof GroupProps<T, E>>) {
  const groups = useAtomValue(groupsAtom);
  // const [group, setGroup] = useState<Group<T> | null>(null);
  const group = groups.find(({ id }) => id === groupId) as Group<T> | undefined;
  const editItem = useSetAtom(editItemAtom);
  const deleteItem = useSetAtom(deleteItemAtom);
  const moveItem = useSetAtom(moveItemAtom);
  const addItem = useSetAtom(addItemAtom);
  const Wrap = _as ?? 'div';

  // setDragImage用のHTML要素
  const $refs = useRef(new Map<string, HTMLElement>());
  const [activeId, setActiveId] = useState<string | null>(null);

  // useEffect(() => {
  //   const g = groups.find(({ id }) => id === groupId);
  //   if (g) setGroup(g as Group<T>);
  // }, [groups]);

  const getDragData = (e: React.DragEvent) => {
    try {
      const rawData = e.dataTransfer.getData('text/plain');
      const rawJson = JSON.parse(rawData);
      const zSchema = z.object({
        groupId: z.string(),
        itemId: z.string(),
        index: z.number(),
      });
      return zSchema.parse(rawJson);
    } catch {
      return null;
    }
  };

  const generateView = (item: T, index: number, group: Group<T>) => {
    return itemView({
      item: item as T,
      group,
      index: () => index,
      edit: editItem,
      delete: deleteItem,
      isActive: item.id === activeId,
      handleProps: {
        draggable: true,
        onDragEnd: (e) => {
          e.preventDefault();
          setActiveId(null);
        },
        onDragStart: (e) => {
          e.dataTransfer.setData(
            'text/plain',
            JSON.stringify({
              groupId: group.id,
              itemId: item.id,
              index: index,
            })
          );
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
        ref: (elm) => {
          if (elm) $refs.current.set(item.id, elm);
        },
        onDrop: (e) => {
          e.preventDefault();
          e.stopPropagation();
          const data = getDragData(e);
          if (!data || data.itemId === item.id) return;
          const elm = $refs.current.get(item.id);
          let toIndex = index;
          if (elm) {
            const rect = elm.getBoundingClientRect();
            const posY = e.clientY - rect.top;
            const ratioY = Math.min(1, Math.max(0, posY / rect.height));
            const shift = Math.round(ratioY);
            toIndex += shift;
          }
          moveItem({
            itemId: data.itemId,
            fromGroupId: data.groupId,
            toGroupId: group.id,
            toIndex,
          });
        },
        onDragOver: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
      },
    });
  };

  // activeId以外の部分をメモ化
  const views = useMemo(() => {
    const list: { item: T; view: React.ReactNode; isActive: boolean }[] = [];
    if (!group) return list;
    const { items } = group;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const view = generateView(item, i, group);
      list.push({ item, view, isActive: item.id === activeId });
    }
    return list;
  }, [group, itemView]);

  // activeIdに付随する変更を適用
  const viewsWithAttr = useMemo(() => {
    if (!group) return [];
    return views.map(({ item, view, isActive }, index) => {
      if (item.id === activeId || isActive) {
        return generateView(item, index, group);
      }
      return view;
    });
  }, [views, activeId]);

  useEffect(() => {
    setActiveId(null);
  }, [group]);

  return !group ? (
    <></>
  ) : (
    <Wrap
      {...wrapProps}
      onDrop={(e: DragEvent<Element>) => {
        e.preventDefault();
        const data = getDragData(e);
        if (!data) return;
        // if (data.groupId === group.id) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const posY = e.clientY - rect.top;
        const ratioY = Math.min(1, Math.max(0, posY / rect.height));
        const toBottom = Math.round(ratioY) === 1;
        moveItem({
          itemId: data.itemId,
          fromGroupId: data.groupId,
          toGroupId: group.id,
          toIndex: toBottom ? group.items.length : 0,
        });
      }}
      onDragOver={(e: { preventDefault: () => any }) => e.preventDefault()}
    >
      {viewsWithAttr}
    </Wrap>
  );
}
