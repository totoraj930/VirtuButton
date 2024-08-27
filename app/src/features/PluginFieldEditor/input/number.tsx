import { Input } from '@/src/components/ui/input';
import { NumberField, VBError } from '@virtu-button/common/Plugin';
import { useId } from 'react';

type Prop = {
  prop: NumberField;
  value: number;
  onChange?: (v: number) => void;
};

export function NumberFieldInput({
  prop: { min, max, step, name, description, disabled, placeholder },
  value,
  onChange,
}: Prop) {
  const id = useId();
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-xs font-bold block p-0.5">
        {name}
      </label>
      <Input
        id={id}
        type="number"
        defaultValue={value}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        className="inline-flex w-auto"
        onChange={(e) => {
          try {
            const v = Number.parseInt(e.target.value);
            if (!Number.isFinite(v)) {
              throw new VBError('無効な数値です');
            }
            if (min !== undefined && min > v) {
              throw new VBError('数値が小さすぎます');
            }
            if (max !== undefined && max < v) {
              throw new VBError('数値が大きすぎます');
            }
            onChange?.(v);
          } catch (error) {
            if (error instanceof VBError) {
              console.error(error);
            }
          }
        }}
      />
    </div>
  );
}
