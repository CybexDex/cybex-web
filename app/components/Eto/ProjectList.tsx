import * as React from "react";
import { EtoProject } from "../../services/eto";
import { ProjectCard } from "./ProjectCard";
import { selectProjectStatus } from "./EtoSelectors";
import { EtoPanel } from "./EtoPanel";

export const ProjectList = ({
  projects
}: {
  projects: EtoProject.ProjectDetail[];
}) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {projects
      .filter(p => selectProjectStatus(p) !== EtoProject.EtoStatus.Failed)
      .map((project, i) => (
        <EtoPanel
          style={{
            flex: "1 0 calc(50% - 24px)",
            minWidth: "396px",
            margin: "6px"
          }}
        >
          <ProjectCard
            // style={{
            //   flex: "1 0 calc(50% - 24px)",
            //   minWidth: "396px",
            //   // margin: "12px"
            // }}
            key={i}
            project={project}
          />
        </EtoPanel>
      ))}
  </div>
);
