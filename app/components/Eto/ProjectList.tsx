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
          key={i}
          style={{
            flex: "1 0 calc(50% - 24px)",
            minWidth: "246px",
            margin: "6px"
          }}
        >
          <ProjectCard
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            key={i}
            project={project}
          />
        </EtoPanel>
      ))}
  </div>
);
