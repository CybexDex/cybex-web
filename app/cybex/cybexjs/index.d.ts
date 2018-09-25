declare module "cybexjs" {
  class Serializer {
    constructor(operation_name: string, types: { [p: string]: any });
    fromByteBuffer(b);
    appendByteBuffer(b, object);
    fromObject(serialized_object);
    toObject(
      serialized_object,
      debug: { use_default?: boolean; annotate?: boolean }
    );
    compare(a, b);
    fromHex(hex);
    fromBuffer(buffer);
    toHex(object);
    toByteBuffer(objectt);
    toBuffer(object);
  }
  const ops: { [op: string]: Serializer };

  class Signature {
    constructor(r1, s1, i1);
    static fromBuffer(buf): Signature;
    toBuffer();
    recoverPublicKeyFromBuffer(buffer);
    static signBuffer(buf, private_key);
    static signBufferSha256(buf_sha256, private_key);
    static sign(string, private_key);
    verifyBuffer(buf, public_key);
    verifyHash(hash, public_key);
    toByteBuffer();
    static fromHex(hex);
    toHex();
    static signHex(hex, private_key);
    verifyHex(hex, public_key);
  }
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
    getObjectByVoteID: any;
    getWitnessById: any;
    getCommitteeMemberById: any;
    init: () => Promise<any>;
    subscribe(handler: (obj: object) => any): void;
    unsubscribe(handler: (obj: object) => any): void;
    fetchFullAccount: any;
    getEstimatedChainTimeOffset: any;
    subError: any;
    subscribed: any;
    getObject(id: string, ...args): any;
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
  const FetchChainObjects: any;
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
