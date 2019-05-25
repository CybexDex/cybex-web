import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { EtoApply } from "./Apply";
import counterpart from "counterpart";
import { Button, Icon } from "../Common";
import { withRouter } from "react-router-dom";
import { EtoContent, EtoPanel } from "./EtoPanel";
import { EtoLock } from "./EtoLock";
import { connect } from "alt-react";
import { EtoStore, EtoState } from "../../stores/EtoStore";
import { EtoToken } from "./EtoToken";
import Translate from "react-translate-component";
import { LoadingIndicator } from "../LoadingIndicator";

export const IntroBtn = withRouter<any>(props => {
  return (
    <div {...props}>
      <Button
        type="primary"
        // loading={this.state.checking}
        onClick={() => props.history.push("/eto/apply")}
        style={{ marginBottom: "12px", width: "100%" }}
      >
        {counterpart.translate("eto_intro.join_apply")}
      </Button>
      <Button
        type="primary"
        // loading={this.state.checking}
        style={{ marginBottom: "12px", width: "100%" }}
      >
        {counterpart.translate("eto_intro.join_rule")}
      </Button>
      <Button
        type="hollow-primary"
        onClick={() => props.history.push("/eto/apply")}
        // loading={this.state.checking}
        style={{ width: "100%" }}
      >
        {counterpart.translate("eto_intro.join_apply_already")}
      </Button>
    </div>
  ) as any;
});
export const EtoSuperPoint = ({
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
export const EtoBanner = () => (
  <div
    className="banner"
    style={{
      paddingTop: "83.1%",
      backgroundColor: "rgba(255,150,58,1)",
      backgroundImage: `url(https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/banner.png?x-oss-process=style/compress)`,
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
      <Translate
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
          <div className="wrapper-row" style={{ display: "table-row" }}>
            {new Array(2).fill(1).map((_, j) => (
              <EtoSuperPoint
                key={i + j}
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
      </div>
    </div>
  </div>
);

export const EtoSchema = props => (
  <section {...props}>
    {[
      {
        label: counterpart.translate("eto_intro.join_date"),
        content: counterpart.translate("eto_intro.join_date_content")
      },
      {
        label: counterpart.translate("eto_intro.join_platform"),
        content: counterpart.translate("eto_intro.join_platform_content")
      }
    ].map(info => (
      <p key={info.label}>
        <span className="eto-label">{info.label}: </span>
        {info.content}
      </p>
    ))}
  </section>
);

export const EtoIntro = () => {
  return (
    <div className="grid-container">
      <div style={{ padding: "6px" }} />
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <EtoPanel style={{ marginBottom: "12px" }}>
            <EtoBanner />
            <EtoSchema className="show-for-small-only" />
            <IntroBtn className="show-for-small-only" />
          </EtoPanel>
          <EtoPanel
            className="eto-panel hide-for-small-only"
            style={{ flex: "1" }}
          >
            <IntroBtn />
          </EtoPanel>
        </div>
        <div
          className="column small-12 medium-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <EtoContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("eto_intro.about_eto_title")}
            contents={[counterpart.translate("eto_intro.about_eto_content")]}
          />
          <EtoContent
            style={{ marginBottom: "12px", flex: "1" }}
            heading={counterpart.translate("eto_intro.about_polka_title")}
            contents={[
              counterpart.translate("eto_intro.about_polka_content"),
              counterpart.translate("eto_intro.about_polka_content1")
            ]}
          />
          <EtoPanel>
            <EtoSchema className="hide-for-small-only" />
          </EtoPanel>
        </div>
      </div>
    </div>
  );
};

let Eto = ({ etoState }: { etoState: EtoState }) => {
  return (
    <>
      {etoState.loading > 0 ? (
        <LoadingIndicator
          style={{
            height: "100vh",
            position: "fixed",
            width: "100vw",
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            lineHeight: "80vh",
            zIndex: 1
          }}
          type="three-bounce"
        />
      ) : null}
      <div className="page-layout flex-start">
        <Switch>
          <Route path="/eto/" exact component={EtoIntro as any} />
          <Route path="/eto/apply" component={EtoApply as any} />
          <Route path="/eto/lock" component={EtoLock as any} />
          <Route path="/eto/token" component={EtoToken as any} />
          <Redirect from="*" to="/eto" />
        </Switch>
      </div>
    </>
  );
};
Eto = connect(
  Eto,
  {
    listenTo() {
      return [EtoStore];
    },
    getProps() {
      console.debug("EtoState: ", EtoStore.getState());
      return {
        etoState: EtoStore.getState()
      };
    }
  }
) as any;
export { Eto };
export default Eto;
