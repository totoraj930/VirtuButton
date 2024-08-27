import { cn } from '../utils';
import { ColorPallet } from './ColorPallet';
import { MaterialIcon } from './icon';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Props = {
  value: string;
  onChange?: (hex: string) => void;
  className?: string;
  id?: string;
};
export function ColorInput({ value, id, className, onChange }: Props) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <input
        type="color"
        className="bg-transparent"
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        id={id}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon_sm">
            <MaterialIcon icon="palette" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]">
          <ColorPallet onSelect={(hex) => onChange?.(hex)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
