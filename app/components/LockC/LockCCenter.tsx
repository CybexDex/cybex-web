import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors, Icon, Radio } from "../Common";
import { LockCPanel, LockCContentWrapper, LockCContent } from "./LockCPanel";
import { LockCFlow } from "./LockCFlow";
import Translate from "react-translate-component";
import { LockCActions } from "../../actions/LockCActions";
import { LockC } from "../../services/lockC";
import { LockCExplain } from "./LockCRule";
const { useEffect } = React;
const LockCRefreshModalID = "#$LockCRefreshModalID";

import ls from "lib/common/localStorage";
import { GatewayActions, DEPOSIT_MODAL_ID } from "../../actions/GatewayActions";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

export const LockCCenterSummary = ({
  lockCState,
  account,
  history
}: {
  lockCState: LockC.LockCInfo;
  account;
  history;
}) => {
  return (
    <div className="grid-container">
      <h3
        style={{
          textAlign: "center",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word"
        }}
      >
        {counterpart.translate("eto_apply.center.greeting", {
          account: (lockCState.info && lockCState.info.accountName) || ""
        })}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "24px auto"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span>
            {counterpart.translate("eto_apply.center.total")}{" "}
            <a
              href="javascript:;"
              style={{ color: "white", textDecoration: "underline" }}
              onClick={() => {
                LockCActions.queryInfo(account);
              }}
            >
              <Icon icon="refresh" />
            </a>
          </span>
          <h2 style={{ margin: "8px" }}>
            {lockCState.info && lockCState.sum}{" "}
            <small style={{ color: "white" }}>CYB</small>
          </h2>
        </div>
      </div>
    </div>
  );
};
export const LockCCenter = (props: any) => {
  return (
    <>
      <LockCPanel
        style={{
          marginBottom: "12px",
          backgroundColor: "rgba(255,150,58,1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/banner.png?x-oss-process=style/compress)`
        }}
      >
        <LockCCenterSummary {...props} />
        <div
          className="btn-wrapper"
          style={{
            margin: "0 -12px",
            marginBottom: "-12px"
          }}
        >
          <Button
            type="secondary"
            onClick={() => {
              props.history.push("/lockc/lock");
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_lock")}
          </Button>
          {true && (
            <Button
              type="secondary"
              // loading={this.state.checking}
              onClick={() => {
                props.history.push("/market/CYB_JADE.USDT");
              }}
              style={{ width: "50%", borderRadius: 0 }}
            >
              {counterpart.translate("eto_apply.cCYBer.go_trade")} CYB
            </Button>
          )}
        </div>
      </LockCPanel>
      CYB
      <LockCContent
        style={{ margin: "12px" }}
        heading={counterpart.translate("lockC.flow_title")}
        ol
        contents={new Array(3)
          .fill(1)
          .map((_, i) => counterpart.translate(`lockC.flow_content_${i + 1}`))}
      />
      <LockCContentWrapper>
        <LockCExplain />
      </LockCContentWrapper>
    </>
  );
};
