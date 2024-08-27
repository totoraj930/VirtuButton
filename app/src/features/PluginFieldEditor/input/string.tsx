import { Input } from '@/src/components/ui/input';
import { StringField } from '@virtu-button/common/Plugin';
import { useId } from 'react';

type Props = {
  prop: StringField;
  value: string;
  onChange?: (v: string) => void;
};

export function StringFieldInput({
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
      <Input
        id={id}
        type="text"
        className="inline-flex w-auto"
        defaultValue={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
}
