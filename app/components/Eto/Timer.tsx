import * as React from "react";
import * as human from "humanize-duration";
import { Icon, Colors } from "../Common";
import { connect } from "alt-react";
import IntlStore from "../../stores/IntlStore";
import { EtoProject } from "../../services/eto";
import Translate from "react-translate-component";

enum Intl {
  zh = "zh_CN",
  en = "en",
  vn = "vi"
}

export const EtoTimer = connect<
  {
    duration: number;
    isActive: boolean;
    status: EtoProject.EtoStatus;
    showTip?: boolean;
    [other: string]: any;
  },
  {
    duration: number;
    isActive: boolean;
    showTip?: boolean;
    status: EtoProject.EtoStatus;
    [other: string]: any;
  }
>(
  ({
    duration,
    isActive,
    showTip = false,
    locale,
    status
  }: {
    duration: number;
    isActive: boolean;
    showTip?: boolean;

    status: EtoProject.EtoStatus;
    locale?: any;
  }) => (
    <div
      style={{
        fontSize: "20px",
        textAlign: "center",
        display: "inline-flex",
        alignItems: "center",
        color:
          status === EtoProject.EtoStatus.Finished
            ? Colors.$colorWhite
            : Colors.$colorOrange
      }}
    >
      <Icon icon="time" />
      {showTip && (
        <Translate
          style={{ marginLeft: "6px" }}
          content={
            status === EtoProject.EtoStatus.Unstart
              ? "EIO.In"
              : status === EtoProject.EtoStatus.Finished
              ? "EIO.Ended"
              : "EIO.Left"
          }
        />
      )}
      <span style={{ marginLeft: "12px" }}>
        {human(duration, {
          language: Intl[locale] || "en"
          // units: ["d", "h", "m", "s"]
        })}
      </span>
    </div>
  ),
  {
    listenTo() {
      return [IntlStore];
    },
    getProps() {
      console.debug("Locale: ", IntlStore.getState());
      return {
        locale: IntlStore.getState().currentLocale
      };
    }
  }
);
