import { OBSWebSocketError } from 'obs-websocket-js';

export enum WebSocketCloseCode {
  DontClose = 0, // 内部使用のみ: リクエストハンドラにクローズアクションを実行しないよう指示する
  UnknownReason = 4000, // 不明な理由: 使用されるべきではない
  MessageDecodeError = 4002, // メッセージデコードエラー: サーバーが受信したWebSocketメッセージをデコードできない
  MissingDataField = 4003, // データフィールド欠落: ペイロードからデータフィールドが欠落している
  InvalidDataFieldType = 4004, // 無効なデータフィールドタイプ: データフィールドの値のタイプが無効
  InvalidDataFieldValue = 4005, // 無効なデータフィールド値: データフィールドの値が無効
  UnknownOpCode = 4006, // 無効なOpコード: 指定された`op`が無効または欠落している
  NotIdentified = 4007, // 未認証: クライアントが`Identify`メッセージを送信せずにWebSocketメッセージを送信した
  AlreadyIdentified = 4008, // 既に認証済み: クライアントが既に認証されている状態で`Identify`メッセージを送信した
  AuthenticationFailed = 4009, // 認証失敗: `Identify`による認証が失敗した
  UnsupportedRpcVersion = 4010, // サポートされていないRPCバージョン: クライアントがサポートされていないRPCバージョンを使用している
  SessionInvalidated = 4011, // セッション無効化: サーバーがセッションを無効化した
  UnsupportedFeature = 4012, // サポートされていない機能: クライアントがサポートされていない機能を要求した
  ConnectionClosed = 1000, // 正常なクローズ: 接続が正常に終了した
  GoingAway = 1001, // サーバー側終了: サーバーが停止するか、クライアントがページを離れた
  ProtocolError = 1002, // プロトコルエラー: プロトコルエラーにより接続が終了された
  UnsupportedData = 1003, // サポートされていないデータ: サポートされていないデータ形式を受信したため接続が終了された

  NotFound = -1,
}

export enum RequestStatus {
  Unknown = 0, // 不明なステータス
  NoError = 10, // エラーなし
  Success = 100, // 成功
  MissingRequestType = 203, // リクエストタイプが欠落している
  UnknownRequestType = 204, // 不明なリクエストタイプ
  UnsupportedRequestBatchExecutionType = 206, // サポートされていないリクエストバッチ実行タイプ
  MissingRequestField = 300, // リクエストフィールドが欠落している
  MissingRequestData = 301, // リクエストデータが欠落している
  InvalidRequestFieldType = 401, // 無効なリクエストフィールドタイプ
  RequestFieldOutOfRange = 402, // リクエストフィールドが範囲外
  RequestFieldEmpty = 403, // リクエストフィールドが空
  TooManyRequestFields = 404, // リクエストフィールドが多すぎる
  OutputRunning = 500, // 出力中
  OutputNotRunning = 501, // 出力停止中
  OutputPaused = 502, // 出力一時停止中
  OutputNotPaused = 503, // 出力が一時停止されていない
  OutputDisabled = 504, // 出力が無効化されている
  StudioModeActive = 505, // スタジオモードが有効
  StudioModeNotActive = 506, // スタジオモードが無効
  ResourceAlreadyExists = 601, // リソースが既に存在する
  InvalidResourceType = 602, // 無効なリソースタイプ
  NotEnoughResources = 603, // リソースが不足している
  InvalidResourceState = 604, // 無効なリソース状態
  InvalidInputKind = 605, // 無効な入力種別
  InvalidFilterKind = 607, // 無効なフィルター種別
  ResourceCreationFailed = 700, // リソースの作成に失敗
  ResourceActionFailed = 701, // リソースの操作に失敗
  RequestProcessingFailed = 702, // リクエストの処理に失敗
  CannotAct = 703, // このリクエストではアクションを実行できない
}

export function codeToStatusText(code: number) {
  const enumValToKey = (enumObj: any, target: number): string | undefined => {
    return Object.entries(enumObj).find(([_, val]) => val === target)?.[0];
  };
  return (
    enumValToKey(WebSocketCloseCode, code) ?? enumValToKey(RequestStatus, code)
  );
}

export function errorToText(error: any) {
  if (error instanceof Error) {
    if (error instanceof OBSWebSocketError) {
      return `OBS Error(${codeToStatusText(error.code) ?? error.code})`;
    } else {
      return error.message;
    }
  } else {
    return `OBS Error`;
  }
}
