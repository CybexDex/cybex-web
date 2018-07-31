import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import Anthem from "./anthem";
import jdenticon from "jdenticon";
import sha256 from "js-sha256";
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
import moment from "moment";
import Swiper from "react-id-swiper";
import Icon from "../Icon/Icon";
import "./swiper.scss";

let EO = class extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      data: [[]],
      offset: 0,
      showMore: "block"
    };
  }
  canClick = true;
  componentDidMount() {
    fetchJson.fetchJsonList(this.state.offset, data => {
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
      this.setState({
        offset: this.state.offset + 4,
        data: newDate,
        showMore: showMore
        // bannerData
      });
    });
    fetchJson.fetchBanner(res => {
      this.setState({
        bannerData: res.result
      });
    });
    fetchJson.fetchKYC({ cybex_name: this.props.myAccounts[0] }, res => {
      this.setState({ kyc_status: res.result });
    });
  }
  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }

  addMore() {
    if (this.canClick) {
      this.canClick = false;
      fetchJson.fetchJsonList(this.state.offset, data => {
        let showMore = "block";
        if (data.result.length < 4) {
          showMore = "none";
        }
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
      });
    }
  }

  render() {
    const data = this.state.data || [];
    const bannerData = this.state.bannerData || [];
    const params = {
      spaceBetween: 30,
      autoplay: {
        delay: 2500
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    };

    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    // font-size: 14px;
    // line-height: 22px;
    // width: 200px;

    return (
      <div>
        <div className="slider-holder">
          <Swiper {...params}>
            {bannerData.map((e, i) => {
              return (
                <div key={i}>
                  <div className="item">
                    <Link to={`/eto/detail/${e.id}`}>
                      <div className="img-content">
                        <img
                          src={`${e.adds_banner}`}
                          width={1280}
                          height={656}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Swiper>
        </div>
        <div className="title-container">
          <h2 className="base-title">
            | <Translate content="EIO.Popular_ETOs" />
          </h2>
          <Link to="/eto/training">
            <div className="kyc-btn button primery-button">
              <Translate content="EIO.Accept_KYC_Verification" />
            </div>
          </Link>
        </div>
        <div className="container">
          {data.map((f, j) => {
            if (f.length < 4 && f.length !== 0) {
              let comingSoonLength = 4 - f.length;
              for (let i = 0; i < comingSoonLength; i++) {
                f.push({ comingSoon: true });
              }
            }
            return (
              <div className="waterfall">
                {f.map((e, i) => {
                  let percent = e.current_percent * 100;
                  percent = percent.toFixed(2);
                  let showPercent = `${percent > 100 ? 100 : percent}%`;
                  // let endAt = moment(e.end_at);
                  // let now = moment();
                  // let remainStr = ` 剩余 ${endAt.diff(now,'days')}天  ${moment(moment(e.end_at).valueOf() - moment().valueOf()).format('hh')}小时`

                  let countDownTime =
                    moment(e.end_at).valueOf() - moment().valueOf();
                  let endAt = moment(e.end_at);
                  let startAt = moment(e.start_at);
                  let finishAt = moment(e.finish_at);
                  let now = moment();
                  // let remainStr = `${endAt.diff(now,'days')} ${moment(this.state.countDownTime).format('hh:mm')}`
                  let remainStr;
                  let projectStatus;
                  switch (e.status) {
                    case "pre":
                      countDownTime =
                        moment(startAt).valueOf() - moment().valueOf();
                      remainStr = `${startAt.diff(now, "days")} 天 ${moment(
                        countDownTime
                      ).format("hh:mm")}`;
                      break;
                    case "finish":
                      countDownTime = moment(finishAt).valueOf();
                      remainStr = `${0 -
                        finishAt.diff(now, "days")} 天 ${moment(
                        countDownTime
                      ).format("hh:mm")}`;
                      break;
                    case "ok":
                      countDownTime =
                        moment(endAt).valueOf() - moment().valueOf();
                      remainStr = `${endAt.diff(now, "days")} 天 ${moment(
                        countDownTime
                      ).format("hh:mm")}`;
                      break;
                    case "fail":
                      countDownTime = moment(finishAt).valueOf();
                      remainStr = `${finishAt.diff(now, "days")} 天 ${moment(
                        countDownTime
                      ).format("hh:mm")}`;
                      break;
                    default:
                  }

                  return e.comingSoon == true ? (
                    <div className="pin coming-soon" key={i}>
                      <div className="info-holder">
                        <div className="text-holder">
                          <h3>coming soon</h3>
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
                          <img
                            src={e.adds_logo || logo_demo}
                            width={100}
                            height={100}
                          />
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
                            <span>
                              {e.status == "ok" ? (
                                <p className="status-label">
                                  [ <Translate content="EIO.ok" />... ]
                                </p>
                              ) : e.status == "pre" ? (
                                <p className="status-label">
                                  [ <Translate content="EIO.pre" /> ]
                                </p>
                              ) : e.status == "finish" ? (
                                <p className="status-label">
                                  [ <Translate content="EIO.finish" /> ]
                                </p>
                              ) : (
                                <p className="status-label">
                                  [ <Translate content="EIO.pause" /> ]
                                </p>
                              )}
                            </span>
                          </h3>

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
                                {e.adds_keyword}
                              </h4>
                              <p
                                className="proj-desc"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical"
                                }}
                              >
                                {e.adds_detail}
                              </p>
                            </div>
                          ) : (
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
                              {e.adds_keyword}
                            </h4>
                          )}
                        </div>
                        <div className="bottom-holder">
                          {!!e && (
                            <Link to={`/eto/detail/${e.id}`}>
                              <div
                                className={`button primery-button ${e.status}`}
                              >
                                {e.status == "ok" ? (
                                  <Translate content="EIO.Join_in_ETO" />
                                ) : e.status == "pre" ? (
                                  <Translate content="EIO.Reserve_ETO" />
                                ) : e.status == "finish" ? (
                                  <Translate content="EIO.Details" />
                                ) : (
                                  <Translate content="EIO.Details" />
                                )}
                              </div>
                            </Link>
                          )}
                          <div className="percent-holder-out">
                            <div className="percent-holder">
                              <div className="info-item">
                                <div>
                                  <div className="percent">
                                    <div
                                      className="percent-in"
                                      style={{ width: showPercent }}
                                    />
                                    {/* <div className="info-text" style={{left: `${percent}%`}}>{`${percent}%`}</div> */}
                                  </div>
                                  <div
                                    className="info-text"
                                    style={{ left: `${percent}%` }}
                                  >{`${percent}%`}</div>
                                </div>
                              </div>
                            </div>
                            {(j % 2 == 0 && i % 4 == 0) ||
                            (j % 2 == 1 && i % 4 == 2) ? (
                              <p className="raised">
                                <Translate content="EIO.Raised" />:{" "}
                                {e.current_base_token_count} {e.base_token_name}
                              </p>
                            ) : null}
                            <p className="raised">
                              <Icon name="time" />
                              {remainStr}
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
          Load More
        </div>
      </div>
    );
  }
};

EO = connect(
  EO,
  {
    listenTo() {
      return [AccountStore];
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

// export default EO;
const EoWrapper = () => (
  <Switch>
    <Route path="/eto" exact render={() => <EO />} />
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
