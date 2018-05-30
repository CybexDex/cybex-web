import * as React from "react";
import SVGInline from "react-svg-inline";
import Translate from "react-translate-component";
import Radium from "Radium";
import { BaseColors } from "components/Common/Colors";

const spotStyles = {
  wrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  spot: {
    width: "0.8333em",
    height: "0.8333em",
    opacity: 0.3,
    backgroundColor: BaseColors.$colorWhite,
    borderRadius: "100%",
    marginRight: "1em",
    ":active": {
      opacity: 1
    }
  }
};
const SpotToggle = Radium(
  ({ size, onSpotClick = () => void 0, activeIndex = 0 }) => (
    <div style={spotStyles.wrapper} className="spot-toggle-wrapper">
      {new Array(size)
        .fill(1)
        .map((n, i) => (
          <a
            key={"spot" + i}
            href={"javascript:;"}
            style={
              [
                spotStyles.spot,
                i === activeIndex && spotStyles.spot[":active"]
              ] as any
            }
            onClick={onSpotClick.bind(this, i)}
            className="spot-toggle-spot"
          />
        ))}
    </div>
  )
);

let LeftSlide = class extends React.Component<any, { slideIndex }> {
  anim;
  static styles = {
    title: {
      fontSize: "5rem",
      lineHeight: 1.4,
      marginBottom: "2rem"
    },
    feature: {
      fontSize: "1.2rem"
    },
    vertical: {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center"
    },
    slide: {
      opacity: 0,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      transition: "opacity 1.5s ease-in-out"
    },
    active: {
      opacity: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  setSpotIndex = slideIndex => {
    this.setState({ slideIndex });
  };

  componentDidMount() {
    this.anim = this.setupAnim();
  }

  setupAnim = () => {
    return setInterval(() => {
      this.setSpotIndex(Math.abs(this.state.slideIndex - 1));
    }, 6000);
  };

  onSpotClick = spotIndex => {
    if (this.anim) {
      clearInterval(this.anim);
    }
    this.setSpotIndex(spotIndex);
    this.anim = this.setupAnim();
  };

  componentWillUnmount() {
    if (this.anim) {
      clearInterval(this.anim);
    }
  }

  render() {
    return (
      <div
        className="left-slide-wrapper"
        style={{
          ...LeftSlide.styles.vertical,
          width: "42.8125%",
          maxWidth: "648px",
          height: "100%",
          backgroundImage: `url(${require("./login_mask.svg")})`,
          backgroundSize: "cover",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          justifyContent: "flex-end"
        }}
        {...this.props}
      >
        <div
          className="slide"
          style={
            [
              LeftSlide.styles.vertical,
              LeftSlide.styles.slide,
              this.state.slideIndex === 0 && LeftSlide.styles.active
            ] as any
          }
        >
          <Translate
            component="div"
            className="slogan slogan-main"
            content="dashboard.title1"
            style={LeftSlide.styles.title}
            unsafe
          />
          <Translate
            component="div"
            className="slogan slogan-sub"
            content="dashboard.subtitle1"
            style={LeftSlide.styles.feature}
          />
        </div>
        <div
          className="slide"
          style={
            [
              LeftSlide.styles.vertical,
              LeftSlide.styles.slide,
              this.state.slideIndex === 1 && LeftSlide.styles.active
            ] as any
          }
        >
          <Translate
            component="div"
            className="slogan slogan-main"
            content="dashboard.title2"
            style={LeftSlide.styles.title}
            unsafe
          />
          <Translate
            component="div"
            className="slogan slogan-sub"
            content="dashboard.subtitle2"
            style={LeftSlide.styles.feature}
          />
        </div>
        <SpotToggle
          onSpotClick={this.onSpotClick}
          activeIndex={this.state.slideIndex}
          size={2}
        />
      </div>
    );
  }
};

LeftSlide = Radium(LeftSlide);

export { LeftSlide };
export default LeftSlide;
