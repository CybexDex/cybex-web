import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { EdgeApply } from "./Apply";
import counterpart from "counterpart";
import { Button, Icon } from "../Common";
import { withRouter } from "react-router-dom";
import { EdgeContent, EdgePanel } from "./EdgePanel";
import { EdgeLock } from "./EdgeLock";
import { connect } from "alt-react";
import { EdgeStore, EdgeState } from "../../stores/EdgeStore";
import { LoadingIndicator } from "../LoadingIndicator";
import { Gtag } from "services/Gtag";
import { EdgeRank } from "./EdgeRank";
import { EdgeRecords } from "./EdgeRecord";
export const IntroBtn = withRouter<any>(props => {
  return (
    <div {...props}>
      <Button
        type="primary"
        // disabled
        // loading={this.state.checking}
        onClick={() => {
          // Gtag.eventActivity("Edge", "点击锁仓按钮");
          props.history.push("/lockdrop/apply");
        }}
        style={{ marginBottom: "12px", width: "100%" }}
      >
        {counterpart.translate("edge.lock")}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          // Gtag.eventActivity("Edge", "查看记录");
          props.history.push("/lockdrop/record");
        }}
        // loading={this.state.checking}
        style={{ marginBottom: "12px", width: "100%", textAlign: "center" }}
      >
        {counterpart.translate("edge.record")}
      </Button>
      <Button
        type="hollow-primary"
        link={counterpart.translate("edge.rule_url")}
        // loading={this.state.checking}
        style={{ width: "100%", textAlign: "center" }}
      >
        {counterpart.translate("eto_intro.join_rule")}
      </Button>
    </div>
  ) as any;
});
export const EdgeSuperPoint = ({
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
export const EdgeBanner = () => (
  <div
    className="banner"
    style={{
      paddingTop: "83.1%",
      backgroundColor: "rgba(255,150,58,1)",
      backgroundImage: `url(${counterpart.translate(
        "edge.intro.banner_bg_url"
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
              <EdgeSuperPoint
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

export const EdgeSchema = props => (
  <section {...props}>
    {[
      {
        label: counterpart.translate("edge.intro.event_start_time"),
        content: counterpart.translate("edge.intro.event_start_time_content")
      },
      {
        label: counterpart.translate("edge.intro.event_end_time"),
        content: counterpart.translate("edge.intro.event_end_time_content")
      }
    ].map(info => (
      <p key={info.label}>
        <span className="eto-label">{info.label}: </span>
        {info.content}
      </p>
    ))}
  </section>
);

export const EdgeIntro = () => {
  return (
    <div className="grid-container">
      <div style={{ padding: "6px" }} />
      {/* <ProjectMain /> */}
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <EdgePanel style={{ marginBottom: "12px" }}>
            <EdgeBanner />
            <EdgeSchema className="show-for-small-only" />
            <IntroBtn className="show-for-small-only" />
          </EdgePanel>
          <EdgePanel
            className="eto-panel hide-for-small-only"
            style={{ flex: "1" }}
          >
            <IntroBtn />
          </EdgePanel>
        </div>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <EdgeContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("edge.intro.about_edge_title")}
            contents={[
              counterpart.translate("edge.intro.about_edge_content"),
              counterpart.translate("edge.intro.about_edge_content1")
            ]}
          />
          {/* <EdgeContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("edge.intro.about_lockdrop_title")}
            contents={[
              counterpart.translate("edge.intro.about_lockdrop_content")
            ]}
          /> */}
          <EdgePanel>
            <EdgeSchema className="hide-for-small-only" />
          </EdgePanel>
        </div>
      </div>
    </div>
  );
};

let Edge = ({ edgeState }: { edgeState: EdgeState }) => {
  return (
    <>
      {edgeState.loading > 0 ? (
        <LoadingIndicator
          style={{
            height: "100vh",
            position: "fixed",
            width: "100vw",
            textAlign: "center",
            top: 0,
            edgeStatet: 0,
            // backgroundColor: "rgba(0,0,0,0.4)",
            lineHeight: "80vh",
            zIndex: 1
          }}
          type="three-bounce"
        />
      ) : null}
      <div className="page-layout flex-start">
        <Switch>
          <Route path="/lockdrop/" exact component={EdgeIntro as any} />
          <Route path="/lockdrop/apply" component={EdgeApply as any} />
          <Route path="/lockdrop/lock" component={EdgeLock as any} />
          <Route path="/lockdrop/record" component={EdgeRecords as any} />
          <Redirect from="*" to="/lockdrop" />
        </Switch>
      </div>
    </>
  );
};
Edge = connect(
  Edge,
  {
    listenTo() {
      return [EdgeStore];
    },
    getProps() {
      return {
        edgeState: EdgeStore.getState()
      };
    }
  }
) as any;
export { Edge };
export default Edge;
