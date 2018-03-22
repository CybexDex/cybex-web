declare module "cybexjs-ws" {
  class GrapheneApi {
    constructor(ws_rpc, api_name);
    init(): Promise<any>;
    exec(method: any, params: any): Promise<any>;
  }

  class ApisInstance {
    connect(): void;
    close(): void;
    db_api(): GrapheneApi;
    history_api(): GrapheneApi;
    network_api(): GrapheneApi;
    crypto_api(): GrapheneApi;
    init_promise: Promise<any>
    setRpcConnectionStatusCallback(handler: (status: any) => any): void;
  }
  const Apis: {
    setRpcConnectionStatusCallback(handler: (status: any) => any): void;
    instance(cs?: string, connect?: boolean, connectTimeout?: number, enableCrypto?: boolean): ApisInstance;
    close: Promise<any>
    reset: Promise<any>
    setAutoReconnect(auto: boolean): void;
    chainId(): string;
  }
  const ChainConfig: any;
}