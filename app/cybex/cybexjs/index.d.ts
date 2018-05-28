declare module "cybexjs" {
  type ParamsOfCheck = {
    accountName: string;
    password: string;
    auths: { [x: string]: [string, number][] };
  };
  class AccountLogin {
    checkKeys: (paramsToCheck: ParamsOfCheck) => boolean;
    generateKeys(
      accountName: string,
      password: string,
      roles?: string[],
      prefix?: string
    ): any;
    signTransaction(tr: any): void;
  }
  const Login: AccountLogin;
  class ChainStoreClass {
    resetCache(): void;
    init: () => Promise<any>;
    subscribe(handler: (obj: object) => any): void;
    unsubscribe(handler: (obj: object) => any): void;
    fetchFullAccount: any;
    getObject(id: string): any;
    getAsset(symbolOrId: string): any;
    getBalanceObjects(id: string | string[]): any;
    getAccount(name_or_id: string, autosubscribe?: boolean): any;
  }
  const ChainStore: ChainStoreClass;
  const TransactionBuilder: any;
  const FetchChain: (apiMethod: string, ...args: any[]) => Promise<any>;
  const TransactionHelper: any;
  const Aes: any;
  const PublicKey: any;
  const PrivateKey: any;
  const ChainTypes: any;
  const ChainValidation: {
    is_account_name: (value, allow_too_short?) => boolean;
    is_object_id: (id: string) => boolean;
    is_empty: (value, allow_too_short?) => boolean;
    is_account_name_error: (value, allow_too_short?) => boolean;
    is_cheap_name: (value, allow_too_short?) => boolean;
    is_empty_user_input: (value) => boolean;
    is_valid_symbol_error: (value, arg?) => boolean;
    required: (value, field_name?) => boolean;
  };
  const key: {
    addresses(pubkey: any): string[];
    get_random_key: any;
  };
  const EmitterInstance: any;
}
