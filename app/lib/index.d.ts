/// < reference types="node" />
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