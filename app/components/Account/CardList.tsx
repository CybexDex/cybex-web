import * as React from "react"; import * as PropTypes from "prop-types";
import Card, { CardStatus } from "./../Utility/Card"
import Translate from "react-translate-component";
import { TimerButton } from "components/Utility/TimerButton";
import QueueAnim from "rc-queue-anim";

type CardListProps = {
  onKnownAll: boolean,
  onAllDone: any
};

const warningDetail = (
  <div className="card-detail">
    <Translate component="p" content="warningDetail.p1" />
    <Translate component="p" content="warningDetail.p2" />
    <Translate component="p" content="warningDetail.p3" />
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
      if (this.props.onWarning) {
        this.props.onWarning();
      }
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