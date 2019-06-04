import * as React from "react";
import { EtoProject } from "../../services/eto";
import * as moment from "moment";
import { EtoTimer } from "./Timer";
import { BigNumber } from "../../../node_modules/bignumber.js";
import { connect } from "alt-react";
import IntlStore from "../../stores/IntlStore";
import {
  selectProjectKeywords,
  Locale,
  selectProjectIsActive,
  selectProjectStatus
} from "./EtoSelectors";
import { ProgressBar, Colors } from "../Common";
import Translate from "react-translate-component";

// const projectState
const contents = {
  [EtoProject.EtoStatus.Unstart]: "EIO.pre",
  [EtoProject.EtoStatus.Running]: "EIO.ok",
  [EtoProject.EtoStatus.Finished]: "EIO.finish",
  [EtoProject.EtoStatus.Failed]: "EIO.pre"
};

let ProjectStatus = ({
  status,
  ...rest
}: {
  status: EtoProject.EtoStatus;
  [other: string]: any;
}) => {
  return (
    <Translate
      component="h5"
      {...rest}
      style={{
        fontSize: "28px",
        textAlign: "center",
        color:
          status === EtoProject.EtoStatus.Finished
            ? Colors.$colorWhite
            : Colors.$colorOrange,
        ...rest.style
      }}
      content={contents[status]}
    />
  );
};

export { ProjectStatus };
