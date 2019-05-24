import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoActions } from "../../actions/EtoActions";
const { useState, useEffect } = React;
export const EtoApplyDone = (props: any) => {
  return (
    <>
      <EtoContentWrapper style={{ padding: "12px 0" }}>
        <p
          className="color-steel"
          style={{ fontSize: "12px", lineHeight: "20px", margin: "12px" }}
        >
          {counterpart.translate("eto_apply.apply_done.tip")}
        </p>
        <Button
          type="primary"
          // loading={this.state.checking}
          onClick={() => {
            EtoActions.setApplyDone();
            props.history.push("/eto/lock");
          }}
          style={{ marginBottom: "12px", width: "100%" }}
        >
          {counterpart.translate("eto_apply.apply_done.go_lock")}
        </Button>
        <Button
          type="primary"
          // loading={this.state.checking}
          onClick={() => {
            EtoActions.setApplyDone();
            props.history.push("/market/CYB_JADE.ETH");
          }}
          style={{ marginBottom: "12px", width: "100%" }}
        >
          {counterpart.translate("eto_apply.apply_done.go_trade")}
        </Button>
      </EtoContentWrapper>
      <EtoPanel style={{ textAlign: "center", margin: "12px" }}>
        <img
          style={{ width: "14em", height: "14em" }}
          src="https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/cybexservicee.jpeg"
        />
        <Translate
          component="h4"
          content="eto_apply.apply_done.assistant"
          style={{ fontSize: "14px", margin: "12px", color: "rgb(254,155,85)" }}
          unsafe
        />
      </EtoPanel>
    </>
  );
};
