import '@material-symbols/font-400';
import { MaterialSymbol } from '@material-symbols/font-400';
import { cn } from '../utils';
import { useEffect, useState } from 'react';

type MaterialSymbolStyle = 'outlined' | 'rounded' | 'sharp';
type Props = {
  style?: MaterialSymbolStyle;
  fill?: boolean;
  icon: MaterialSymbol;
  className?: string;
  size?: string | number;
};
export function MaterialIcon({ icon, style, className, size, fill }: Props) {
  return (
    <span
      className={cn(
        {
          'material-symbols-outlined':
            style === 'outlined' || style === undefined,
          'material-symbols-rounded': style === 'rounded',
          'material-symbols-sharp': style === 'sharp',
        },
        'select-none inline-flex',
        className
      )}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}`,
      }}
    >
      {icon}
    </span>
  );
}
