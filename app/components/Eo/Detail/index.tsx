import * as React from "react";
import * as PropTypes from "prop-types";
import jdenticon from "jdenticon";
import sha256 from "js-sha256";
import { Link } from "react-router-dom";
import DetalModal from "./Modal.jsx";
import AlertModal from "./AlertModal.jsx";
import Trigger from "react-foundation-apps/src/trigger";
import * as fetchJson from "../service";
import { shortEnglishHumanizer } from "../service";

import Translate from "react-translate-component";
import * as moment from "moment";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import TimerStore from "stores/TimerStore";
import "./detail.scss";
import "./mock.scss";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import counterpart from "counterpart";
import LegalModal from "./LegalModal";
import LegalModalEn from "./LegalModalEn";
import { ProgressBar } from "components/Common/ProgressBar";
import { Fallback } from "./../Fallback";
import LoadingIndicator from "components/LoadingIndicator";

let time = require("assets/time.png");

class Detail extends React.Component<any, any> {
  updateTimer;
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      reserve_status: () => null,
      kyc_status: () => null,
      canBeReserve: false,
      currentState: {}
    };
  }
  reserve() {
    fetchJson.fetchKYC(
      {
        cybex_name: this.props.currentAccount,
        project: this.props.match.params.id,
        create: 1
      },
      res2 => {
        switch (res2.result.status) {
          case "ok":
            this.setState({
              reserve_status: () => {
                if (this.pStatus == "ok") {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label">
                        <Trigger open="ieo-legal-modal">
                          <div className="legal-info">
                            <a href="#">
                              <Translate content="EIO.IHaveRead" />
                            </a>
                          </div>
                        </Trigger>
                      </label>
                      <Link to={`/eto/join/${this.props.match.params.id}`}>
                        <div className="button primery-button ok">
                          <Translate content="EIO.Join_ETO_now" />
                        </div>
                      </Link>
                    </div>
                  );
                } else if (this.pStatus == "pre") {
                  <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label">
                      <Trigger open="ieo-legal-modal">
                        <div className="legal-info">
                          <a href="#">
                            <Translate content="EIO.IHaveRead" />
                          </a>
                        </div>
                      </Trigger>
                    </label>
                    <div className="button primery-button disabled pre">
                      <Translate content="EIO.Wait_for_ETO" />
                    </div>
                  </div>;
                } else {
                  return null;
                }
              }
            });
            break;
          case "waiting":
            this.setState({
              reserve_status: () => {
                if (this.pStatus == "ok" || this.pStatus == "pre") {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label">
                        <Trigger open="ieo-legal-modal">
                          <div className="legal-info">
                            <a href="#">
                              <Translate content="EIO.IHaveRead" />
                            </a>
                          </div>
                        </Trigger>
                      </label>
                      <div className="button primery-button disabled waiting">
                        <Translate content="EIO.Verifying" />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              }
            });
            break;
          case "reject":
            this.setState({
              reserve_status: () => {
                if (this.pStatus == "ok" || this.pStatus == "pre") {
                  return (
                    <div>
                      <div className="button primery-button disabled reject">
                        {/* 审核不通过 */}
                        <Translate content="EIO.Reservation_failed" />
                      </div>
                      <p>{res2.result.reason}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              }
            });
            break;
          case "pending":
            this.setState({
              reserve_status: () => {
                if (this.pStatus == "ok" || this.pStatus == "pre") {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label">
                        <Trigger open="ieo-legal-modal">
                          <div className="legal-info">
                            <a href="#">
                              <Translate content="EIO.IHaveRead" />
                            </a>
                          </div>
                        </Trigger>
                      </label>
                      <div className="button primery-button disabled waiting">
                        <Translate content="EIO.Verifying" />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              }
            });
            break;
          default:
            this.setState({
              reserve_status: () => {
                if (res2.result.kyc_status == "ok") {
                  if (this.state.data.is_user_in == 0) {
                    return (
                      <div className="button primery-button disabled can-not-reserve">
                        {/* 停止预约 */}
                        <Translate content="EIO.Stop_reserve" />
                      </div>
                    );
                  } else {
                    if (this.pStatus == "ok" || this.pStatus == "pre") {
                      return this.state.data.create_user_type == "code" ? (
                        <div>
                          <input
                            type="checkbox"
                            onChange={this.changeCheckbox.bind(this)}
                            className="legal-input"
                          />
                          <label className="legal-label">
                            <Trigger open="ieo-legal-modal">
                              <div className="legal-info">
                                <a href="#">
                                  <Translate content="EIO.IHaveRead" />
                                </a>
                              </div>
                            </Trigger>
                          </label>

                          {this.state.canBeReserve ? (
                            <div className="button primery-button ok">
                              <Trigger open="ieo-detail-modal">
                                <div>
                                  <Translate content="EIO.Reserve_Now" />
                                </div>
                              </Trigger>
                            </div>
                          ) : (
                            <div className="button primery-button disabled">
                              <Translate content="EIO.Reserve_Now" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            onChange={this.changeCheckbox.bind(this)}
                            className="legal-input"
                          />
                          <label className="legal-label">
                            <Trigger open="ieo-legal-modal">
                              <div className="legal-info">
                                <a href="#">
                                  <Translate content="EIO.IHaveRead" />
                                </a>
                              </div>
                            </Trigger>
                          </label>
                          {this.state.canBeReserve ? (
                            <div
                              className="button primery-button can-reserve"
                              onClick={this.reserve.bind(this)}
                            >
                              <Translate content="EIO.Reserve_Now" />
                            </div>
                          ) : (
                            <div className="button primery-button can-reserve">
                              <Translate content="EIO.Reserve_Now" />
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  }
                } else {
                  return null;
                  // <div className="button primery-button disabled can-not-reserve">
                  //   立即预约
                  // </div>
                }
              }
            });
        }
      },
      error => {
        this.setState({ error: true });
        setTimeout(() => {
          this.reserve();
        }, 3000);
      }
    );
  }
  formatTime(input) {
    return moment
      .utc(input)
      .local()
      .format("YYYY-MM-DD HH:mm:ss");
  }
  fetchDatas = () => {
    let data = {
      project: this.props.match.params.id
    };
    fetchJson.fetchDetails(
      data,
      res => {
        if (
          res.result.control !== "online" &&
          !(
            location.search.indexOf("pre") !== -1 &&
            res.result.control === "pre_online"
          )
        ) {
          console.info("Visit a invalid project");
          this.props.history.push("/eto");
        }
        this.setState(
          {
            data: res.result
          },
          () => {}
        );
        if (!this.props.currentAccount) {
          this.setState({
            reserve_status: () => {
              return (
                <div>
                  {this.pStatus !== "ok" || this.pStatus !== "pre" ? (
                    <Link to={"/login"}>
                      <div className="button primery-button">
                        {/* <span>请登录后参与</span> */}
                        <Translate content="EIO.Not_login" />
                      </div>
                    </Link>
                  ) : null}
                </div>
              );
            }
          });
        } else {
          fetchJson.fetchKYC(
            {
              cybex_name: this.props.currentAccount,
              project: this.props.match.params.id
            },
            res2 => {
              switch (res2.result.status) {
                case "ok":
                  this.setState({
                    reserve_status: () => {
                      if (this.pStatus == "ok") {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly={true}
                              className="legal-input"
                            />
                            <label className="legal-label">
                              <Trigger open="ieo-legal-modal">
                                <div className="legal-info">
                                  <a href="#">
                                    <Translate content="EIO.IHaveRead" />
                                  </a>
                                </div>
                              </Trigger>
                            </label>
                            <Link
                              to={`/eto/join/${this.props.match.params.id}`}
                            >
                              <div className="button primery-button ok">
                                <Translate content="EIO.Join_ETO_now" />
                              </div>
                            </Link>
                          </div>
                        );
                      } else if (this.pStatus == "pre") {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly={true}
                              className="legal-input"
                            />
                            <label className="legal-label">
                              <Trigger open="ieo-legal-modal">
                                <div className="legal-info">
                                  <a href="#">
                                    <Translate content="EIO.IHaveRead" />
                                  </a>
                                </div>
                              </Trigger>
                            </label>
                            <div className="button primery-button disabled pre">
                              <Translate content="EIO.Wait_for_ETO" />
                              {/* 等待众筹开始 */}
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  });
                  break;
                case "waiting":
                  this.setState({
                    reserve_status: () => {
                      if (this.pStatus == "ok" || this.pStatus == "pre") {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly={true}
                              className="legal-input"
                            />
                            <label className="legal-label">
                              <Trigger open="ieo-legal-modal">
                                <div className="legal-info">
                                  <a href="#">
                                    <Translate content="EIO.IHaveRead" />
                                  </a>
                                </div>
                              </Trigger>
                            </label>
                            <div className="button primery-button disabled waiting">
                              {/* 审核中 */}
                              <Translate content="EIO.Verifying" />
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  });
                  break;
                case "reject":
                  this.setState({
                    reserve_status: () => {
                      if (this.pStatus == "ok" || this.pStatus == "pre") {
                        return (
                          <div>
                            <div className="button primery-button disabled reject">
                              {/* 审核不通过 */}
                              <Translate content="EIO.Reservation_failed" />
                            </div>
                            <p>{res2.result.reason}</p>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  });
                  break;
                case "pending":
                  this.setState({
                    reserve_status: () => {
                      if (this.pStatus == "ok" || this.pStatus == "pre") {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly={true}
                              className="legal-input"
                            />
                            <label className="legal-label">
                              <Trigger open="ieo-legal-modal">
                                <div className="legal-info">
                                  <a href="#">
                                    <Translate content="EIO.IHaveRead" />
                                  </a>
                                </div>
                              </Trigger>
                            </label>
                            <div className="button primery-button disabled waiting">
                              {/* 审核中 */}
                              <Translate content="EIO.Verifying" />
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  });
                  break;
                default:
                  this.setState({
                    reserve_status: () => {
                      if (res2.result.kyc_status == "ok") {
                        if (res.result.is_user_in == 0) {
                          return (
                            <div className="button primery-button disabled can-not-reserve">
                              {/* 停止预约 */}
                              <Translate content="EIO.Stop_reserve" />
                            </div>
                          );
                        } else {
                          if (this.pStatus == "ok" || this.pStatus == "pre") {
                            return res.result.create_user_type == "code" ? (
                              <div>
                                <input
                                  type="checkbox"
                                  onChange={this.changeCheckbox.bind(this)}
                                  className="legal-input"
                                />
                                <label className="legal-label">
                                  <Trigger open="ieo-legal-modal">
                                    <div className="legal-info">
                                      <a href="#">
                                        <Translate content="EIO.IHaveRead" />
                                      </a>
                                    </div>
                                  </Trigger>
                                </label>

                                {this.state.canBeReserve ? (
                                  <div className="button primery-button ok">
                                    <Trigger open="ieo-detail-modal">
                                      <div>
                                        <Translate content="EIO.Reserve_Now" />
                                      </div>
                                    </Trigger>
                                  </div>
                                ) : (
                                  <div className="button primery-button disabled">
                                    <Translate content="EIO.Reserve_Now" />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <input
                                  type="checkbox"
                                  onChange={this.changeCheckbox.bind(this)}
                                  className="legal-input"
                                />
                                <label className="legal-label">
                                  <Trigger open="ieo-legal-modal">
                                    <div className="legal-info">
                                      <a href="#">
                                        <Translate content="EIO.IHaveRead" />
                                      </a>
                                    </div>
                                  </Trigger>
                                </label>
                                {this.state.canBeReserve ? (
                                  <div
                                    className="button primery-button can-reserve"
                                    onClick={this.reserve.bind(this)}
                                  >
                                    <Translate content="EIO.Reserve_Now" />
                                  </div>
                                ) : (
                                  <div className="button primery-button disabled">
                                    <Translate content="EIO.Reserve_Now" />
                                  </div>
                                )}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        }
                      } else {
                        return null;
                        // <div className="button primery-button disabled can-not-reserve">
                        //   立即预约
                        // </div>
                      }
                    }
                  });
              }
              if (res2.result.kyc_status == "ok") {
                this.setState({ kyc_status: () => null });
              } else {
                this.setState({
                  kyc_status: () => {
                    return (
                      <div className="kyc-btn-holder">
                        <a href={__ICOAPE__} target="_blank">
                          <div className="kyc-btn button primery-button">
                            <Translate content="EIO.Accept_KYC_Verification" />
                          </div>
                        </a>
                      </div>
                    );
                  }
                });
              }
            }
          );
          // res.result.kyc_status = 'ok'
        }
        this.setState({
          error: false
        });
      },
      error => {
        this.setState({ error: true });
        setTimeout(() => {
          this.fetchDatas();
        }, 3000);
      }
    );
  };

  fetchProgress() {
    let data = {
      project: this.props.match.params.id,
      cybex_name: this.props.currentAccount
    };
    fetchJson.updateStatus(data, res => {
      let currentState = res.result;
      if (!currentState) return;
      // if (!currentState || !currentState.real) return;
      this.setState({
        currentState
      });
      console.debug("Latest State: ", currentState);
    });
  }

  componentDidMount() {
    this.fetchDatas();
    this.fetchProgress();
    this.updateTimer = setInterval(() => {
      this.fetchProgress();
    }, 3000);
  }
  public openModal = () => {
    this.setState({
      showModal: true
    });
  };
  sentdata() {
    ZfApi.publish("ieo-detail-modal", "close");
    ZfApi.publish("ieo-alert-modal", "open");
    setTimeout(() => {
      ZfApi.publish("ieo-alert-modal", "close");
      this.reserve();
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  componentDidCatch() {
    console.error("ETO Details Error");
    this.setState({
      error: true
    });
  }

  changeCheckbox(e) {
    this.setState({
      canBeReserve: e.target.checked
    });
  }

  get pStatus() {
    return "status" in this.state.currentState
      ? this.state.currentState.status
      : this.state.data.status;
  }

  render() {
    const data = this.state.data || {};
    const {
      name,
      rate,
      adds_token_total,
      adds_token_total__lang_en,
      start_at,
      end_at,
      adds_on_market_time,
      adds_advantage,
      adds_advantage__lang_en,
      offer_at,
      district_restriction,
      base_token_name,
      adds_website,
      adds_detail,
      adds_banner,
      adds_banner__lang_en,
      adds_website__lang_en,
      adds_whitepaper,
      adds_whitepaper__lang_en,
      whitepaper__lang_en,
      adds_detail__lang_en,
      token_name,
      adds_on_market_time__lang_en,
      base_hard_cap,
      lock_at,
      t_finish_block,
      t_finish_tx,
      t_total_time
    } = data;
    let finish_at = this.state.currentState.finish_at || data.finish_at;
    let current_percent =
      "current_percent" in this.state.currentState
        ? this.state.currentState.current_percent
        : data.current_percent;
    let status =
      "status" in this.state.currentState
        ? this.state.currentState.status
        : data.status;
    let base_tokens = data.base_tokens || [];
    let percent = current_percent * 100;
    percent = percent.toFixed(2);
    let now = moment.utc();
    let countDownTime = moment.utc(end_at).valueOf() - moment.utc().valueOf();
    let endAt = moment.utc(end_at);
    let startAt = moment.utc(start_at);
    let lockAt = moment.utc(lock_at);
    let finishAt = moment.utc(finish_at);
    let remainStr;
    let projectStatus;
    let lang = counterpart.getLocale();

    switch (status) {
      case "pre":
        // countDownTime = moment.utc(startAt).valueOf() - moment.utc().valueOf();
        remainStr = shortEnglishHumanizer(false, lang)(
          startAt.diff(
            startAt.isAfter(new Date().toUTCString()) ? now : startAt
          )
        ).replace(/[\,]/g, "");
        break;
      case "finish":
        // countDownTime = moment.utc(finishAt).valueOf() - moment.utc(endAt).valueOf();
        console.debug("finishAt: ", finishAt.toString(), startAt.toString());
        remainStr = shortEnglishHumanizer(true, lang)(
          t_total_time ? t_total_time * 1000 : finishAt.diff(startAt)
        ).replace(/[\,]/g, "");
        break;
      case "ok":
        // countDownTime = moment.utc(endAt).valueOf() - moment.utc().valueOf();
        remainStr = shortEnglishHumanizer(false, lang)(endAt.diff(now)).replace(
          /[\,]/g,
          ""
        );
        break;
      case "fail":
        // countDownTime = moment.utc(finishAt).valueOf();
        remainStr = shortEnglishHumanizer(false, lang)(
          finishAt.diff(now)
        ).replace(/[\,]/g, "");
        break;
      default:
    }

    // let remainStr = this.state.remainStr;
    return this.state.error ? (
      <Fallback />
    ) : (
      <div>
        {name ? (
          <div className={`detail ${lang}`}>
            <div className="left-part">
              <div className="row">
                <img src={lang == "zh" ? adds_banner : adds_banner__lang_en} />
              </div>
              {percent && (
                <div className="row">
                  <ProgressBar
                    styleType="primary"
                    percent={percent}
                    withLabel
                    labelStyle={{ marginLeft: "1.4em", fontSize: "1.6em" }}
                  />
                </div>
              )}
              {rate ? (
                <div className="row info-item">
                  <Translate
                    style={{ fontWeight: "bold" }}
                    content="EIO.Redeeming_Ratio"
                  />: 1 {base_token_name} = {rate} {token_name}
                </div>
              ) : null}

              {remainStr ? (
                <div className="row info-item large-time">
                  <div className="info-title">
                    <img className="icon-time" src={time} />
                    {status == "ok" ? (
                      <span className={`sub-time ${status}`}>
                        {" "}
                        <Translate content="EIO.Time_remains" />{" "}
                      </span>
                    ) : status == "pre" ? (
                      <span className={`sub-time ${status}`}>
                        {" "}
                        <Translate content="EIO.In" />{" "}
                      </span>
                    ) : status == "finish" ? (
                      <span className={`sub-time ${status}`}>
                        {" "}
                        <Translate content="EIO.Ended" />{" "}
                      </span>
                    ) : (
                      <span className={`sub-time ${status}`}>
                        {" "}
                        <Translate content="EIO.Ended" />{" "}
                      </span>
                    )}
                    <span className="info-detail">{remainStr}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="right-part">
              <h3 className="title">
                <span className="main">
                  <Translate content="EIO.Project_Details" />
                </span>
                {status == "ok" ? (
                  <span className="sub ok">
                    [ <Translate content="EIO.ok" />...]
                  </span>
                ) : status == "pre" ? (
                  <span className="sub pre">
                    [ <Translate content="EIO.pre" /> ]
                  </span>
                ) : status == "finish" ? (
                  <span className="sub finish">
                    [ <Translate content="EIO.finish" /> ]
                  </span>
                ) : status == "pause" ? (
                  <span className="sub finish">
                    [ <Translate content="EIO.pause" /> ]
                  </span>
                ) : null}
              </h3>

              {name ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Project_Name" />
                  </div>
                  <div className="info-detail">{name}</div>
                </div>
              ) : null}
              {token_name ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Token_Name" />
                  </div>
                  <div className="info-detail">{token_name}</div>
                </div>
              ) : null}

              {lang == "zh" ? (
                adds_token_total ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Total_Token_Supply" />
                    </div>
                    <div className="info-detail">{adds_token_total}</div>
                  </div>
                ) : null
              ) : adds_token_total__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Total_Token_Supply" />
                  </div>
                  <div className="info-detail">{adds_token_total__lang_en}</div>
                </div>
              ) : null}
              {base_hard_cap ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Hard_cap" />
                  </div>
                  <div className="info-detail">{base_hard_cap}</div>
                </div>
              ) : null}

              {start_at ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.ETO_Period" />
                  </div>
                  <div className="info-detail">
                    {startAt.local().format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
              ) : null}

              {end_at ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.End_at" />
                  </div>
                  <div className="info-detail">
                    {endAt.local().format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
              ) : null}
              {lock_at ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Lock-up_Period" />
                  </div>
                  <div className="info-detail">
                    {lockAt.local().format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                </div>
              ) : null}
              {lang == "zh" ? (
                adds_on_market_time ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Listing_Time" />
                    </div>
                    <div className="info-detail">{adds_on_market_time}</div>
                  </div>
                ) : null
              ) : adds_on_market_time__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Listing_Time" />
                  </div>
                  <div className="info-detail">
                    {adds_on_market_time__lang_en}
                  </div>
                </div>
              ) : null}
              {lang == "zh" ? (
                adds_advantage ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Project_Strengths" />
                    </div>
                    <div className="info-detail">{adds_advantage}</div>
                  </div>
                ) : null
              ) : adds_advantage__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Project_Strengths" />
                  </div>
                  <div className="info-detail">{adds_advantage__lang_en}</div>
                </div>
              ) : null}
              {offer_at ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Token_Releasing_Time" />
                  </div>
                  <div className="info-detail">{offer_at}</div>
                </div>
              ) : (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Token_Releasing_Time" />
                  </div>
                  <div className="info-detail">
                    <Translate content="EIO.Offer_any_time" />
                  </div>
                </div>
              )}

              {/* {base_token_count?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.ETO_Quota" />
            </div>
            <div className="info-detail">{base_token_count}{base_token_name}</div>
          </div>):null} */}

              {district_restriction ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.District_Restriction" />
                  </div>
                  <div className="info-detail">{district_restriction}</div>
                </div>
              ) : null}

              <div className="info-item">
                <div className="info-title">
                  <Translate content="EIO.ETO_token" />
                </div>
                <div className="info-detail">
                  {
                    base_token_name
                    // base_tokens.map((e,i)=>{
                    //   return (
                    //     <span key={i}>{e.base_token_name} </span>
                    //   )
                    // })
                  }
                </div>
              </div>
              {rate ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Redeeming_Ratio" />
                  </div>
                  <div className="info-detail">
                    1 {base_token_name} = {rate} {token_name}
                  </div>
                </div>
              ) : null}
              {lang == "zh" ? (
                adds_website ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Official_Website" />
                    </div>
                    <div className="info-detail">
                      <a href={adds_website} target="_blank">
                        {adds_website}
                      </a>
                    </div>
                  </div>
                ) : null
              ) : adds_website__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Official_Website" />
                  </div>
                  <div className="info-detail">
                    <a href={adds_website} target="_blank">
                      {adds_website}
                    </a>
                  </div>
                </div>
              ) : null}
              {lang == "zh" ? (
                adds_whitepaper ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Whitepaper" />
                    </div>
                    <div className="info-detail">
                      <a href={adds_whitepaper} target="_blank">
                        {adds_whitepaper}
                      </a>
                    </div>
                  </div>
                ) : null
              ) : adds_whitepaper__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Whitepaper" />
                  </div>
                  <div className="info-detail">
                    <a href={adds_whitepaper__lang_en} target="_blank">
                      {adds_whitepaper__lang_en}
                    </a>
                  </div>
                </div>
              ) : null}
              {lang == "zh" ? (
                adds_detail ? (
                  <div className="info-item">
                    <div className="info-title">
                      <Translate content="EIO.Project_Details" />
                    </div>
                    <div className="info-detail">
                      <a href={adds_detail} target="_blank">
                        {adds_detail}
                      </a>
                    </div>
                  </div>
                ) : null
              ) : adds_detail__lang_en ? (
                <div className="info-item">
                  <div className="info-title">
                    <Translate content="EIO.Project_Details" />
                  </div>
                  <div className="info-detail">
                    <a href={adds_detail__lang_en} target="_blank">
                      {adds_detail__lang_en}
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="button-holder">
                {/* {create_user_type?(
            <Trigger open="ieo-detail-modal"><div>123</div></Trigger>
          ):null} */}
                {/* <Trigger open="ieo-detail-modal"><div>123</div></Trigger> */}

                {status == "ok" || status == "pre"
                  ? this.state.reserve_status()
                  : null}
                {status == "ok" || status == "pre"
                  ? this.state.kyc_status()
                  : null}

                {/* {this.state.kyc_status()}
          {
            (status == 'ok'||status == 'pre') ? (
                this.state.reserve_status()
            ):null 
          }
          {
            (status == 'ok'||status == 'pre') ? (
              this.state.kyc_status()
             ):null 
          }
            
          {/* {this.state.kyc_status == "not-login"? (
            <Link to={`/login`}>
            <div className="button primery-button">
            <Translate content="EIO.participate" />
            </div>
            </Link>
          ): (
            this.state.kyc_status !== "not_start"? (
              // <Link to={`/eto/join/${this.props.match.params.id}`}>
              <div className="button primery-button disabled" onClick={this.kycNotPass.bind(this)}>
              <Translate content="EIO.Reserve_Now" />
              </div>
              // </Link>
            ):(
              <div className="button primery-button disabled">
              <Translate content="EIO.Verifying" />
              </div>
            )
          )} */}

                {/* </Trigger> */}
              </div>
            </div>
            <DetalModal
              id="ieo-detail-modal"
              cb={this.sentdata.bind(this)}
              project={this.props.match.params.id}
              isShow={this.state.showModal}
            />
            <AlertModal
              ref="caos"
              id="ieo-alert-modal"
              cb={this.sentdata.bind(this)}
              project={this.props.match.params.id}
              isShow={this.state.showAlertModal}
            />
            {lang == "zh" ? (
              <LegalModal id="ieo-legal-modal" />
            ) : (
              <LegalModalEn id="ieo-legal-modal" />
            )}
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}
//  export default Detail;
export default connect(
  Detail,
  {
    listenTo() {
      return [AccountStore, TimerStore];
    },
    getProps(props) {
      return {
        myAccounts: AccountStore.getMyAccounts(),
        currentAccount: AccountStore.getState().currentAccount,
        accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
        isMyAccount: AccountStore.getState(),
        currentAccount: AccountStore.getState().currentAccount
      };
    }
  }
);
