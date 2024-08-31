import {
  ToClientEvent,
  ToServerEvent,
  zToServerEvent,
} from '@/src-common/ws/schema';
import { ButtonViewProps, PageItem } from '@virtu-button/common/Plugin';
import { Context } from 'hono';
import { WSContext, WSEvents } from 'hono/ws';
import { basicFeaturesPlugin } from '../built-in/basic-features';
import {
  emitCBInstanceEvent,
  getCurrentPageViewPayload,
  toPageItemSerialized,
} from '../Page';
import { emitPluginEvent } from '../Plugin/Event';
import { changeCurrentPage } from '../settings';

const wsContexts: Set<WSContext> = new Set();
// const wsAuthContexts: Set<WSContext> = new Set();

type WebScoketHandler = (c: Context) => WSEvents | Promise<WSEvents>;
export const wsHandler: WebScoketHandler = (c) => {
  return {
    onOpen(_event, ws) {
      wsContexts.add(ws);
      wsEmit(ws, { name: 'update:view', data: getCurrentPageViewPayload() });
    },
    onClose(_event, ws) {
      wsContexts.delete(ws);
      // wsAuthContexts.delete(ws);
    },
    onMessage(event, ws) {
      try {
        if (typeof event.data !== 'string') return;
        const rawJson = JSON.parse(event.data);
        const toServerEvent = zToServerEvent.parse(rawJson);
        console.log(toServerEvent);
        eventHandler(toServerEvent, ws);
      } catch (e) {
        console.log(e);
      }
    },
  };
};

export function wsEmit(to: WSContext, event: ToClientEvent) {
  to.send(JSON.stringify(event));
}

export function wsEmitAll(event: ToClientEvent) {
  wsContexts.forEach((ws) => {
    wsEmit(ws, event);
  });
}

export function wsEmitCurrentPage() {
  wsEmitAll({
    name: 'update:view',
    data: getCurrentPageViewPayload(),
  });
}

export function wsEmitButton(item: PageItem) {
  wsEmitAll({
    name: 'update:item',
    data: toPageItemSerialized(item),
  });
}

export function wsEmitItemViewProps(
  id: string,
  viewProps: Partial<ButtonViewProps>
) {
  wsEmitAll({
    name: 'update:ivp',
    data: {
      id,
      ...viewProps,
    },
  });
}

function eventHandler(event: ToServerEvent, ws: WSContext) {
  // if (!wsAuthContexts.has(ws)) return;
  switch (event.name) {
    case 'button:click': {
      emitCBInstanceEvent(event.buttonId, 'onClick');
      emitPluginEvent({
        pluginId: basicFeaturesPlugin.id,
        eventId: 'button',
        fieldValues: {
          eventType: 'click',
        },
        buttonId: event.buttonId,
        args: [],
      });
      break;
    }
    case 'button:down': {
      emitCBInstanceEvent(event.buttonId, 'onDown');
      emitPluginEvent({
        pluginId: basicFeaturesPlugin.id,
        eventId: 'button',
        fieldValues: {
          eventType: 'down',
        },
        buttonId: event.buttonId,
        args: [],
      });
      break;
    }
    case 'button:up': {
      emitCBInstanceEvent(event.buttonId, 'onUp');
      emitPluginEvent({
        pluginId: basicFeaturesPlugin.id,
        eventId: 'button',
        fieldValues: {
          eventType: 'up',
        },
        buttonId: event.buttonId,
        args: [],
      });
      break;
    }
    case 'page:next': {
      changeCurrentPage('next');
      break;
    }
    case 'page:prev': {
      changeCurrentPage('prev');
      break;
    }
  }
}
