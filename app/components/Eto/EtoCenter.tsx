import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors, Icon, Radio } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoActions } from "../../actions/EtoActions";
import { Eto } from "../../services/eto";
import { EtoExplain } from "./EtoRule";
import { EtoRefreshModal } from "../Modal/EtoRefreshModal";
import { ModalActions } from "../../actions/ModalActions";
import { Gtag } from "services/Gtag";
import { Link } from "react-router-dom";

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
          account: (etoState.info && etoState.info.accountName) || ""
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
          <span>
            {counterpart.translate("eto_apply.center.total")}{" "}
            <a
              href="javascript:;"
              style={{ color: "white", textDecoration: "underline" }}
              onClick={() => {
                if (ss.get("modal_has_shown_" + EtoRefreshModalID, false)) {
                  EtoActions.queryInfo(account);
                } else {
                  ModalActions.showModal(EtoRefreshModalID, true);
                }
              }}
              // onClick={() => EtoActions.queryInfo(account)}
            >
              <Icon icon="refresh" />
            </a>
          </span>
          <h2 style={{ margin: "8px" }}>
            {etoState.info && etoState.sum}{" "}
            <small style={{ color: "white" }}>CYB</small>
          </h2>
          <Link
            to="/eto/rank"
            style={{ color: "white", textDecoration: "underline" }}
          >
            {counterpart.translate("eto_apply.rank")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export const EtoCenter = (props: any) => {
  const result =
    ((props.etoState as Eto.EtoInfo).info &&
      ((props.etoState as Eto.EtoInfo).info as Eto.FullInfo)[
        Eto.Fields.result
      ]) ||
    ([] as any[]);
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
          {/* <Button
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
          </Button> */}
          {/* <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              EtoActions.setApplyDone();
              props.history.push("/market/CYB_JADE.USDT");
            }}
            style={{ width: "100%", borderRadius: 0 }}
          >
            {counterpart.translate("eto_apply.center.go_trade")}
          </Button> */}
          <div
            className="result"
            style={{ backgroundColor: "rgb(27,34,48)", paddingBottom: "8px" }}
          >
            <Translate
              content="eto_result.result_title"
              component="h5"
              className="text-center"
              style={{ fontSize: "14px", lineHeight: "40px", marginBottom: 0 }}
            />
            {result.map(
              (round, i) =>
                round && (
                  <Radio
                    labelStyle={{
                      fontSize: "12px",
                      textAlign: "center",
                      justifyContent: "center",
                      padding: "4px",
                      cursor: "default",
                      color: Colors.$colorGrey
                    }}
                    bindTo={round}
                    value={true}
                    key={i}
                    label={counterpart.translate(
                      `eto_result.result_result_${i + 1}`
                    )}
                  />
                )
            )}
            {result.every(r => !r) && (
              <Translate
                component="h5"
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  color: Colors.$colorGrey
                }}
                unsafe
                content="eto_result.result_empty"
              />
            )}
          </div>
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
