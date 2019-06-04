import * as React from "react";
import { ProjectList } from "./ProjectList";
import { EtoActions } from "../../actions/EtoActions";
import { connect } from "alt-react";
import { EtoStore } from "../../stores/EtoStore";
import { selectProjects, selectBanner } from "./EtoSelectors";
import { EtoProject } from "../../services/eto";
import { ProjectSlide } from "./ProjectSlide";
import IntlStore from "../../stores/IntlStore";
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
    useEffect(() => {
      EtoActions.updateProjectList();
    }, []);

    return (
      <>
        <ProjectSlide
          slides={banners.map(banner => selectBanner(banner, locale))}
        />
        <ProjectList projects={projects} />
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
        banners: selectProjects(EtoStore.getState()),
        locale: IntlStore.getState().currentLocale
      };
    }
  }
);
