import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
let logo_demo = require("assets/cybex_rainbow_lg.png");
import ReactSwipe from "react-swipe";
import * as fetchJson from "./service";
import "./transfer.scss";
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import AccountInfo from "../Account/AccountInfo";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import TimerStore from "stores/TimerStore";
import counterpart from "counterpart";
import * as moment from "moment";
import * as humanize from "./humanize.js";
import Swiper from "react-id-swiper";
import Icon from "../Icon/Icon";
import "./swiper.scss";
import TextTruncate from "react-text-truncate";
import { ProgressBar } from "components/Common/ProgressBar";
import { Fallback } from "./Fallback";
import LoadingIndicator from "components/LoadingIndicator";

let EO = class extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      data: [[]],
      offset: 0,
      showMore: "block",
      loading: true
    };
  }
  canClick = true;
  errorTimer;

  handleError = error => {
    this.setState({ error: true, loading: false });
    if (!this.errorTimer) {
      this.errorTimer = setTimeout(() => {
        this.componentWillMount();
        this.errorTimer = undefined;
      }, 3000);
    }
  };

  componentWillMount() {
    let type =
      this.props.location.search.indexOf("pre") === -1
        ? "online"
        : "online,pre_online";

    Promise.all([
      new Promise((resolve, reject) => {
        fetchJson.fetchJsonList(
          { type, offset: this.state.offset },
          data => {
            let showMore = "block";
            if (data.result.length < 4) {
              showMore = "none";
            }
            let newDate = this.state.data;
            newDate[0] = data.result;
            let bannerData = [];
            data.result.map(e => {
              e.adds_banner && bannerData.push(e.adds_banner);
            });
            resolve({
              offset: this.state.offset + 4,
              data: newDate,
              loading: false,
              showMore: showMore
              // bannerData
            });
          },
          reject
        );
      }),
      new Promise((resolve, reject) => {
        fetchJson.fetchBanner(
          res => {
            resolve({
              bannerData: res.result
            });
          },
          location.search.indexOf("pre") !== -1,
          reject
        );
      }),
      new Promise((resolve, reject) => {
        fetchJson.fetchKYC(
          { cybex_name: this.props.myAccounts[0] },
          res => {
            resolve({ kyc_status: res.result });
          },
          reject
        );
      })
    ])
      .then(([jsonList, banner, kyc]) => {
        this.setState({
          ...jsonList,
          ...banner,
          ...kyc,
          error: false
        });
      })
      .catch(this.handleError);
  }

  addMore() {
    if (this.canClick) {
      this.canClick = false;
      let type =
        this.props.location.search.indexOf("pre") === -1
          ? "online"
          : "online,pre_online";
      fetchJson.fetchJsonList({ type, offset: this.state.offset }, data => {
        let showMore = "block";
        if (data.result.length < 4) {
          showMore = "none";
        }
        if (data.result.length > 0) {
          let newDate = this.state.data;
          newDate[this.state.offset / 4] = data.result;
          this.setState(
            {
              offset: this.state.offset + 4,
              data: newDate,
              showMore: showMore
            },
            () => {
              this.canClick = true;
            }
          );
        } else {
          this.setState({
            showMore: showMore
          });
        }
      });
    }
  }
  formatTime(input) {
    return moment
      .utc(input)
      .local()
      .format("YYYY-MM-DD HH:mm:ss");
  }
  render() {
    if (this.state.error) {
      return <Fallback />;
    }
    const data = this.state.data || [];
    const bannerData = this.state.bannerData || [];

    let lang = counterpart.getLocale();
    return (
      <div>
        {this.state.loading && <LoadingIndicator />}
        <div className="slider-holder">
          {bannerData[0] && (
            <Link to={`/eto/detail/${bannerData[0].id}`}>
              <img
                src={`${
                  lang == "zh"
                    ? bannerData[0].adds_banner
                    : bannerData[0].adds_banner__lang_en
                }`}
                width="100%"
              />
            </Link>
          )}
        </div>
        {/* {this.state.kyc_status=="not_start"?( */}
        <div className="title-container">
          {/* <Link to="/eto/training"> */}
          <h2 className="base-title" style={{ float: "left" }}>
            | <Translate content="EIO.Popular_ETOs" />
          </h2>
          <div className="row text-right">
            <a href={__ICOAPE__} target="_blank">
              <div className="kyc-btn button primery-button">
                {/* <Translate content="EIO.KYC_Verification" /> */}
                <Translate content="EIO.Accept_KYC_Verification" />
              </div>
            </a>
          </div>
          <div className="row text-right">
            <a
              href={
                lang == "zh"
                  ? "https://integral.cybex.io/integral.html"
                  : "https://medium.com/@herdiusofficial/details-on-the-herdius-pre-sale-airdrop-8862ecbcea60"
              }
              target="_blank"
            >
              <div className="kyc-btn button primery-button">
                {/* <Translate content="EIO.KYC_Verification" /> */}
                <Translate content="EIO.get_whitelist" />
              </div>
            </a>
          </div>
          {/* </Link> */}
        </div>
        {/* ):null */}
        <div className="container">
          {data.map((f, j) => {
            if (f.length < 4 && f.length !== 0) {
              let comingSoonLength = 4 - f.length;
              for (let i = 0; i < comingSoonLength; i++) {
                f.push({ comingSoon: true });
              }
            }
            return (
              <div key={`w-${j}`} className="waterfall">
                {f.map((e, i) => {
                  let percent = (e.current_percent * 100).toFixed(2);
                  let countDownTime =
                    moment.utc(e.end_at).valueOf() - moment.utc().valueOf();
                  let endAt = moment.utc(e.end_at);
                  let startAt = moment.utc(e.start_at);
                  let finishAt = moment.utc(e.finish_at);
                  let createAt = moment.utc(e.created_at);
                  let now = moment.utc();
                  let remainStr;
                  let projectStatus;

                  const shortEnglishHumanizer = humanize.humanizer({
                    language: lang,
                    units: ["d", "h", "m", "s"],
                    unitMeasures: {
                      y: 365 * 86400000,
                      mo: 30 * 86400000,
                      w: 7 * 86400000,
                      d: 86400000,
                      h: 3600000,
                      m: 60000,
                      s: 1000
                    },
                    round: true,
                    languages: {
                      zh: {
                        y: function() {
                          return "年";
                        },
                        mo: function() {
                          return "月";
                        },
                        d: function() {
                          return "天";
                        },
                        h: function() {
                          return "小时";
                        },
                        m: function() {
                          return "分钟";
                        },
                        s: function() {
                          return "秒";
                        }
                      },
                      en: {
                        y: function() {
                          return "Y";
                        },
                        mo: function() {
                          return "M";
                        },
                        d: function() {
                          return "D";
                        },
                        h: function() {
                          return "H";
                        },
                        m: function() {
                          return "M";
                        },
                        s: function() {
                          return "S";
                        }
                      }
                    }
                  });
                  switch (e.status) {
                    case "pre":
                      countDownTime =
                        moment.utc(startAt).valueOf() - moment.utc().valueOf();
                      remainStr = shortEnglishHumanizer(
                        startAt.diff(now)
                      ).replace(/[\,]/g, "");
                      break;
                    case "finish":
                      countDownTime =
                        moment.utc(finishAt).valueOf() -
                        moment.utc(endAt).valueOf();
                      remainStr = shortEnglishHumanizer(
                        e.t_total_time
                          ? e.t_total_time * 1000
                          : finishAt.diff(startAt)
                      ).replace(/[\,]/g, "");
                      break;
                    case "ok":
                      countDownTime =
                        moment.utc(endAt).valueOf() - moment.utc().valueOf();
                      remainStr = shortEnglishHumanizer(
                        endAt.diff(now)
                      ).replace(/[\,]/g, "");
                      break;
                    case "fail":
                      countDownTime = moment.utc(finishAt).valueOf();
                      remainStr = shortEnglishHumanizer(
                        finishAt.diff(now)
                      ).replace(/[\,]/g, "");
                      break;
                    default:
                  }

                  return e.comingSoon == true ? (
                    <div className="pin coming-soon" key={i}>
                      <div className="info-holder">
                        <div className="text-holder">
                          <h3>COMING SOON</h3>
                          <p>即将上线...</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`pin${j == 0 && i == 0 ? " special" : ""}`}
                      key={i}
                    >
                      <div className="info-holder">
                        <div className="top-holder">
                          {lang == "zh" ? (
                            <img
                              src={e.adds_logo || logo_demo}
                              width={100}
                              height={100}
                            />
                          ) : (
                            <img
                              src={e.adds_logo__lang_en || logo_demo}
                              width={100}
                              height={100}
                            />
                          )}
                          <h3 className="title">
                            <span
                              className="main-title-large"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                              }}
                            >
                              {e.name}
                            </span>
                          </h3>
                          <span
                            className="span-status"
                            style={{ color: "white" }}
                          >
                            {e.status == "ok" ? (
                              <p className="status-label ok">
                                [ <Translate content="EIO.ok" />... ]
                              </p>
                            ) : e.status == "pre" ? (
                              <p className="status-label pre">
                                [ <Translate content="EIO.pre" /> ]
                              </p>
                            ) : e.status == "finish" ? (
                              <p className="status-label finish">
                                [ <Translate content="EIO.finish" /> ]
                              </p>
                            ) : (
                              <p className="status-label finish">
                                [ <Translate content="EIO.pause" /> ]
                              </p>
                            )}
                          </span>
                          {(j % 2 == 0 && i % 4 == 0) ||
                          (j % 2 == 1 && i % 4 == 2) ? (
                            <div>
                              <h4
                                className="adds_keyword"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical"
                                }}
                              >
                                {lang == "zh"
                                  ? e.adds_keyword
                                  : e.adds_keyword__lang_en}
                              </h4>
                              <TextTruncate
                                className="proj-desc"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  textAlign: "justify",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: "vertical"
                                }}
                                line={lang == "zh" ? 6 : 4}
                                truncateText="…"
                                text={
                                  lang == "zh"
                                    ? e.adds_advantage
                                    : e.adds_advantage__lang_en
                                }
                              />
                            </div>
                          ) : (
                            // <div className={`keyword-holder ${e.status}`}>
                            <h4
                              className="adds_keyword"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical"
                              }}
                            >
                              {lang == "zh"
                                ? e.adds_keyword
                                : e.adds_keyword__lang_en}
                            </h4>
                            // </div>
                          )}
                        </div>
                        <div
                          className="bottom-holder"
                          style={{ marginTop: "2em" }}
                        >
                          <Link to={`/eto/detail/${e.id}`}>
                            <div
                              className={`button primery-button ${e.status}`}
                            >
                              {e.status == "ok" ? (
                                <Translate content="EIO.Join_in_ETO" />
                              ) : e.status == "pre" ? (
                                <Translate content="EIO.Join_in_ETO" />
                              ) : e.status == "finish" ? (
                                <Translate content="EIO.Details" />
                              ) : (
                                <Translate content="EIO.Details" />
                              )}
                            </div>
                          </Link>
                          <div className="percent-holder-out">
                            <ProgressBar
                              styleType="primary"
                              percent={percent}
                              labelStyle={i !== 0 ? { color: "#fff" } : {}}
                              flagLabel={i === 0}
                              withLabel={i !== 0}
                            />
                            {/* {(j % 2 == 0 && i % 4 == 0) ||
                            (j % 2 == 1 && i % 4 == 2) ? (
                              // <p className="raised"><Translate content="EIO.Raised" />: {e.current_base_token_count} {e.base_token_name}</p>
                              <p className="raised">
                                <Translate content="EIO.Raised" />:{" "}
                                {e.current_base_token_count} {e.base_token_name}
                              </p>
                            ) : null} */}
                            <p className={`raised ${e.status}`}>
                              <Icon name="time" />
                              {e.status == "ok" ? (
                                <span className={`sub-time ${e.status}`}>
                                  {" "}
                                  <Translate content="EIO.Time_remains" />{" "}
                                </span>
                              ) : e.status == "pre" ? (
                                <span className={`sub-time ${e.status}`}>
                                  {" "}
                                  <Translate content="EIO.In" />{" "}
                                </span>
                              ) : e.status == "finish" ? (
                                <span className={`sub-time ${e.status}`}>
                                  {" "}
                                  <Translate content="EIO.Ended" />{" "}
                                </span>
                              ) : (
                                <span className={`sub-time ${e.status}`}>
                                  {" "}
                                  <Translate content="EIO.Ended" />{" "}
                                </span>
                              )}
                              <span>{remainStr}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div
          className="btn-coming-soon"
          style={{ display: this.state.showMore }}
          onClick={this.addMore.bind(this)}
        >
          <Translate content="EIO.Load_more" />
        </div>
      </div>
    );
  }
};
EO = connect(
  EO,
  {
    listenTo() {
      return [AccountStore, TimerStore];
    },
    getProps(props) {
      return {
        myAccounts: AccountStore.getMyAccounts(),
        accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
        isMyAccount: AccountStore.getState()
      };
    }
  }
);
import Mock from "./Detail/Mock";
import Detail from "./Detail";
import Join from "./Detail/join";
import { Switch, Route } from "react-router-dom";
import { resolve } from "path";
// export default EO;
export const EoWrapper = () => (
  <Switch>
    <Route path="/eto" exact component={EO as any} />
    <Route path="/eto/genesis-space" component={Mock} />
    <Route
      path="/eto/detail/:id"
      component={Detail}
      // component={ImportKeys}
    />
    <Route path="/eto/join/:id" component={Join as any} />
  </Switch>
);
export default EoWrapper;
