import { MaterialIcon } from '@/src/components/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ipcSend } from '@/src/ipcEvent';
import { usePluginActions, usePlugins } from '@/src/store';
import { ButtonTask } from '@virtu-button/common/Plugin';

type Props = {
  onAdd?: (task: ButtonTask) => void;
};

export function AddTaskButton({ onAdd }: Props) {
  const actions = usePluginActions();
  const plugins = usePlugins();

  const getPlugin = (pluginId: string) => {
    return plugins.find(({ id }) => id === pluginId);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger variant="ghost" size="with_icon" className="">
          <MaterialIcon icon="add" />
          <span>アクションを追加</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actions.map((action) => {
            const plugin = getPlugin(action.pluginId);
            return (
              <DropdownMenuItem
                key={action.pluginId + ':' + action.id}
                onClick={async () => {
                  onAdd?.(await ipcSend('get:newTask', action));
                }}
              >
                <div className="flex flex-col">
                  <span>{action.name}</span>
                  <span className="text-xs pl-2 opacity-50">
                    {/* {plugin?.name} */}
                    {action.description}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
          {/* {[...new Array(30)].map((_, i) => {
            return <DropdownMenuItem key={i}></DropdownMenuItem>;
          })} */}
          {/* <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
