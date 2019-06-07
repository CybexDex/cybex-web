import * as React from "react";
import { ProjectList } from "./ProjectList";
import { EtoActions } from "../../actions/EtoActions";
import { connect } from "alt-react";
import { EtoStore } from "../../stores/EtoStore";
import { selectProjects, selectBanner, selectBanners } from "./EtoSelectors";
import { EtoProject } from "../../services/eto";
import { ProjectSlide } from "./ProjectSlide";
import IntlStore from "../../stores/IntlStore";
import Translate from "react-translate-component";
import { Colors } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";

const EtoHeading = ({ content }) => (
  <Translate
    component="h2"
    style={{
      color: Colors.$colorOrange,
      paddingLeft: "12px",
      borderLeft: "4px solid",
      fontSize: "40px",
      height: "36px",
      lineHeight: "36px",
      margin: "36px 0"
    }}
    content={content}
  />
);

const { useState, useEffect } = React;
export const ProjectMain = connect(
  ({
    projects,
    banners,
    locale
  }: {
    projects: EtoProject.ProjectDetail[];
    banners: EtoProject.Banner[];
    locale: any;
  }) => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      EtoActions.updateBanner();
      EtoActions.updateProjectList();
      const timer = setInterval(() => {
        EtoActions.updateProjectList();
      }, 3000);
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, []);

    return (
      <>
        <EtoContentWrapper style={{ padding: 0 }}>
          <ProjectSlide
            slides={banners.map(banner => selectBanner(banner, locale))}
          />
        </EtoContentWrapper>
        <EtoContentWrapper style={{ padding: 0 }}>
          <EtoHeading content="eto_project.polkadot_eto" />
        </EtoContentWrapper>
        <ProjectList projects={projects} />
        <EtoContentWrapper style={{ padding: 0 }}>
          <EtoHeading content="eto_project.eto_more" />
        </EtoContentWrapper>
        <EtoPanel style={{ marginBottom: "36px", textAlign: "center" }}>
          <div
            className=""
            style={{
              height: "180px",
              display: "inline-block",
              paddingTop: "50px"
            }}
          >
            <h3>COMING SOON</h3>
            <h4 style={{ color: Colors.$colorOrange }}>即将上线...</h4>
          </div>
        </EtoPanel>
      </>
    );
  },
  {
    listenTo() {
      return [EtoStore, IntlStore];
    },
    getProps() {
      return {
        projects: selectProjects(EtoStore.getState()),
        banners: selectBanners(EtoStore.getState()),
        locale: IntlStore.getState().currentLocale
      };
    }
  }
);
