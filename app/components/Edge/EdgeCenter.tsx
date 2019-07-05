import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors, Icon, Radio } from "../Common";
import { EdgePanel, EdgeContentWrapper, EdgeContent } from "./EdgePanel";
import { EdgeFlow } from "./EdgeFlow";
import Translate from "react-translate-component";
import { EdgeActions } from "../../actions/EdgeActions";
import { Edge } from "../../services/edge";
import { EdgeExplain } from "./EdgeRule";
// import { EdgeRefreshModal } from "../Modal/EdgeRefreshModal";
import { ModalActions } from "../../actions/ModalActions";
import { Gtag } from "services/Gtag";
import { Link } from "react-router-dom";
const { useEffect } = React;
const EdgeRefreshModalID = "#$EdgeRefreshModalID";

import ls from "lib/common/localStorage";
import { GatewayActions, DEPOSIT_MODAL_ID } from "../../actions/GatewayActions";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

export const EdgeCenterSummary = ({
  edgeState,
  account,
  history
}: {
  edgeState: Edge.EdgeInfo;
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
          account: (edgeState.info && edgeState.info.accountName) || ""
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
                EdgeActions.queryInfo(account);
              }}
              // onClick={() => EdgeActions.queryInfo(account)}
            >
              <Icon icon="refresh" />
            </a>
          </span>
          <h2 style={{ margin: "8px" }}>
            {edgeState.info && edgeState.sum}{" "}
            <small style={{ color: "white" }}>PCX</small>
          </h2>
          {/* <Link
            to="/eto/record"
            style={{ color: "white", textDecoration: "underline" }}
          >
            {counterpart.translate("edge.record")}
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export const EdgeCenter = (props: any) => {
  return (
    <>
      <EdgePanel
        style={{
          marginBottom: "12px",
          backgroundColor: "rgba(255,150,58,1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/banner.png?x-oss-process=style/compress)`
        }}
      >
        <EdgeCenterSummary {...props} />
        <div
          className="btn-wrapper"
          style={{
            margin: "0 -12px",
            marginBottom: "-12px"
          }}
        >
          <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              // Gtag.eventActivity("Edge", "通过中心页进入锁仓");
              props.history.push("/lockdrop/lock");
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_lock")}
          </Button>
          {/* <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              // Gtag.eventActivity("Edge", "通过中心页点击充值");
              GatewayActions.showDepositModal(
                props.account && props.account.get("name"),
                "JADE.PCX",
                DEPOSIT_MODAL_ID
              );
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("edge.fund_eth")}
          </Button> */}
          {true && (
            <Button
              type="secondary"
              // loading={this.state.checking}
              onClick={() => {
                props.history.push("/market/JADE.PCX_JADE.USDT");
              }}
              style={{ width: "50%", borderRadius: 0 }}
            >
              {counterpart.translate("eto_apply.center.go_trade")} PCX
            </Button>
          )}
        </div>
      </EdgePanel>
      <EdgeContent
        style={{ margin: "12px" }}
        heading={counterpart.translate("edge.flow_title")}
        ol
        contents={new Array(3)
          .fill(1)
          .map((_, i) => counterpart.translate(`edge.flow_content_${i + 1}`))}
      />
      <EdgeContentWrapper>
        <EdgeExplain />
      </EdgeContentWrapper>
      {/* <EdgeRefreshModal
        modalId={EdgeRefreshModalID}
        onConfirm={() => {
          EdgeActions.queryInfo(props.account);
          ModalActions.hideModal(EdgeRefreshModalID);
        }}
        onCancel={() => ModalActions.hideModal(EdgeRefreshModalID)}
      /> */}
    </>
  );
};
