import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LockCApply } from "./Apply";
import counterpart from "counterpart";
import { Button, Icon } from "../Common";
import { withRouter } from "react-router-dom";
import { LockCContent, LockCPanel } from "./LockCPanel";
import { LockCLock } from "./LockCLock";
import { connect } from "alt-react";
import { LockCStore, LockCState } from "../../stores/LockCStore";
import { LoadingIndicator } from "../LoadingIndicator";

export const IntroBtn = withRouter<any>(props => {
  return (
    <div {...props}>
      <Button
        type="primary"
        onClick={() => {
          props.history.push("/lockc/apply");
        }}
        style={{ marginBottom: "12px", width: "100%" }}
      >
        {counterpart.translate("lockC.lock")}
      </Button>
      <Button
        type="hollow-primary"
        link={counterpart.translate("lockC.rule_url")}
        // loading={this.state.checking}
        style={{ width: "100%", textAlign: "center" }}
      >
        {counterpart.translate("eto_intro.join_rule")}
      </Button>
    </div>
  ) as any;
});
export const LockCSuperPoint = ({
  content,
  ...props
}: {
  content: string;
  [other: string]: any;
}) => (
  <span {...props}>
    <span style={{ display: "flex" }}>
      <Icon
        icon="polkaCheck"
        style={{
          fontSize: "18px",
          lineHeight: "28px",
          verticalAlign: "middle",
          marginRight: "4px"
        }}
      />
      <span style={{ maxWidth: "180px", textAlign: "justify" }}>{content}</span>
    </span>
  </span>
);
export const LockCBanner = () => (
  <div
    className="banner"
    style={{
      paddingTop: "83.1%",
      backgroundColor: "rgba(255,150,58,1)",
      backgroundImage: `url(${counterpart.translate(
        "lockC.intro.banner_bg_url"
      )})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      margin: "-12px",
      marginBottom: "12px"
    }}
  >
    <div
      className="banner-content"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "12px"
      }}
    >
      {/* <Translate
        style={{ marginTop: "2em" }}
        // style={{ marginTop: "10%", marginBottom: "4%" }}
        content="eto_intro.slogan"
        unsafe
        component="h4"
      />
      <img
        style={{ width: "54%" }}
        src="https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/polka_logo.png"
      />
      <Translate
        content="eto_intro.sub_slogan"
        unsafe
        component="h5"
        style={{
          lineHeight: "24px",
          borderRadius: "24px",
          border: "1px white dashed",
          fontSize: "12px",
          // width: "76%",
          display: "inline-block",
          padding: "0 5%",
          // margin: "6% auto",
          whiteSpace: "pre-line"
        }}
      />
      <div
        className="pointer-wrapper"
        style={{
          display: "table",
          // marginLeft: "auto",
          minWidth: "296px"
          // margin: "auto"
        }}
      >
        {new Array(2).fill(1).map((_, i) => (
          <div key={i} className="wrapper-row" style={{ display: "table-row" }}>
            {new Array(2).fill(1).map((_, j) => (
              <LockCSuperPoint
                key={`${i}${j}`}
                style={{
                  textAlign: "left",
                  display: "table-cell",
                  paddingBottom: "12px",
                  lineHeight: "18px",
                  maxWidth: j === 1 ? "56%" : "44%"
                }}
                content={counterpart.translate(
                  `eto_intro.tip_${j + 1 + i * 2}`
                )}
              />
            ))}
          </div>
        ))}
      </div> */}
    </div>
  </div>
);

export const LockCSchema = props => (
  <section {...props}>
    {[
      {
        label: counterpart.translate("lockC.intro.event_start_time"),
        content: counterpart.translate("lockC.intro.event_start_time_content")
      },
      {
        label: counterpart.translate("lockC.intro.event_end_time"),
        content: counterpart.translate("lockC.intro.event_end_time_content")
      }
    ].map(info => (
      <p key={info.label}>
        <span className="eto-label">{info.label}: </span>
        {info.content}
      </p>
    ))}
  </section>
);

export const LockCIntro = () => {
  return (
    <div className="grid-container">
      <div style={{ padding: "6px" }} />
      {/* <ProjectMain /> */}
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <LockCPanel style={{ marginBottom: "12px" }}>
            <LockCBanner />
            <LockCSchema className="show-for-small-only" />
            <IntroBtn className="show-for-small-only" />
          </LockCPanel>
          <LockCPanel
            className="eto-panel hide-for-small-only"
            style={{ flex: "1" }}
          >
            <IntroBtn />
          </LockCPanel>
        </div>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <LockCContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("lockC.intro.about_lockC_title1")}
            contents={[
              counterpart.translate("lockC.intro.about_lockC_content1"),
            ]}
          />
          <LockCContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("lockC.intro.about_lockC_title2")}
            contents={[
              counterpart.translate("lockC.intro.about_lockC_title21"),
              counterpart.translate("lockC.intro.about_lockC_content21"),
            ]}
          />
          {/* <LockCContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("lockC.intro.about_lockc_title")}
            contents={[
              counterpart.translate("lockC.intro.about_lockc_content")
            ]}
          /> */}
          <LockCPanel>
            <LockCSchema className="hide-for-small-only" />
          </LockCPanel>
        </div>
      </div>
    </div>
  );
};

let LockC = ({ lockCState }: { lockCState: LockCState }) => {
  return (
    <>
      {lockCState.loading > 0 ? (
        <LoadingIndicator
          style={{
            height: "100vh",
            position: "fixed",
            width: "100vw",
            textAlign: "center",
            top: 0,
            lockCStatet: 0,
            // backgroundColor: "rgba(0,0,0,0.4)",
            lineHeight: "80vh",
            zIndex: 1
          }}
          type="three-bounce"
        />
      ) : null}
      <div className="page-layout flex-start">
        <Switch>
          <Route path="/lockc/" exact component={LockCIntro as any} />
          <Route path="/lockc/apply" component={LockCApply as any} />
          <Route path="/lockc/lock" component={LockCLock as any} />
          <Redirect from="*" to="/lockc" />
        </Switch>
      </div>
    </>
  );
};
LockC = connect(
  LockC,
  {
    listenTo() {
      return [LockCStore];
    },
    getProps() {
      return {
        lockCState: LockCStore.getState()
      };
    }
  }
) as any;
export { LockC };
export default LockC;
