import { MaterialIcon } from '@/src/components/icon';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ipcSend } from '@/src/ipcEvent';
import { usePluginAction, usePluginEvent, usePluginFields } from '@/src/store';
import { cn } from '@/src/utils';
import {
  ButtonHandler,
  ButtonTask,
  Button as PluginButton,
  zButtonTask,
} from '@virtu-button/common/Plugin';
import { useEffect, useMemo, useState } from 'react';
import { ulid } from 'ulid';
import { PluginFieldsEditor } from '../PluginFieldEditor';
import { ItemViewProps, SortableLite } from '../Sortable/SortableLite';
import { AddTaskButton } from './AddTaskButton';
import { EventDropdownMenuItems } from './EventDropdownMenuItems';
import { EventEditor } from './EventEditor';

type Props = {
  button: PluginButton;
  // handlers: ButtonHandler[];
  // onChange?: (handlers: ButtonHandler[]) => void;
  onChange: (newButton: PluginButton) => void;
};

export function SortableHandlers({ button, onChange }: Props) {
  const setNewHandler = (newHandler: ButtonHandler) => {
    const result = structuredClone(button);
    result.handlers = result.handlers.map((handler) => {
      if (handler.id === newHandler.id) {
        return newHandler;
      }
      return handler;
    });
    onChange(result);
  };

  const deleteHandler = (handlerId: string) => {
    const result = structuredClone(button);
    result.handlers = result.handlers.filter(({ id }) => id !== handlerId);
    onChange(result);
  };

  return (
    <>
      {button.handlers.map((handler) => {
        return (
          <Handler
            data={handler}
            key={handler.id}
            onChange={setNewHandler}
            onDelete={deleteHandler}
          />
        );
      })}
    </>
  );
}

