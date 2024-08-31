import { ZodError } from 'zod';
import { ToClientEvent, ToServerEvent, zToClientEvent } from './schema';

type WsClientOps = {
  reconnectInterval?: number;
  maxRetries?: number;
};

type EventData<K extends ToClientEvent['name']> = Extract<
  ToClientEvent,
  { name: K }
>['data'];
type EventCB<K extends ToClientEvent['name']> = (data: EventData<K>) => void;
type EventSet<K extends ToClientEvent['name']> = Set<EventCB<K>>;

export class WsClient {
  #url: string | null = null;
  #ws: WebSocket | null = null;
  #reconnectInterval: number = 3000;
  #maxRetries: number = 5;
  #retryCount: number = 0;
  #offWindowFocusCB = () => {};

  #handlers: {
    [K in ToClientEvent['name']]: EventSet<K>;
  } = {
    'update:item': new Set(),
    'update:view': new Set(),
    'update:ivp': new Set(),
  };

  constructor(ops?: WsClientOps) {
    this.#reconnectInterval = ops?.reconnectInterval ?? this.#reconnectInterval;
    this.#maxRetries = ops?.maxRetries ?? this.#maxRetries;
  }

  get url() {
    return this.#url;
  }

  get status() {
    return this.#ws?.readyState;
  }

  public connect(url: string) {
    this.close();
    this.#url = url;
    const ws = new WebSocket(url);
    this.#ws = ws;

    ws.onopen = () => {
      this.#retryCount = 0;
    };

    ws.onmessage = (event) => {
      this.onMessage(event.data);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = (event) => {
      if (!event.wasClean) {
        this.retryConnection(url);
      }
    };

    const onFocus = () => {
      if (!this.#url) return;
      if (!this.#ws) return;
      if (this.#ws.readyState === WebSocket.CLOSED) {
        this.#retryCount = 0;
        this.retryConnection(this.#url);
      }
    };
    window.addEventListener('focus', onFocus);
    this.#offWindowFocusCB = () => window.removeEventListener('focus', onFocus);
  }

  public close() {
    if (this.#ws) {
      this.#offWindowFocusCB();
      this.#ws.close();
      this.#ws = null;
    }
  }

  private retryConnection(url: string) {
    if (this.#retryCount < this.#maxRetries) {
      this.#retryCount++;
      console.log(`再接続 (${this.#retryCount}/${this.#maxRetries})`);
      setTimeout(() => {
        this.connect(url);
      }, this.#reconnectInterval);
    } else {
      console.error('再接続の上限を超えました');
    }
  }

  protected onMessage(data: any) {
    try {
      const rawJson = JSON.parse(data);
      const serverEvent = zToClientEvent.parse(rawJson);
      this.emit(serverEvent.name, serverEvent.data);
    } catch (e) {
      if (e instanceof ZodError) {
        console.log(e.errors);
      }
      console.log(data);
      console.error(e);
    }
  }

  public send(event: ToServerEvent) {
    if (!this.#ws || this.#ws.readyState !== WebSocket.OPEN) return;
    this.#ws.send(JSON.stringify(event));
  }

  private emit<K extends ToClientEvent['name']>(name: K, data: EventData<K>) {
    this.#handlers[name].forEach((cb) => {
      cb(data);
    });
  }

  public on<K extends ToClientEvent['name']>(name: K, cb: EventCB<K>) {
    this.#handlers[name].add(cb);
    return () => {
      this.off(name, cb);
    };
  }

  public off<K extends ToClientEvent['name']>(name: K, cb?: EventCB<K>) {
    if (!this.#handlers[name]) return;
    if (cb) {
      this.#handlers[name].delete(cb);
    } else {
      this.#handlers[name].clear();
    }
  }
}
