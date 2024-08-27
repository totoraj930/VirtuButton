import { DropdownMenuItem } from '@/src/components/ui/dropdown-menu';
import { usePluginCBs } from '@/src/store';
import { ControlButtonSerialized } from '@virtu-button/common/Plugin';

type Props = {
  onSelect?: (pCBs: ControlButtonSerialized) => void;
};

export function CBDropdownMenuItems({ onSelect }: Props) {
  const pluginCBs = usePluginCBs();
  return (
    <>
      {pluginCBs.map((pCB) => {
        return (
          <DropdownMenuItem
            key={pCB.pluginId + ':' + pCB.id}
            onClick={() => onSelect?.(pCB)}
          >
            <div className="flex flex-col">
              <span>{pCB.name}</span>
              <span className="text-xs pl-2 opacity-50">{pCB.description}</span>
            </div>
          </DropdownMenuItem>
        );
      })}
    </>
  );
}
