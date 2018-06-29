export class CustomTx {
  signers = [];
  constructor(public op: any) {}
  addSigner(signer) {
    this.signers.push(signer);
  }
}
