/// < reference types="node" />
declare module "cybexjs" {
  
  type ParamsOfCheck = {
    accountName: string;
    password: string
    auths: {[x: string]: [string, number][]}
  };
  class AccountLogin {
    checkKeys: (paramsToCheck: ParamsOfCheck) => boolean;
    generateKeys(accountName: string, password: string, roles?: string[], prefix?: string): any;
    signTransaction(tr: any): void;
  }
  const Login: AccountLogin;
  class ChainStoreClass {
    resetCache(): void;
    init: () => Promise<any>;
    subscribe(handler: (obj: object) => any): void;
    unsubscribe(handler: (obj: object) => any): void;
    getObject(id: string): any;
    getAccount(name_or_id: string, autosubscribe?: boolean): any;
  }
  const ChainStore: ChainStoreClass;
  const TransactionBuilder: any;
  const FetchChain: (apiMethod: string, ...args: any[]) => Promise<any>;
  const TransactionHelper: any;
  const Aes: any;
  const PublicKey: any;
}
declare module "cybexjs-ws" {
  class Apis {
    static setRpcConnectionStatusCallback(handler: (status: any) => any): void;
    static instance(cs: string, connect: boolean, connectTimeout?: number, enableCrypto?: boolean): Apis;
    init_promise: Promise<any>
  }
}
declare module "types" {
  
  // Some common types
  type PublicKeys = {
    [x: string]: string | string[]
  };
  type PublicKeysToCheck = {
    [x: string]: [string, number][]
  };
  type TransferObject = {
    from_account: string,
    to_account: string,
    amount: number,
    asset: string,
    memo?: string
  };
}