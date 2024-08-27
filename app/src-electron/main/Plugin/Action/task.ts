import {
  ActionPayload,
  ActionResult,
  ButtonTask,
  VBPluginActionError,
} from '@virtu-button/common/Plugin';
import { dialog } from 'electron';
import { getPluginAction } from '.';

export async function runButtonTask(task: ButtonTask, payload: ActionPayload) {
  const action = getPluginAction(task.pluginId, task.actionId);
  if (!action) {
    throw new VBPluginActionError('アクションが存在しません', {
      cause: { from: { pluginId: task.pluginId, actionId: task.actionId } },
    });
  }
  return await action.run(task.fieldValues, payload);
}

const taskFlags: Map<string, 'running' | 'canceled'> = new Map();
let _id = 0;
/**
 * タスクリストを順番に実行する
 * @param tasks 実行するタスクリスト
 * @param from どこから実行されたか
 * @returns
 */
export function runButtonTasks(
  tasks: ButtonTask[],
  from: ActionPayload['from'] = {}
) {
  const id = `taskId-${_id++}`;
  taskFlags.set(id, 'running');
  const basePayload: ActionPayload = {
    from,
    stopNextActions: () => {
      taskFlags.delete(id);
    },
  };
  (async () => {
    // イベントからの実行ならprevResultにPluginEventPropsを格納
    let prevResultValue: any = from?.event;
    let prevTask: ButtonTask | undefined;

    for (const task of tasks) {
      if (taskFlags.get(id) === 'running') {
        // 直前のActionがあればリザルトを作成
        let prevResult: ActionResult | undefined;
        if (prevTask) {
          prevResult = {
            ...prevTask,
            value: prevResultValue,
          };
        }

        try {
          // Actionの結果を保持
          prevResultValue = await runButtonTask(task, {
            ...basePayload,
            prevResult,
          });
          prevTask = task;
        } catch (error) {
          const msg = error instanceof Error ? error.message : '';
          const msgs = [
            'アクションでエラーが発生しました',
            `${JSON.stringify(task, null, '  ')}`,
            msg,
          ];
          console.error(error);
          dialog.showErrorBox('アクションエラー', msgs.join('\n'));
          // const e = new VBPluginActionError(msg, {
          //   cause: {
          //     from: {
          //       pluginId: task.pluginId,
          //       actionId: task.actionId,
          //     },
          //   },
          // });
        }
      } else {
        break;
      }
    }
    // taskFlags.set(id, 'ended');
    taskFlags.delete(id);
  })();
  return id;
}

export function cancelActionTask(id: string) {
  // return taskFlags.set(id, 'canceled');
  return taskFlags.delete(id);
}
