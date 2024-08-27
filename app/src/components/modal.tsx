import { MaterialSymbol } from '@material-symbols/font-400';
import { materialSymbols } from '@virtu-button/common/Plugin';
import { atom, useAtom } from 'jotai';
import { memo, useMemo, useState } from 'react';
import { ulid } from 'ulid';
import { MaterialIcon } from './icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const aModalNodes = atom<{ id: string; node: React.ReactNode }[]>([]);
export const aModalNodeView = atom((get) => {
  return get(aModalNodes).map(({ node }) => node);
});

function createElementFromHTML(htmlString: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}

type IconButtonProps = {
  icon: MaterialSymbol;
  onClick: (icon: MaterialSymbol) => void;
};
const IconButton = memo(({ icon, onClick }: IconButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      title={icon}
      onClick={() => onClick(icon)}
    >
      <MaterialIcon icon={icon} size={30} fill />
    </Button>
  );
});

function IconDialog({
  handleResolve,
}: {
  handleResolve: (result: MaterialSymbol | null | false) => void;
}) {
  const [searchText, setSearchText] = useState('');
  const searchResult = useMemo(() => {
    return materialSymbols.filter((item) => {
      return item.includes(searchText.toLowerCase());
    });
  }, [searchText]);
  const viewNum = 200;
  const maxIndex = useMemo(() => {
    return ~~(searchResult.length / viewNum - 0.1);
  }, [searchResult]);
  const [viewIndex, setViewIndex] = useState(0);

  return (
    <AlertDialog open>
      <AlertDialogContent className="h-[90%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>アイコンを選択</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            詳細な検索をしたい場合は
            <a
              href="https://fonts.google.com/icons"
              className="text-sky-500 hover:underline inline-flex items-center"
            >
              こちら
              <MaterialIcon icon="open_in_browser" size="1rem" />
            </a>
          </AlertDialogDescription>
          <div>
            <Input
              type="text"
              value={searchText}
              onChange={(e) => {
                setViewIndex(0);
                setSearchText(e.target.value);
              }}
              placeholder="検索"
            />
          </div>
        </AlertDialogHeader>
        <div className="flex-1 overflow-auto">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleResolve(null)}
            >
              <span className="text-xs">なし</span>
            </Button>

            {searchResult
              .slice(viewIndex * viewNum, (viewIndex + 1) * viewNum)
              .map((v) => {
                return (
                  <IconButton
                    key={v}
                    icon={v}
                    onClick={() => handleResolve(v)}
                  />
                );
              })}
            <div className="w-full flex p-1">
              <Button
                variant="outline"
                disabled={viewIndex <= 0}
                onClick={() => setViewIndex((prev) => Math.max(prev - 1, 0))}
              >
                前のページ
              </Button>
              <Button
                variant="outline"
                className="ml-auto"
                disabled={viewIndex >= maxIndex}
                onClick={() =>
                  setViewIndex((prev) => Math.min(prev + 1, maxIndex))
                }
              >
                次のページ
              </Button>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => handleResolve(false)}>
            キャンセル
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useSelectIconModal() {
  const [_, setNodes] = useAtom(aModalNodes);

  const showConfirm = (): Promise<MaterialSymbol | null | false> => {
    return new Promise((resolve) => {
      const id = ulid();
      const handleResolve = (result: MaterialSymbol | null | false) => {
        setNodes((prev) => {
          return prev.filter((item) => item.id !== id);
        });
        resolve(result);
      };
      const node = <IconDialog key={id} handleResolve={handleResolve} />;
      setNodes((prev) => {
        return [...prev, { id, node }];
      });
    });
  };
  return { showConfirm };
}

export function useModal() {
  const [_, setNodes] = useAtom(aModalNodes);

  const showConfirm = (props: {
    title?: string;
    message?: string;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = ulid();
      const handleResolve = (result: boolean) => {
        setNodes((prev) => {
          return prev.filter((item) => item.id !== id);
        });
        resolve(result);
      };
      const node = (
        <AlertDialog open key={id}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{props.title ?? '確認'}</AlertDialogTitle>
              <AlertDialogDescription>{props.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button onClick={() => handleResolve(false)}>キャンセル</button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button onClick={() => handleResolve(true)}>OK</button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
      setNodes((prev) => {
        return [...prev, { id, node }];
      });
    });
  };
  return { showConfirm };
}
