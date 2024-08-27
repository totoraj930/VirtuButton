import { cn } from '@/src/utils';
import {
  SelectField,
  SelectOptionHr,
  SelectOptionK,
} from '@virtu-button/common/Plugin';
import { useEffect, useId, useState } from 'react';

type Props<T extends string = any> = {
  prop: SelectField<any>;
  value: T;
  onChange?: (v: T) => void;
};

export function SelectFieldInput<T extends string>({
  prop: { options, name, description, disabled },
  value,
  onChange,
  className,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithRef<'select'>, keyof Props<T>>) {
  type Option = SelectOptionK<T> | SelectOptionHr;
  type Group = Option | { name: string; options: Option[] };
  const [group, setGroup] = useState<Group[]>([]);
  const [val, setVal] = useState(value);
  const id = useId();

  const Option = ({ o }: { o: Option }) => {
    return 'type' in o ? (
      <></>
    ) : (
      <option key={o.key} value={o.key}>
        {o.name}
      </option>
    );
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    const g: Group[] = [];
    let current = -1;
    const keys: string[] = [];
    for (const option of options) {
      if ('key' in option) {
        keys.push(option.key);
      }

      if ('type' in option && option.type === 'group') {
        g.push({
          name: option.name,
          options: [],
        });
        current = g.length - 1;
      } else {
        const currentGroup = g[current];
        if (currentGroup && 'options' in currentGroup) {
          currentGroup.options.push(option);
        } else {
          g.push(option);
        }
      }
    }
    setGroup(g);
    if (!keys.includes(val)) {
      const v = (keys[0] ?? '') as typeof val;
      setVal(v);
      onChange?.(v);
    }
  }, [options, setGroup]);
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs font-bold block p-0.5">
        {name}
      </label>
      <select
        {...props}
        id={id}
        value={val}
        onChange={(e) => {
          onChange?.(e.target.value as T);
          setVal(e.target.value as T);
        }}
        disabled={disabled}
        className={cn(
          'inline-flex h-10 items-center justify-between rounded-md border border-input',
          'bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className
        )}
      >
        {group.map((v, i) => {
          if ('options' in v) {
            return (
              <optgroup label={v.name} key={i}>
                {v.options.map((option, n) => (
                  <Option o={option} key={n} />
                ))}
              </optgroup>
            );
          } else {
            return <Option o={v} key={i} />;
          }
        })}
      </select>
    </div>
  );
}
