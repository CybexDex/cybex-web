import * as React from "react";
import ProgressiveImage from "react-progressive-image";
import classnames from "classnames";
import Poker, { shapes } from "./Poker";
import "./GameCenter.scss";
import bs58 from "bs58";

const GameTable = class GameTable extends React.Component<
  { open: boolean; onOverlayClick },
  { enter: boolean }
> {
  static Passwords = [
    "2tHURphLbGvQrFBEgiv7B",
    "2zd87izMZZJauhF2Frp1M",
    "2tA8yfHLwSBnLR9ZAyDnL",
    "2zd87izNgaKBja34ZLLDP"
  ];

  pokerOne;
  pokerTwo;
  shapeOne;
  shapeTwo;
  rankOne;
  rankTwo;
  secOne;
  secTwo;
  timer;
  state = {
    enter: true
  };

  constructor(props) {
    super(props);
    this.shapeOne = shapes[Math.floor(Math.random() * shapes.length)];
    this.shapeTwo = shapes[Math.floor(Math.random() * shapes.length)];
    this.rankOne = Math.floor(Math.random() * 104);
    this.rankTwo = Math.floor(Math.random() * 104);
    this.secOne =
      this.rankOne % 26 === 2
        ? Buffer.from(
            bs58.decode(
              GameTable.Passwords[
                Math.floor(Math.random() * GameTable.Passwords.length)
              ]
            )
          ).toString("utf-8")
        : null;
    this.secTwo =
      this.rankTwo % 26 === 2
        ? Buffer.from(
            bs58.decode(
              GameTable.Passwords[
                Math.floor(Math.random() * GameTable.Passwords.length)
              ]
            )
          ).toString("utf-8")
        : null;
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.toggleCards();
      this.setState({
        enter: false
      });
    }, 500);
  }

  componentWillMount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  toggleCards = () => {
    this.pokerOne.toggleCard();
    this.pokerTwo.toggleCard();
  };

  render() {
    let { enter } = this.state;
    return (
      <div
        onClick={this.props.onOverlayClick}
        className={classnames("game-table", { open: this.props.open })}
      >
        <Poker
          shape={this.shapeOne}
          rank={this.rankOne}
          shrink="left"
          style={{ right: enter ? -200 : 0 }}
          ref={poker => (this.pokerOne = poker)}
          mark={this.secOne}
        >
          <img
            style={{ filter: "brightness(0.98)" }}
            src="https://static-assets.51nebula.com/activities/service_c.jpeg"
            alt="QC of Cybex Service C"
          />
        </Poker>
        <Poker
          shape={this.shapeTwo}
          rank={this.rankTwo}
          shrink="right"
          style={{ right: enter ? -220 : 0 }}
          ref={poker => (this.pokerTwo = poker)}
          mark={this.secTwo}
        >
          <img
            style={{ filter: "brightness(0.98)" }}
            src="https://static-assets.51nebula.com/activities/service_c.jpeg"
            alt="QC of Cybex Service C"
          />
        </Poker>
      </div>
    );
  }
};

class GameCenter extends React.Component<
  { account; depositModal?; withdrawModal? },
  { showTable: boolean }
> {
  state = {
    showTable: false
  };

  toggleTable = () => {
    this.setState(prevState => ({
      showTable: !prevState.showTable
    }));
  };

  render() {
    let { depositModal, account, withdrawModal } = this.props;
    return (
      <>
        {
          <ProgressiveImage
            src="https://static-assets.51nebula.com/activities/game_progress.jpg"
            placeholder="https://static-assets.51nebula.com/activities/game_progress.jpg?x-oss-process=style/md"
          >
            {(src, loading) => (
              <div
                style={{
                  opacity: loading ? 0.5 : 1,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative"
                }}
              >
                <a
                  href="javascript:;"
                  style={{
                    position: "absolute",
                    top: "76%",
                    right: "20.5%",
                    fontSize: "20px",
                    textDecoration: "underline"
                  }}
                  onClick={this.toggleTable}
                >
                  APP试玩版已上线，联系小助手了解详情
                </a>
                {this.state.showTable && (
                  <GameTable
                    onOverlayClick={this.toggleTable}
                    open={this.state.showTable}
                  />
                )}
              </div>
            )}
          </ProgressiveImage>
        }
      </>
    );
  }
}

console.debug("GameCenterInstance: ", GameCenter);
export default GameCenter;
