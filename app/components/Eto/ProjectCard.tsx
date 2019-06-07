import * as React from "react";
import { EtoProject } from "../../services/eto";
import * as moment from "moment";
import { EtoTimer, EtoTimerFull } from "./Timer";
import { BigNumber } from "../../../node_modules/bignumber.js";
import { connect } from "alt-react";
import IntlStore from "../../stores/IntlStore";
import {
  selectProjectKeywords,
  Locale,
  selectProjectIsActive,
  selectProjectStatus
} from "./EtoSelectors";
import { ProgressBar, Button } from "../Common";
import { ProjectStatus } from "./ProjectStatus";
import counterpart from "counterpart";
import { withRouter, RouteComponentProps } from "react-router-dom";
const { useEffect, useState } = React;
// const projectState
type ProjectCardProps = {
  project: EtoProject.ProjectDetail;
  locale?: Locale;
  [other: string]: any;
};
let ProjectCard = withRouter<RouteComponentProps & ProjectCardProps>(((
  props: RouteComponentProps & ProjectCardProps
) => {
  const { project, locale, history } = props;
  const isActive = selectProjectIsActive(project);
  const status = selectProjectStatus(project);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  const duration =
    status === EtoProject.EtoStatus.Finished
      ? new BigNumber(project.t_total_time || 0).times(1000).toNumber()
      : new BigNumber(moment.utc(project.start_at).diff(moment(), "s"))
          .times(1000)
          .toNumber();
  // console.debug("Props: ", props);
  return (
    <div {...props}>
      <h4 style={{ textAlign: "center", margin: "12px 0", fontSize: "24px" }}>
        {project.name}
      </h4>
      <ProjectStatus status={status} />
      {/* <h4>{selectProjectKeywords(project, locale)}</h4> */}
      {(status === EtoProject.EtoStatus.Finished ||
        status === EtoProject.EtoStatus.Running) && (
        <div style={{ display: "flex", margin: "12px 0" }}>
          <div style={{ flexGrow: 1 }}>
            <ProgressBar
              styleType={isActive ? "primary" : "secondary"}
              percent={(project.current_percent || 0) * 100}
            />
          </div>
          <span style={{ marginLeft: "1em" }}>
            {Math.min(
              100,
              Number(
                new BigNumber(
                  (project.current_percent * 100 || 0).toFixed(6)
                ).toFixed(2, 1)
              )
            )}
            %
          </span>
        </div>
      )}
      <div style={{ textAlign: "center", margin: "16px" }}>
        <EtoTimerFull showTip project={project} />
      </div>
      {status === EtoProject.EtoStatus.Running ||
      status === EtoProject.EtoStatus.Unstart ? (
        <Button
          type="primary"
          style={{ width: "100%", textAlign: "center" }}
          onClick={() => history.push(`/eto/detail/${project.id}`)}
        >
          {counterpart.translate("EIO.Join_in_ETO")}
        </Button>
      ) : (
        <Button
          type="hollow-primary"
          style={{ width: "100%" }}
          onClick={() => history.push(`/eto/detail/${project.id}`)}
        >
          {counterpart.translate("EIO.Details")}
        </Button>
      )}
    </div>
  );
}) as any);

ProjectCard = (connect(
  ProjectCard,
  {
    listenTo() {
      return [IntlStore];
    },
    getProps() {
      return {
        locale: IntlStore.getState().currentLocale
      };
    }
  }
) as unknown) as typeof ProjectCard;

export { ProjectCard };
