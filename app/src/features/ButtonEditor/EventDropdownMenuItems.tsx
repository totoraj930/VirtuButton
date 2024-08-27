import { DropdownMenuItem } from '@/src/components/ui/dropdown-menu';
import { usePluginEvents } from '@/src/store';
import { PluginEventSerialized } from '@virtu-button/common/Plugin';

type Props = {
  onSelect?: (pEvent: PluginEventSerialized) => void;
};

export function EventDropdownMenuItems({ onSelect }: Props) {
  const pluginEvents = usePluginEvents();
  return (
    <>
      {pluginEvents.map((pluginEvent) => {
        return (
          <DropdownMenuItem
            key={pluginEvent.pluginId + ':' + pluginEvent.id}
            onClick={() => onSelect?.(pluginEvent)}
          >
            <div className="flex flex-col">
              <span>{pluginEvent.name}</span>
              <span className="text-xs pl-2 opacity-50">
                {pluginEvent.description}
              </span>
            </div>
          </DropdownMenuItem>
        );
      })}
    </>
  );
}
