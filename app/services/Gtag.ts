const $w = window as typeof window & { gtag };
export class Gtag {
  static EVENT_REGISTER_DONE = "register_done";
  static EVENT_REGISTER_FAILED = "register_FAILED";

  static eventRegisterDone(accountName: string) {
    if ("gtag" in $w) {
      $w.gtag("event", "REGISTER_DONE", {
        event_category: "ACCOUNT",
        event_label: accountName,
        value: 1
      });
    }
  }
  static eventRegisterFailed(accountName: string) {
    if ("gtag" in $w) {
      $w.gtag("event", "REGISTER_FAILED", {
        event_category: "ACCOUNT",
        event_label: accountName,
        value: 1
      });
    }
  }
}

export default Gtag;
