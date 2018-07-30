import * as React from "react";
import ReactTooltip from "react-tooltip";
import * as moment from "moment";
import Translate from "react-translate-component";
import * as counterpart from "counterpart";

export default ({ dateTime, id }) => (
  <span
    className="datetime"
    style={{
      cursor: "help"
    }}
    data-place="top"
    data-offset="{ 'left': -50 }"
    data-effect="solid"
    data-tip
    data-for={id}
  >
    {dateTime}
    <ReactTooltip id={id}>
      {`${counterpart.translate("eto.local_time")}: ${moment
        .utc(dateTime)
        .toDate()
        .toString()}`}
    </ReactTooltip>
  </span>
);
