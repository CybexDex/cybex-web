import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EtoPanel } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoActions } from "../../actions/EtoActions";
const { useState, useEffect } = React;
export const EtoApplyDone = (props: any) => {
  return (
    <EtoPanel>
      <p>{counterpart.translate("eto_apply.apply_done.tip")}</p>
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
    </EtoPanel>
  );
};
