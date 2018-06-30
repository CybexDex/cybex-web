export class CustomTx {
  signer = "";
  constructor(public op: any) {}
  addSigner(signer) {
    this.signer = signer;
  }
}
