import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors, Icon } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoActions } from "../../actions/EtoActions";
import { Eto } from "../../services/eto";
import { EtoExplain } from "./EtoRule";
import { EtoRefreshModal } from "../Modal/EtoRefreshModal";
import { ModalActions } from "../../actions/ModalActions";
import { Gtag } from "services/Gtag";

const EtoRefreshModalID = "#$EtoRefreshModalID";

import ls from "lib/common/localStorage";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

export const EtoCenterSummary = ({
  etoState,
  account,
  history
}: {
  etoState: Eto.EtoInfo;
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
          account: etoState.info && etoState.info.accountName
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
          <span>{counterpart.translate("eto_apply.center.token")}</span>
          <h2 style={{ margin: "8px" }}>
            {etoState.info && etoState.info.token}
          </h2>
          <a
            style={{ color: "white", textDecoration: "underline" }}
            href="javascript:;"
            onClick={() => history.push("/eto/token")}
          >
            {counterpart.translate("eto_apply.change")}
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <span>{counterpart.translate("eto_apply.center.total")}</span>
          <h2 style={{ margin: "8px" }}>
            {etoState.info && etoState.sum}{" "}
            <small style={{ color: "white" }}>CYB</small>
          </h2>
          <a
            href="javascript:;"
            style={{ color: "white", textDecoration: "underline" }}
            onClick={() => {
              console.debug(
                "Refresh: ",
                ss.get("modal_has_shown_" + EtoRefreshModalID)
              );
              if (ss.get("modal_has_shown_" + EtoRefreshModalID, false)) {
                EtoActions.queryInfo(account);
              } else {
                ModalActions.showModal(EtoRefreshModalID, true);
              }
            }}
            // onClick={() => EtoActions.queryInfo(account)}
          >
            {counterpart.translate("eto_apply.refresh")}
          </a>
        </div>
      </div>
    </div>
  );
};

export const EtoCenter = (props: any) => {
  return (
    <>
      <EtoPanel
        style={{
          marginBottom: "12px",
          backgroundColor: "rgba(255,150,58,1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/banner.png?x-oss-process=style/compress)`
        }}
      >
        <EtoCenterSummary {...props} />
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
              EtoActions.setApplyDone();
              Gtag.eventActivity("Eto", "通过中心页进入锁仓");
              props.history.push("/eto/lock");
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_lock")}
          </Button>
          <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              EtoActions.setApplyDone();
              props.history.push("/market/CYB_JADE.USDT");
            }}
            style={{ width: "50%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_trade")}
          </Button>
        </div>
      </EtoPanel>
      <EtoFlow center />
      <EtoContentWrapper>
        <EtoExplain />
      </EtoContentWrapper>
      <EtoRefreshModal
        modalId={EtoRefreshModalID}
        onConfirm={() => {
          EtoActions.queryInfo(props.account);
          ModalActions.hideModal(EtoRefreshModalID);
        }}
        onCancel={() => ModalActions.hideModal(EtoRefreshModalID)}
      />
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
    </>
  );
};
