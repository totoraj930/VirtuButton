import { cn } from '@/src/utils';
import { TextField } from '@virtu-button/common/Plugin';
import { useId } from 'react';

type Props = {
  prop: TextField;
  value: string;
  onChange?: (v: string) => void;
};

export function TextFieldInput({
  value,
  onChange,
  prop: { name, description, disabled, placeholder },
}: Props) {
  const id = useId();
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs font-bold block p-0.5">
        {name}
      </label>
      <textarea
        id={id}
        className={cn(
          'flex max-h-64 w-full rounded-md border border-input bg-background',
          'px-3 py-2 text-sm ring-offset-background',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'inline-flex w-auto'
        )}
        style={
          {
            fieldSizing: 'content',
          } as any
        }
        defaultValue={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