type HandlerProps = {
  data: ButtonHandler;
  onChange: (newHandler: ButtonHandler) => void;
  onDelete: (handlerId: string) => void;
};
export function Handler({ data, onChange, onDelete }: HandlerProps) {
  const pluginEvent = usePluginEvent(data.event.pluginId, data.event.eventId);
  const [tasks, setTasks] = useState(data.tasks);
  const [eventValues, setEventValues] = useState(data.event.fieldValues);

  // だるいのでjsonにして変更を検知するよ
  // まじでアンチパターン
  const json = useMemo(() => {
    return JSON.stringify([tasks, eventValues]);
  }, [tasks, eventValues, pluginEvent]);

  useEffect(() => {
    onChange({
      ...data,
      tasks,
      event: {
        ...data.event,
        fieldValues: eventValues,
      },
    });
  }, [json]);

  useEffect(() => {
    setTasks(data.tasks);
  }, [data, setTasks]);

  return !pluginEvent ? (
    <></>
  ) : (
    <div
      className={cn(
        'flex w-[300px] min-w-[300px] flex-col rounded bg-card border shadow'
      )}
    >
      <div className={cn('border-b p-2 gap-1 flex items-center')}>
        <DropdownMenu>
          <DropdownMenuTrigger variant="ghost" size="icon_sm">
            <MaterialIcon icon="bolt" fill />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <EventDropdownMenuItems
              onSelect={async (pEvent) => {
                const newHandler = await ipcSend('get:newHandler', pEvent);
                onChange({
                  ...data,
                  event: newHandler.event,
                });
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1">
          <p className={cn('font-bold')}>{pluginEvent.name}</p>
          <p className={cn('text-xs text-gray-500 dark:text-gray-400')}>
            {pluginEvent.description ?? 'イベントの説明がありません'}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger variant="ghost" size="icon_sm">
            <MaterialIcon icon="menu" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => {
                ipcSend('run:tasks', tasks);
              }}
            >
              <MaterialIcon icon="play_arrow" size={20} className="mr-1" />
              実行
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 focus:bg-red-500 focus:bg-opacity-20"
              onClick={() => {
                onDelete(data.id);
              }}
            >
              <MaterialIcon icon="delete" size={20} className="mr-1" />
              削除
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ol className={cn('flex-1 overflow-y-auto event-none')}>
        <EventEditor
          pluginId={data.event.pluginId}
          eventId={data.event.eventId}
          initFieldValues={data.event.fieldValues}
          onChange={(newValues) => {
            setEventValues(newValues);
          }}
        />

        <li className="flex justify-center p-1">
          <MaterialIcon icon="keyboard_double_arrow_down" />
        </li>
        <SortableLite
          items={tasks}
          itemParser={zButtonTask.parse}
          onChange={(newTasks) => {
            setTasks(newTasks);
          }}
          itemView={(props) => <Task key={props.item.id} {...props} />}
        />

        {tasks.length === 0 && (
          <li className="py-1 px-2 relative">
            <p
              className={cn(
                'flex justify-center items-center h-10 text-sm',
                'text-gray-500 border-dashed border rounded'
              )}
              onDrop={(e) => {
                try {
                  const rawData = e.dataTransfer.getData('text/plain');
                  const rawJson = JSON.parse(rawData);
                  const task = zButtonTask.parse(rawJson);
                  setTasks((prev) => {
                    const res = [...prev, { ...task, id: ulid() }];
                    onChange({ ...data, tasks: res });
                    return res;
                  });
                } catch {
                  /* error */
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              アクションがありません
            </p>
          </li>
        )}

        <li className="p-2 flex">
          <AddTaskButton
            onAdd={(task) =>
              setTasks((prev) => {
                const res = [...prev, task];
                onChange({ ...data, tasks: res });
                return res;
              })
            }
          />
        </li>
      </ol>
    </div>
  );
}

function Task({
  item: task,
  itemProps,
  handleProps,
  isActive,
  reduce,
}: ItemViewProps<ButtonTask>) {
  const action = usePluginAction(task.pluginId, task.actionId);
  const [fields, errorText] = usePluginFields(
    action?.fieldsId,
    task.fieldValues
  );

  const fieldValuesJson = useMemo(
    () => JSON.stringify(task.fieldValues),
    [task]
  );

  return !action ? (
    <li className="py-1 px-2 relative" {...itemProps} data-active={isActive}>
      <p
        {...handleProps}
        className={cn(
          'flex justify-center items-center p-2',
          'border rounded',
          'text-sm text-gray-500',
          {
            'opacity-50': isActive,
          }
        )}
      >
        <MaterialIcon icon="warning" size={16} className="mx-2" />
        未知のアクションです
        <Button
          variant="delete"
          size="icon"
          className="ml-auto"
          onClick={() => {
            reduce({
              name: 'Delete',
              itemId: task.id,
            });
          }}
        >
          <MaterialIcon icon="delete" />
        </Button>
      </p>
    </li>
  ) : (
    <li
      {...itemProps}
      data-active={isActive}
      className={cn('py-1 px-2 relative', {
        'opacity-50': isActive,
      })}
    >
      <details
        open
        className={cn(
          'rounded overflow-hidden border shadow group bg-background'
        )}
      >
        <summary
          className={cn(
            'flex items-center cursor-pointer rounded h-10',
            '-outline-offset-1'
          )}
        >
          <button
            className="flex cursor-grab px-2 py-3"
            {...handleProps}
            tabIndex={-1}
          >
            <MaterialIcon icon="drag_indicator" size={16} />
          </button>
          <p className="text-sm">{action.name}</p>
          <MaterialIcon
            icon="keyboard_arrow_down"
            className="ml-auto mr-2 group-open:rotate-180"
          />
        </summary>
        <div className={cn('p-2 group-open:border-t')}>
          <div className="flex gap-y-1 gap-x-3 flex-wrap">
            {!fields && !errorText && <p>読み込み中</p>}
            {errorText && <p className="text-red-500">{errorText}</p>}
            {fields && (
              <PluginFieldsEditor
                fields={fields}
                values={task.fieldValues}
                onChange={(newParams) => {
                  reduce({
                    name: 'Edit',
                    itemId: task.id,
                    newItem: {
                      ...task,
                      fieldValues: newParams,
                    },
                  });
                }}
              />
            )}
          </div>
          <div className="flex mt-1">
            <Button
              variant="delete"
              size="icon_sm"
              className="ml-auto"
              onClick={() => {
                reduce({
                  name: 'Delete',
                  itemId: task.id,
                });
              }}
            >
              <MaterialIcon icon="delete" />
            </Button>
          </div>
        </div>
      </details>
    </li>
  );
}
