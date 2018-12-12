import * as React from "react";
import classnames from "classnames";
import "./Poker.scss";
import { Colors, $styleFlexContainer, Icon } from "components/Common";

const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
type PokerShape = "heart" | "spade" | "club" | "diamond";
export const shapes = ["heart", "spade", "club", "diamond"];
const Rank = ({
  shape,
  rank,
  style
}: {
  shape: PokerShape;
  rank: number;
  style?;
}) => (
  <div
    className={`rank poker-${shape} poker${shape[0].toLocaleUpperCase() +
      shape.substring(1)}`}
    style={{
      fontSize: "20px",
      ...$styleFlexContainer("column", "center", "center"),
      ...style
    }}
  >
    <span>{ranks[rank % ranks.length]}</span>
    <Icon
      style={{ backgroundSize: "contain" }}
      icon={`poker${shape[0].toLocaleUpperCase() + shape.substring(1)}`}
    />
  </div>
);
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const Poker = class extends React.Component<
  {
    shape: PokerShape;
    rank: number;
    style?;
    mark?: null | string;
    shrink?: boolean | "left" | "right";
  },
  { open: boolean; shakeDegree: number }
> {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      shakeDegree:
        (Math.floor(Math.random() * 100) / 28) *
        (this.props.shrink === "left"
          ? -1
          : this.props.shrink === "right"
            ? 1
            : Math.random() >= 0.5
              ? -1
              : 1)
    };
  }

  static defaultProps = {
    shape: "heart",
    shrink: true,
    rank: 0
  };

  toggleCard = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  _getTransform() {
    return `rotate(${this.state.shakeDegree}deg) rotateY(${
      this.state.open ? 180 : 0
    }deg)`;
  }

  render() {
    let { shape, rank, style, shrink, mark } = this.props;
    let { open } = this.state;
    return (
      <div
        className={classnames("poker", { open })}
        style={
          shrink && open
            ? { transform: this._getTransform(), ...style }
            : { ...style }
        }
        onClick={this.toggleCard}
      >
        <div className="face back">
          <div
            className="back-wrapper"
            style={{
              opacity: isSafari && open ? 0 : 1,
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "auto",
              transition: "all 1s",
              transform: "translate(-50%, -50%)"
            }}
          >
            <div
              style={{
                width: "92px",
                height: "92px",
                margin: "auto",
                lineHeight: "92px",
                borderRadius: "100%",
                overflow: "hidden",
                background: "rgba(255, 221, 132, 1)",
                opacity: 0.99,
                boxShadow: `0 0 4px 1px rgba(255, 221, 132, 1)`
              }}
            >
              <img src="/images/logo-main.png" />
            </div>
            {mark && (
              <p
                style={{
                  margin: "1em auto",
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  textShadow: "0 0 2px white"
                }}
              >
                {mark}
              </p>
            )}
          </div>
        </div>
        <div
          className="face front"
          style={{
            padding: 8,
            ...$styleFlexContainer("row", "space-between", "center")
          }}
        >
          <div className="front-item">
            <Rank
              shape={shape}
              rank={rank}
              style={{ position: "absolute", top: 12, left: 8 }}
            />
            {this.props.children}
            <Rank
              shape={shape}
              rank={rank}
              style={{
                position: "absolute",
                bottom: 12,
                right: 8,
                transform: "rotateX(180deg) rotateY(180deg)"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Poker;
