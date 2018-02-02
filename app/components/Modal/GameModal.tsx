import * as React from "react";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
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

type props = { modalId, depositInfo?, open?, className?, asset, balances?};


class GameModal extends React.Component<props, { fadeOut }> {
  constructor(props) {
    super(props);
  }

  render() {
    let { modalId, open } = this.props;
    return (
      open &&
      <BaseModal modalId={modalId}>
        <h3 className="text-center">
          投资大赛规则
      </h3>
        <div className="modal-content">

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
              *所有币都将按照活动截止时间的汇率换成CYBX计算。<br/>
              *相同bug，只有第一位反馈的用户才能获得奖励。同一个人可以多次获奖。Bug反馈情况、获奖名单将每周在群里公布。
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
          <footer>
            CYBEX团队<br /> 2018.02.02
      </footer>
        </div>
      </BaseModal>
    );
  }
}

const GameModalWapper = connect(GameModal, {
  listenTo() {
    return [ModalStore];
  },
  getProps(props) {
    let { modalId } = props;
    console.debug("Has: ", ModalStore.getState().showingModals);
    return {
      open: ModalStore.getState().showingModals.has(modalId)
    };
  }
});


export default GameModalWapper;