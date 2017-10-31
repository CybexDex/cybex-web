import * as React from "react";
import Card, { CardStatus } from "./../Utility/Card"
import Translate from "react-translate-component";

import QueueAnim from "rc-queue-anim";

type CardListProps = {
  onKnownAll: boolean,
  onAllDone: any
};

const warningDetail = (
  <div className="card-detail">
    <p>于大多数交易者来说，钱包模式是最为安全的选择。
    您的本地设备将依据您所设置的钱包密码生成一份二进制的钱包文件，使用这一钱包，您将能够对您的所有资产进行访问和管理。该钱包与钱包密码搭配，是访问您资产的唯一凭证。由于钱包只存在您本人当前的访问环境中，任何其他人无法接触，从而保证了您个人资产的安全性。
  </p>
    <p>但同时，钱包文件的意外丢失也将造成非常严重的后果——您存在于该钱包中的资产将丢失，并无法通过其他途径找回。</p>
    <p>因此，Cybex在协助您完成钱包账户的创建工作后，将推荐并引导您对您的钱包文件进行下载备份。请务必进行下载备份并保存好该文件，牢记该文件存放的位置，同时也推荐使用专用的物理设备，如U盘等，保存好该文件。这样在任何情况下，无论是遇到交易终端的意外情况还是您更换了交易设备，只需找到并恢复您所备份的钱包文件，您便可以继续方便安全的管理您的资产。</p>
  </div>
);

const cardList: CardStatus[] = [
  {
    section: "wallet.backup_primary",
    iconClass: "icon-warning big",
    important: true
  },
  {
    section: "wallet.answer_wrong_1",
    iconClass: "icon-piggy-bank"
  },
  {
    section: "wallet.answer_wrong_3",
    iconClass: "icon-air-craft"
  },
  {
    section: "wallet.answer_wrong_2",
    iconClass: "icon-safe-vault"
  },
];

type CardListState = {
  currentStep: number,
  allKnown: boolean;
  onlyOneCard?: boolean;
};

type TimerButtonProps = {
  timeToCount: number;
  onClick: any;
};

const ScrollTopWrapper = class extends React.Component {
  el: HTMLElement = null;

  componentDidMount() {
    this.el && this.el.scrollIntoView();
  }

  render() {
    return (
      <div ref={wrap => this.el = wrap} className="scroll-wrap">
        {
          this.props.children
        }
      </div>
    )
  }
}

class TimerButton extends React.Component<TimerButtonProps, any> {
  timer: any;
  constructor(props: TimerButtonProps) {
    super(props);
    this.state = {
      time: props.timeToCount
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prev => ({
        time: prev.time - 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <button className="button hollow error" disabled={this.state.time > 0} onClick={this.props.onClick} >
        {this.state.time > 0 && (this.state.time + "s")}
        &nbsp;
        {this.props.children}
      </button>
    );
  }
}

const AnimConfig = [
  {
  }, {
    appear: false
  }
]

export default class CardList extends React.Component<any, CardListState> {
  cardList: CardStatus[];
  constructor(props: any) {
    super(props);
    this.cardList = cardList.slice(1);
    this.state = {
      currentStep: 0,
      allKnown: false
    }
    this.onKnownClick = this.onKnownClick.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.checkCardNum = this.checkCardNum.bind(this);
  }

  handleDetail() {
    this.cardList =
      this.cardList.slice(0, 1);
        
    this.forceUpdate();
  }

  onKnownClick() {
    let nextStep = this.state.currentStep + 1;
    if (nextStep < this.cardList.length) {
      this.setState(prevState => ({
        currentStep: nextStep % cardList.length
      }));
    } else {
      this.cardList = cardList.slice();
      this.setState({
        currentStep: 0,
        allKnown: true
      });
    }
  }

  checkCardNum() {
    if (this.cardList.length === 1) {
      this.cardList = this.cardList.map(card => ({ ...card, detail: warningDetail }));
      this.setState({
        onlyOneCard: true
      });
    }
  }

  render() {
    let { onAllDone } = this.props;
    return (
      <QueueAnim className="card-list grid-block" onEnd={this.checkCardNum}>
        {
          this.cardList.map((card, index) => (
            <Card
              className={
                "box" +
                (!this.state.onlyOneCard ? "" : " card-only") +
                (card.important ? " card-important" : "")
              }
              key={card.section}
              card={card}
              isActive={index <= this.state.currentStep}
              needScroll={this.state.allKnown}
            >
              <div className="button-wrap">
                {
                  this.state.currentStep == index && !this.state.allKnown &&
                  <ScrollTopWrapper>
                    <button className="button hollow warning" onClick={this.onKnownClick}>
                      <Translate content="I_know" />
                    </button>
                  </ScrollTopWrapper>
                }
                {
                  this.cardList.length > 1 &&
                  this.state.currentStep == index && this.state.allKnown &&
                  <button className="button hollow error" onClick={this.handleDetail} >
                    <Translate content="I_really_know" />
                  </button>
                }
                {
                  this.cardList.length <= 1 &&
                  <TimerButton timeToCount={10} onClick={onAllDone}>
                    <Translate content={"I_really_know"} />
                  </TimerButton>
                }
              </div>
            </Card>
          ))
        }
      </QueueAnim>
    );
  }
}