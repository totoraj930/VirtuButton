import { Checkbox } from '@/src/components/ui/checkbox';
import { BooleanField } from '@virtu-button/common/Plugin';
import { useId } from 'react';

type Props = {
  prop: BooleanField;
  value: boolean;
  onChange?: (v: boolean) => void;
};

export function BooleanFieldInput({
  value,
  onChange,
  prop: { name, description, disabled },
}: Props) {
  const id = useId();
  return (
    <div className="flex items-center gap-0.5">
      <Checkbox
        id={id}
        checked={value}
        disabled={disabled}
        onCheckedChange={(state) => {
          onChange?.(state === true);
        }}
      />
      <label htmlFor={id} className="text-xs font-bold py-1 cursor-pointer">
        {name}
      </label>
    </div>
  );
}
