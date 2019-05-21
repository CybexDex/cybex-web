import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { EtoApply } from "./Apply";
import counterpart from "counterpart";
import { Button } from "../Common";
import { withRouter } from "react-router-dom";

export const EtoPanel = ({ children }) => (
  <div className="eto-panel">{children}</div>
);
export const EtoContent = ({ heading, contents }) => (
  <EtoPanel>
    <h4>{heading}</h4>
    {contents.map((content, i) => <p key={i}>{content}</p>)}
  </EtoPanel>
);

export const IntroBtn = withRouter(
  props =>
    (
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
          style={{ marginBottom: "12px", width: "100%" }}
        >
          {counterpart.translate("eto_intro.join_apply_already")}
        </Button>
      </div>
    ) as any
);

export const EtoIntro = () => {
  return (
    <div className="grid-container">
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="column small-12 medium-6">
          <div
            className="banner"
            style={{
              paddingTop: "83.1%",
              backgroundImage: `url(https://cybex-assets.oss-cn-hangzhou.aliyuncs.com/polka/banner.png?x-oss-process=style/compress)`,
              position: "relative"
            }}
          >
            <div
              className="banner-conten"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
          </div>
          <section>
            {[
              {
                label: counterpart.translate("eto_intro.join_date"),
                content: counterpart.translate("eto_intro.join_date_content")
              },
              {
                label: counterpart.translate("eto_intro.join_platform"),
                content: counterpart.translate(
                  "eto_intro.join_platform_content"
                )
              }
            ].map(info => (
              <p key={info.label}>
                <span>{info.label}: </span>
                {info.content}
              </p>
            ))}
          </section>
          <IntroBtn className="show-for-small-only" />
        </div>
        <div className="column small-12 medium-6">
          <EtoContent
            heading={counterpart.translate("eto_intro.about_eto_title")}
            contents={[counterpart.translate("eto_intro.about_eto_content")]}
          />
          <EtoContent
            heading={counterpart.translate("eto_intro.about_polka_title")}
            contents={[
              counterpart.translate("eto_intro.about_polka_content"),
              counterpart.translate("eto_intro.about_polka_content1")
            ]}
          />
          <IntroBtn className="hide-for-small-only" />
        </div>
      </div>
    </div>
  );
};

export const Eto = () => {
  return (
    <div className="page-layout flex-start">
      <Switch>
        <Route path="/eto/" exact component={EtoIntro as any} />
        <Route path="/eto/apply" component={EtoApply as any} />
        <Redirect from="*" to="/eto" />
      </Switch>
    </div>
  );
};

export default Eto;
