import * as React from "react";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import IntlStore from "stores/IntlStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";

import { BaseModal } from "./BaseModalNew";
import * as moment from "moment";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale, modalId, depositInfo?, open?, className?, asset, balances?};


class GameModal extends React.Component<props, { fadeOut?, neverShow? }> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }

  handleNeverShow = (e) => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    console.debug("new: ", neverShow);
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  }

  cnModal() {
    return (
    <BaseModal modalId={this.props.modalId}>
    <h3 className="text-center">
        投资大赛规则
      </h3>
      <div className="modal-content game-modal">
        <h5>
          感谢各位参与本次赛贝投资大赛，本次大赛活动规则如下：
        </h5>
        <section>
          <h5>
            活动1️⃣ Bug 赏金猎人：
          </h5>
          <p>
            活动期间，使用CYBEX中发现任何bug。登陆到
            <a href="https://github.com/CybexDex/Cybex-Improvment">https://github.com/CybexDex/Cybex-Improvment</a>
            提交反馈，经核实无误后，每个bug第一位反馈的用户可最后参与平分10000个CYB。
          </p>
          <p>
            *相同bug，只有第一位反馈的用户才能获得奖励。同一个人可以多次获奖。Bug反馈情况、获奖名单将每周在群里公布。
          </p>
        </section>
        <section>
          <h5>
            活动2️⃣ 理财达人排名赛
          </h5>
          <p>
            参与交易，并且在活动期间至少交易10笔。按最终账户游戏币总额排名。前200名可获得以下巨额奖励：
            <ul>
              <li>第一名：2888个CYB</li>
              <li>第二名：1888个CYB</li>
              <li>第三名：888个CYB</li>
              <li>第4-200名：66个CYB </li>
            </ul>
            <p>
              *所有币都将按照活动截止时间的汇率换成CYBX计算。
              <br /> *相同bug，只有第一位反馈的用户才能获得奖励。同一个人可以多次获奖。Bug反馈情况、获奖名单将每周在群里公布。
            </p>
          </p>
        </section>
        <section>
          <h5>
            活动 彩蛋
          </h5>
          <p>
            凡是报名成功参与活动的内测用户，2月26日Cybex交易所正式上线后，在系统内会获得特殊身份认证，拥有彩虹犀牛永久纪念徽章（限量版）
          </p>
        </section>
        <section>
          <ul>
            <li>
              <strong>
                报名时间:
              </strong>
              2018年2月2日-2018年2月4日24:00截止。
            </li>
            <li>
              <strong>
                报名方式:
              </strong>
              在以上规定时间内完成Cybex注册即视为报名成功。
            </li>
            <li>
              <strong>
                活动时间:
              </strong>
              2018年2月5日-2018年2月21日。
            </li>

          </ul>
        </section>
        <section>
          <p>
            *为了保证活动公平性，我们将在2月5日0点统一向报名成功的参赛者账户打入相同数量的游戏币，参赛者即可开始交易比拼。所以，2月5日之后报名的用户将无法参与活动二，可以继续参加活动一，帮助我们消灭Bug！
          </p>
        </section>
        <div>
          CYBEX团队
          <br /> 2018.02.02
        </div>
      </div>
        <div className="modal-footer text-center">
      <label htmlFor={this.props.modalId + "_never"}>
        <input id={this.props.modalId + "_never"} checked={this.state.neverShow} type="checkbox" className="" onChange={this.handleNeverShow}/>
        不再显示此消息
      </label>
      </div>
    </BaseModal>
    );
  }
  enModal() {
    return (<BaseModal modalId={this.props.modalId}>
     <h3 className="modal-header text-center">
      Investment Competition rules
      </h3>
      <div className="modal-content game-modal">
        <h5>
        Thank you for participating in the CYBEX Investment Competition, the rules of the competition are in the below:
        </h5>
        <section>
          <h5>
          Activity 1️⃣: Bug Hunter: 
          </h5>
          <p>
          During the competition, any bug found in CYBEX, please log in to 
            <a href="https://github.com/CybexDex/Cybex-Improvment"> https://github.com/CybexDex/Cybex-Improvment </a>
            to submit feedback. After verification, the user who submits first feedback of each bug can finally share 10000 CYB equally. 
          </p>
          <p>
            *The same bug, only the first feedback user can get rewarded. The same person can get positions to share CYB many times. <br/>
            Bug feedback and winners will be announced weekly in the official groups. 
          </p>
        </section>
        <section>
          <h5>
          Activity 2️⃣: Wealth management ranking competition
          </h5>
          <p>
          Participate in the competition, and have at least 10 transactions during the event. In the end of competition, the top 200 can get rewards:
            <ul>
              <li>First place: 2888 CYB</li>
              <li>Second place: 1888 CYB</li>
              <li>Third place: 888 CYB</li>
              <li>No. 4 to 200: 66 CYB</li>
            </ul>
            <p>
            All currencies will be converted into CYBX according to the exchange rate of the deadline.
            </p>
          </p>
        </section>
        <section>
          <h5>
          Extra Bonus:
          </h5>
          <p>
          Anyone who has successfully registered for participation in the event, Cybex Exchange will be granted a special identification within the system after February 26, with the Rainbow Rhino permanent commemorative badge (Limited Edition)
          </p>
        </section>
        <section>
          <ul>
            <li>
              <strong>
              Registration time:
              </strong>
              February 2, 2018 - February 4, 2018 at 24:00 deadline. 
            </li>
            <li>
              <strong>
              Enrollment Method:
              </strong>
              Registering for CYBEX within the above specified time will be regarded as successful registration.
  
            </li>
            <li>
              <strong>
              Competition Time:
              </strong>
              February 5, 2018 - February 21, 2018.
            </li>
  
          </ul>
        </section>
        <section>
          <p>
            *In order to ensure the fairness of the competition, we will give same amount of coins at the same time at 0:00 on February 5, and participants can start to trade. So, users registered after February 5 will not be able to participate in the Activities 2. However, users can continue to participate in Activities1, and help us hunt Bugs! 
          </p>
        </section>
        <footer>
          CYBEX team
          <br /> 2018.02.02
        </footer>
      </div>
      <div className="modal-footer text-center">
      <label htmlFor={this.props.modalId + "_never"}>
        <input id={this.props.modalId + "_never"} checked={this.state.neverShow} type="checkbox" className="" onChange={this.handleNeverShow}/>
        Never show this tip again
      </label>
      </div>
    </BaseModal>)
  }

  
  render() {
    let { modalId, open, locale } = this.props;
    return (
      open && (locale === "zh" && this.cnModal() || this.enModal())
    );
  }
}

const GameModalWapper = connect(GameModal, {
  listenTo() {
    return [ModalStore, IntlStore];
  },
  getProps(props) {
    let { modalId } = props;
    return {
      locale: IntlStore.getState().currentLocale,
      open: ModalStore.getState().showingModals.has(modalId)
    };
  }
});


export default GameModalWapper;