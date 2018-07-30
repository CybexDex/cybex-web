import * as React from "react";
import ReactTooltip from "react-tooltip";
import * as moment from "moment";
import Translate from "react-translate-component";
import * as counterpart from "counterpart";

export default ({ dateTime }) => (
  <span
    className="datetime"
    style={{
      cursor: "help"
    }}
    data-place="top"
    data-offset="{ 'left': -50 }"
    data-tip={`${counterpart.translate("eto.local_time")}: ${moment
      .utc(dateTime)
      .toDate()
      .toString()}`}
  >
    {dateTime}
  </span>
);
