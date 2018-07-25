import * as React from "react";
import { $breakpointSmall } from "components/Common/Breakpoints";
import { Panel } from "components/Common/Panel";
import { Colors } from "components/Common/Colors";
import { Button } from "components/Common/Button";
import Translate from "react-translate-component";
import * as counterpart from "counterpart";
import Radium from "radium";

let image1 = require("components/Common/images/club_01.svg");
let image2 = require("components/Common/images/club_02.svg");
let image3 = require("components/Common/images/club_03.svg");

let Feature = ({
  imgSrc,
  reverse,
  alt,
  children,
  header,
  content
}: {
  imgSrc: string;
  reverse?: boolean;
  children?;
  alt;
  header: string;
  content: string;
}) => (
  <Panel
    direction="row"
    responsive
    style={[
      reverse && { flexDirection: "row-reverse" },
      {
        padding: "2.2em",
        alignItems: "center",
        justifyContent: "space-around",
        fontSize: "1.16667em",
        marginTop: "3em",
        marginBottom: "3em"
      },
      {
        [`@media (max-width: ${$breakpointSmall})`]: {
          padding: "2em",
          display: "block"
        }
      }
    ]}
  >
    <div style={{ flex: "1 1 50%", textAlign: "center" }}>
      <img src={imgSrc} alt="" style={{ height: "280px", padding: "0 2em" }} />
    </div>
    <div
      style={
        [
          { flex: "1 1 50%", padding: "1em" },
          {
            [`@media (max-width: ${$breakpointSmall})`]: {
              padding: "2em 1em 1em 1em"
            }
          }
        ] as any
      }
    >
      {
        <Translate
          component="h3"
          content={header}
          style={{ marginBottom: "1em", fontWeight: "bold" }}
        />
      }
      {
        <Translate
          component="p"
          style={{ textAlign: "justify" }}
          content={content}
        />
      }
    </div>
  </Panel>
);

Feature = Radium(Feature);

let Banner = () => (
  <div>
    <img src={counterpart.translate("assets.banner")} />
  </div>
);

let SectionHeader = ({ content }) => (
  <h2 className="text-center" style={{ margin: "2em" }}>
    <Translate
      style={{
        fontWeight: 600,
        paddingLeft: "0.4em",
        borderLeft: "3px solid",
        color: Colors.$colorOrange
      }}
      content={content}
    />
  </h2>
);

let Main = () => (
  <div>
    <section
      style={{ fontSize: "1.1667em", padding: "0 10%", marginBottom: "6em" }}
    >
      <SectionHeader content="static.what_is_eto" />
      <Translate
        className="text-justify"
        component="p"
        content="static.eto_resume_one"
      />
      <Translate
        className="text-justify"
        component="p"
        content="static.eto_resume_two"
      />
    </section>
    <section style={{ marginTop: "3em" }}>
      <SectionHeader content="static.why_eto" />
      <Feature
        imgSrc={image1}
        alt=""
        header="static.feature_one_header"
        content="static.feature_one_content"
      />
      <Feature
        reverse
        imgSrc={image2}
        alt=""
        header="static.feature_two_header"
        content="static.feature_two_content"
      />
      <Feature
        imgSrc={image3}
        alt=""
        header="static.feature_three_header"
        content="static.feature_three_content"
      />
    </section>
  </div>
);

let Footer = () => (
  <section style={{ marginTop: "6em" }}>
    <section className="text-center">
      <Button
        link="https://www.icoape.com"
        style={{ padding: "0 2em" }}
        type="primary"
      >
        <Translate content="static.kyc_first" />
      </Button>
    </section>
    <section className="text-center">
      <Translate
        component="h4"
        style={{ fontWeight: "bold", marginTop: "3em" }}
        content="static.weixin"
      />
    </section>
    <section className="text-center" style={{ opacity: 0.8, margin: "2em" }}>
      <Translate component="h5" content="static.weixin_service_a" />
      <Translate component="h5" content="static.weixin_service_b" />
      <Translate component="h5" content="static.weixin_service_c" />
    </section>
  </section>
);

let Club = class extends React.Component<{}> {
  render() {
    return (
      <div className="wrapper">
        <Banner />
        <div
          style={{ maxWidth: "1024px", margin: "auto", paddingBottom: "6em" }}
        >
          <Main />
          <Footer />
        </div>
      </div>
    );
  }
};

export { Club };
export default Club;
