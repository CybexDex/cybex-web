import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors, Icon, Radio } from "../Common";
import { EdgePanel, EdgeContentWrapper } from "./EdgePanel";
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
            <small style={{ color: "white" }}>ETH</small>
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
              props.history.push("/edge/lock");
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_lock")}
          </Button>
          <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              // Gtag.eventActivity("Edge", "通过中心页点击充值");
              GatewayActions.showDepositModal(
                props.account && props.account.get("name"),
                "JADE.ETH",
                DEPOSIT_MODAL_ID
              );
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("edge.center.fund_usdt")}
          </Button>
        </div>
      </EdgePanel>
      {false && (
        <EdgePanel style={{ marginBottom: "12px" }}>
          <div
            className="result"
            style={{
              backgroundColor: "rgb(27,34,48)",
              paddingBottom: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Translate
              content="eto_result.result_title"
              component="h5"
              className="text-center"
              style={{
                fontSize: "14px",
                lineHeight: "40px",
                marginBottom: 0
              }}
            />
          </div>
        </EdgePanel>
      )}
      <EdgeFlow center />
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
      <a
        href={counterpart.translate("eto_apply.faq_url")}
        target="_blank"
        style={{
          position: "fixed",
          bottom: "52px",
          right: "36px",
          fontSize: "36px"
        }}
      >
        <Icon icon="book" />
      </a>
      {props.overtime && (
        <div
          className="closed-mask"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: Colors.$colorDark,
            opacity: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Translate
            component="h4"
            content="eto_apply.overtime"
            project={name}
          />
        </div>
      )}
    </>
  );
};
