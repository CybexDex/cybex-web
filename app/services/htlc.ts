import { sha256, sha1, ripemd160 } from "../cybex/cybexjs/ecc/src/hash";

export namespace Htlc {
  export enum HashAlgo {
    Ripemd160 = 0,
    Sha1 = 1,
    Sha256 = 2
  }
  export type HtlcRecord = {
    id: string;
    transfer: {
      from: string;
      to: string;
      amount: number;
      asset_id: string;
    };
    conditions: {
      hash_lock: {
        preimage_hash: [number, string];
        preimage_size: 5;
      };
      time_lock: { expiration: "2019-07-09T10:01:09" };
    };
  };
  export class HtlcCreateByRawPreimage {
    preimage_size: number;
    preimage_hash: [number, string];
    constructor(
      public from: string,
      public to: string,
      public amount: Cybex.Amount,
      public preimage: string,
      public hashAlgo: HashAlgo,
      public claim_period_seconds: number
    ) {
      this.preimage_size = preimage.length;
      this.preimage_hash = [
        hashAlgo,
        (function(preimage: string, algo: HashAlgo) {
          switch (algo) {
            case HashAlgo.Ripemd160:
              return ripemd160(preimage);
            case HashAlgo.Sha1:
              return sha1(preimage);
            case HashAlgo.Sha256:
              return sha256(preimage);
          }
        })(preimage, hashAlgo)
      ];
    }
  }
  export class HtlcCreateByHashedPreimage {
    constructor(
      public from: string,
      public to: string,
      public amount: Cybex.Amount,
      public hashAlgo: HashAlgo,
      public preimageSize: string,
      public preimageHash: string,
      public claimPeriodSecond: number
    ) {}
  }
  export class HtlcRedeem {
    preimage: string;
    constructor(
      public htlc_id: string,
      public redeemer: string,
      preimage: string
      // public preimage: string
    ) {
      this.preimage = Buffer.from(preimage).toString("hex");
    }
  }

  export type Ops =
    | HtlcCreateByRawPreimage
    | HtlcCreateByHashedPreimage
    | HtlcRedeem;
}
