import * as React from "react";
import counterpart from "counterpart";
import { Input, Checkbox } from "../Common";
import { EtoPanel } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
const { useState, useEffect } = React;
export const EtoInfoForm = ({ account }) => {
  const [agreement, setAgreement] = useState(false);
  const [wechat, setWechat] = useState(null);
  const [email, setEmail] = useState(null);
  const [refer, setRefer] = useState(null);
  return (
    <form>
      <EtoPanel>
        <p>{counterpart.translate("eto_apply.tip", { account })}</p>
      </EtoPanel>
      <EtoPanel>
        <Input
          placeholder={counterpart.translate("eto_apply.form.wechat")}
          type="text"
          size="small"
          value={wechat}
          valueFromOuter
          onChange={e => setWechat(e.target.value)}
          // error={counterpart.translate("login.error_name")}
          keepPlaceholder
        />
        <Input
          placeholder={counterpart.translate("eto_apply.form.email")}
          size="small"
          type="text"
          value={email}
          valueFromOuter
          onChange={e => setEmail(e.target.value)}
          // error={counterpart.translate("login.error_name")}
          keepPlaceholder
        />
        <Input
          placeholder={counterpart.translate("eto_apply.form.code")}
          size="small"
          type="text"
          value={refer}
          valueFromOuter
          onChange={e => setRefer(e.target.value)}
          // error={counterpart.translate("login.error_name")}
          keepPlaceholder
        />
      </EtoPanel>
      <Checkbox onChange={v => setAgreement(v)} size="large" active={agreement}>
        <Translate
          style={{ fontSize: "0.8em", userSelect: "none" }}
          content="eto_apply.agreement"
        />
      </Checkbox>
      <EtoFlow />
    </form>
  );
};
