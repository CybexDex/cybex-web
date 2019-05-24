import * as React from "react";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoExplain } from "./EtoRule";
import { EtoRefer } from "../../services/eto";
const { useState, useEffect } = React;
const DefaultRefer = sessionStorage.getItem(EtoRefer);
export const EtoInfoForm = ({ account, onSubmit }) => {
  const [agreement, setAgreement] = useState(false);
  const [wechat, setWechat] = useState(null);
  const [email, setEmail] = useState(null);
  const [refer, setRefer] = useState(DefaultRefer);
  const valid =
    email && (email as any).toString().indexOf("@") !== -1 && agreement;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        let value: any = { email };
        if (wechat) {
          value.wechat = wechat;
        }
        if (refer) {
          value.refer = refer;
        }
        onSubmit(value);
      }}
    >
      <EtoContentWrapper>
        <p
          className="color-steel"
          style={{ fontSize: "12px", lineHeight: "20px", marginBottom: 0 }}
        >
          {counterpart.translate("eto_apply.tip", { account })}
        </p>
      </EtoContentWrapper>
      <EtoPanel style={{ marginBottom: "12px" }}>
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
          type="email"
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
      <EtoFlow />
      <EtoContentWrapper>
        <EtoExplain />
        <p className="agreement">
          <Checkbox
            onChange={v => setAgreement(v)}
            size="large"
            active={agreement}
          >
            <Translate
              style={{
                fontSize: "0.8em",
                userSelect: "none",
                lineHeight: "1.8em"
              }}
              content="eto_apply.agreement"
            />
          </Checkbox>
        </p>
        <Button
          type="primary"
          disabled={!valid}
          // loading={this.state.checking}
          style={{ margin: "12px -12px", width: "calc(24px + 100%)" }}
        >
          {counterpart.translate("eto_apply.next")}
        </Button>
      </EtoContentWrapper>
    </form>
  );
};
