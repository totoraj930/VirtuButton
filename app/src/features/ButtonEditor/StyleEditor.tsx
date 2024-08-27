import { ColorInput } from '@/src/components/ColorInput';
import { MaterialIcon } from '@/src/components/icon';
import { useSelectIconModal } from '@/src/components/modal';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { cn } from '@/src/utils';
import {
  ButtonStyle,
  PageItem,
  zButtonStyle,
} from '@virtu-button/common/Plugin';
import { useEffect, useId, useState } from 'react';
import { useDebounce } from 'react-use';
import { ulid } from 'ulid';
import { ButtonView } from '../ButtonView';

type Props<T extends PageItem = PageItem> = {
  item: T;
  onChange: (newItem: T) => void;
};
export function StylesEditor<T extends PageItem = PageItem>({
  item,
  onChange,
}: Props<T>) {
  const [styleIndex, setStyleIndex] = useState(`${item.viewProps.styleIndex}`);
  const currentStyle = item.styles[item.viewProps.styleIndex];

  const addStyle = () => {
    if (item.styles.length >= 5) return;
    const result = structuredClone(item);
    result.styles.push(structuredClone(zButtonStyle.parse({})));
    const newIndex = result.styles.length - 1;
    result.viewProps.styleIndex = newIndex;
    setStyleIndex(`${newIndex}`);
    onChange(result);
  };

  const updateStyleIndex = (i: number) => {
    const result = structuredClone(item);
    result.viewProps.styleIndex = i;
    onChange(result);
  };

  const deleteCurrentStyle = () => {
    const result = structuredClone(item);
    result.styles = result.styles.filter(
      (_, i) => i !== item.viewProps.styleIndex
    );
    if (result.styles.length <= item.viewProps.styleIndex) {
      result.viewProps.styleIndex = result.styles.length - 1;
      setStyleIndex(`${result.viewProps.styleIndex}`);
    }
    onChange(result);
  };

  const copyCurrentStyle = () => {
    if (item.styles.length >= 5) return;
    const result = structuredClone(item);
    const newStyle = structuredClone(currentStyle);
    result.styles.push(newStyle);
    result.viewProps.styleIndex = result.styles.length - 1;
    setStyleIndex(`${result.viewProps.styleIndex}`);
    onChange(result);
  };

  return (
    <div
      className={cn(
        'flex w-[300px] min-w-[300px] flex-col rounded bg-card border shadow'
      )}
    >
      <div className="p-2 border-b flex items-center">
        <p className="font-bold">ボタンスタイル</p>
      </div>
      <div className="overflow-auto flex-1 p-2 flex flex-col gap-2">
        <div className="flex items-center flex-wrap">
          <RadioGroup
            value={styleIndex}
            className="flex gap-3"
            onValueChange={(v) => {
              const i = Number.parseInt(v);
              if (!Number.isFinite(i)) return;
              setStyleIndex(v);
              updateStyleIndex(i);
            }}
          >
            {item.styles.map((_, i) => {
              const id = ulid();
              return (
                <div key={i} className="flex items-center">
                  <RadioGroupItem value={`${i}`} id={id} />
                  <label className="pl-1 font-bold cursor-pointer" htmlFor={id}>
                    {i + 1}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
          <Button
            variant="ghost"
            size="with_icon"
            className="ml-3"
            onClick={() => addStyle()}
            disabled={item.styles.length >= 5}
          >
            <MaterialIcon icon="add" />
            追加
          </Button>
        </div>
        <div>
          <div className="w-[80px] h-[80px]">
            <ButtonView
              viewProps={item.viewProps}
              buttonStyles={item.styles}
              className="pointer-events-none select-none"
            />
          </div>
        </div>
        {currentStyle && (
          <Style
            data={currentStyle}
            onChange={(newStyle) => {
              const res = structuredClone(item);
              res.styles[item.viewProps.styleIndex] = newStyle;
              onChange(res);
            }}
          />
        )}
        {currentStyle && (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="with_icon"
              onClick={() => copyCurrentStyle()}
            >
              <MaterialIcon icon="file_copy" />
              複製
            </Button>
            <Button
              variant="delete"
              size="icon"
              className="ml-auto"
              onClick={() => deleteCurrentStyle()}
              disabled={item.styles.length < 2}
            >
              <MaterialIcon icon="delete" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

type StyleProps = {
  data: ButtonStyle;
  onChange: (newStyle: ButtonStyle) => void;
};
export function Style({ data, onChange }: StyleProps) {
  const { showConfirm } = useSelectIconModal();
  const _id = useId();
  const [bgColor, setBgColor] = useState(data.color.background);
  const [textColor, setTextColor] = useState(data.color.text);
  const [, cancel] = useDebounce(
    () => {
      const res = structuredClone(data);
      res.color.background = bgColor;
      res.color.text = textColor;
      onChange(res);
      console.log('Debounced', bgColor);
    },
    200,
    [bgColor, textColor]
  );

  useEffect(() => {
    () => {
      cancel();
    };
  }, [cancel]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <p className="font-bold text-sm">アイコン</p>
        <Button
          variant="outline"
          size="icon"
          onClick={async () => {
            const result = await showConfirm();
            if (result === false) return;
            onChange({ ...data, icon: result ?? undefined });
          }}
        >
          {data.icon ? <MaterialIcon icon={data.icon as any} fill /> : 'なし'}
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <label className="font-bold text-sm" htmlFor={_id + 'bg'}>
          背景色
        </label>
        <ColorInput
          id={_id + 'bg'}
          value={bgColor}
          className="bg-transparent"
          onChange={(v) => {
            setBgColor(v);
          }}
        />
        {/* <input
          id={_id + 'bg'}
          type="color"
          value={bgColor}
          className="bg-transparent"
          onChange={(e) => {
            setBgColor(e.target.value);
          }}
        /> */}
      </div>

      <div className="flex items-center gap-1">
        <label className="font-bold text-sm" htmlFor={_id + 'c'}>
          文字色
        </label>
        <ColorInput
          id={_id + 'c'}
          value={textColor}
          className="bg-transparent"
          onChange={(v) => {
            setTextColor(v);
          }}
        />
        {/* <input
          id={_id + 'c'}
          type="color"
          value={textColor}
          className="bg-transparent"
          onChange={(e) => {
            setTextColor(e.target.value);
          }}
        /> */}
      </div>

      <div className="flex items-center gap-1">
        <label className="font-bold text-sm" htmlFor={_id + 'text'}>
          テキスト
        </label>
        <Input
          id={_id + 'text'}
          type="text"
          value={data.text}
          className="w-auto flex-1"
          onChange={(e) => {
            const res = structuredClone(data);
            res.text = e.target.value;
            onChange(res);
          }}
        />
      </div>

      <div className="flex items-center gap-1">
        <label className="font-bold text-sm" htmlFor={_id + 'size'}>
          文字サイズ
        </label>
        <input
          id={_id + 'size'}
          type="range"
          value={data.textSize}
          min={0}
          max={1000}
          step={50}
          onChange={(e) => {
            const res = structuredClone(data);
            res.textSize = Number.parseInt(e.target.value);
            onChange(res);
          }}
        />
      </div>

      <div className="flex items-center gap-1">
        <label className="font-bold text-sm" htmlFor={_id + 'op'}>
          透明度
        </label>
        <input
          id={_id + 'op'}
          type="range"
          value={1 - data.bgOpacity}
          min={0}
          max={1}
          step={0.1}
          onChange={(e) => {
            const res = structuredClone(data);
            res.bgOpacity = 1 - Number.parseFloat(e.target.value);
            onChange(res);
          }}
        />
      </div>
    </div>
  );
}
