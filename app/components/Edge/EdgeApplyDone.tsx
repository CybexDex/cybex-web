import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EdgePanel, EdgeContentWrapper } from "./EdgePanel";
import { EdgeFlow } from "./EdgeFlow";
import Translate from "react-translate-component";
import { EdgeActions } from "../../actions/EdgeActions";
import { Gtag } from "services/Gtag";
import { ModalActions } from "../../actions/ModalActions";
import { DEFAULT_ETO_CHECK_TOKEN } from "../Modal/ModalID";

const { useState, useEffect } = React;
export const EdgeApplyDone = (props: any) => {
  return (
    <>
      <EdgeContentWrapper style={{ padding: "12px 0" }}>
        <p
          className="color-steel"
          style={{ fontSize: "12px", lineHeight: "20px", margin: "12px" }}
        >
          {counterpart.translate("eto_apply.apply_done.tip")}
        </p>
        <Button
          type="primary"
          onClick={() => {
            ModalActions.showModal(DEFAULT_ETO_CHECK_TOKEN, false, {
              onResolve: () => {
                Gtag.eventActivity("Edge", "通过报名成功页进入锁仓");
                props.history.push("/eto/lock");
              },
              onReject: () => void 0
            });
          }}
          style={{ marginBottom: "12px", width: "100%" }}
        >
          {counterpart.translate("eto_apply.apply_done.go_lock")}
        </Button>
        <Button
          type="primary"
          // loading={this.state.checking}
          onClick={() => {
            ModalActions.showModal(DEFAULT_ETO_CHECK_TOKEN, false, {
              onResolve: () => {
                props.history.push("/market/CYB_JADE.USDT");
              },
              onReject: () => void 0
            });
          }}
          style={{ marginBottom: "12px", width: "100%" }}
        >
          {counterpart.translate("eto_apply.apply_done.go_trade")}
        </Button>
      </EdgeContentWrapper>
      <EdgePanel style={{ textAlign: "center", margin: "12px" }}>
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
      </EdgePanel>
    </>
  );
};
