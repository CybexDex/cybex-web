import * as React from "react";
import * as human from "humanize-duration";
import { Icon, Colors } from "../Common";
import { connect } from "alt-react";
import IntlStore from "../../stores/IntlStore";
import { EtoProject } from "../../services/eto";
import Translate from "react-translate-component";
import BigNumber from "bignumber.js";
import * as moment from "moment";
import { selectProjectStatus } from "./EtoSelectors";

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
  }) => {
    let language = Intl[locale] || "en";
    let humanizer = human.humanizer({
      language,
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms"
        }
      }
    });
    let durStr = humanizer(duration);
    return (
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
        <span style={{ marginLeft: "12px" }}>{durStr}</span>
      </div>
    );
  },
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
);
type FullTimerProps = {
  project: EtoProject.ProjectDetail;
  showTip: boolean;
  locale?: any;
};

const { useState, useEffect } = React;

export const EtoTimerFull = connect<FullTimerProps, FullTimerProps>(
  ({ locale, showTip = false, project }: FullTimerProps) => {
    const [counter, setCounter] = useState(0);
    let timer;
    useEffect(() => {
      timer = setInterval(() => setCounter(counter + 1), 500);
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, []);
    const status = selectProjectStatus(project);

    const duration = (function() {
      if (!project.start_at) {
        return null;
      }
      if (status === EtoProject.EtoStatus.Finished) {
        if (project.t_total_time) {
          return new BigNumber(project.t_total_time || 0)
            .times(1000)
            .toNumber();
        }
        if (project.finish_at) {
          return new BigNumber(
            moment
              .utc(project.start_at)
              .diff(moment.utc(project.finish_at), "s")
          )
            .times(1000)
            .toNumber();
        }
        return null;
      }
      if (status === EtoProject.EtoStatus.Unstart) {
        return moment.utc(project.start_at).isAfter(moment())
          ? new BigNumber(moment.utc(project.start_at).diff(moment(), "s"))
              .times(1000)
              .toNumber()
          : 0;
      }
      if (status === EtoProject.EtoStatus.Running) {
        if (!project.end_at) {
          return null;
        }
        return new BigNumber(moment.utc(project.end_at).diff(moment(), "s"))
          .times(1000)
          .toNumber();
      }
    })();
    if (duration === null || duration === undefined) {
      return null;
    }
    let language = Intl[locale] || "en";
    let humanizer = human.humanizer({
      language,
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms"
        }
      }
    });
    let durStr = humanizer(duration, {
      units: ["d", "h", "m", "s"]
    });
    return (
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          color:
            status === EtoProject.EtoStatus.Finished ||
            status === EtoProject.EtoStatus.Failed
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
        <span style={{ marginLeft: "12px" }}>{durStr}</span>
      </div>
    );
  },
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
);
