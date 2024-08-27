import { COLORS } from '@virtu-button/common/Plugin';
import { useMemo } from 'react';

type Props = {
  onSelect?: (hex: string) => void;
};
export function ColorPallet({ onSelect }: Props) {
  const palette = useMemo(() => getBasicPalette(), []);
  return (
    <div className="grid grid-cols-8 gap-0.5">
      {palette.map((hex, i) => {
        return (
          <button
            className="aspect-square"
            style={{ background: hex }}
            key={i}
            onClick={() => onSelect?.(hex)}
          ></button>
        );
      })}
    </div>
  );
}

function getBasicPalette() {
  type ColorName = keyof typeof COLORS;
  const keys = Object.keys(COLORS) as ColorName[];
  const res: string[] = new Array(keys.length * 8);
  const colorMap: ColorName[] = [
    'red',
    'orange',
    'yellow',
    'lime',
    'cyan',
    'blue',
    'purple',
    'pink',
  ];
  for (const key of keys) {
    if (key === 'gray') {
      res[0] = COLORS[key][1000];
      res[1] = COLORS[key][900];
      res[2] = COLORS[key][600];
      res[3] = COLORS[key][400];
      res[4] = COLORS[key][300];
      res[5] = COLORS[key][200];
      res[6] = COLORS[key][100];
      res[7] = COLORS[key][0];
    } else {
      const x = colorMap.indexOf(key);
      res[8 * 1 + x] = COLORS[key][600];
      res[8 * 2 + x] = COLORS[key][400];
      res[8 * 3 + x] = COLORS[key][300];
      res[8 * 4 + x] = COLORS[key][100];
      res[8 * 5 + x] = COLORS[key][950];
    }
  }
  return res;
}

// HSLからHEXに変換する関数
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // 16進数に変換
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
