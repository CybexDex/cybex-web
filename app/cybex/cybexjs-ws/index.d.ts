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
    init_promise: Promise<any>;
    chain_id?: string;
    setRpcConnectionStatusCallback(handler: (status: any) => any): void;
  }
  const Apis: {
    setRpcConnectionStatusCallback(handler: (status: any) => any): void;
    instance(
      cs?: string,
      connect?: boolean,
      connectTimeout?: number,
      enableCrypto?: boolean
    ): ApisInstance;
    close: Promise<any>;
    reset: Promise<any>;
    setAutoReconnect(auto: boolean): void;
    chainId(): string;
  };
  
  const ChainConfig: {
    core_asset: string;
    address_prefix: string;
    expire_in_secs: number;
    expire_in_secs_proposal: number;
    review_in_secs_committee: number;
    networks: any;
    setChainId(chainID: string): { network_name: string; network: any } | void;
    reset(): void;
    setProposalExpire(time: number): number;
    setPrefix(address: string): string;
  };
}
