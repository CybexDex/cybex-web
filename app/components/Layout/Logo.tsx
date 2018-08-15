import * as React from "react";
import Radium from "radium";

const $style = {
  base: {
    ":hover": {
      filter: "brightness(1.3)"
    }
  },
  short: {
    clipPath: "polygon(0% 0%, 33% 0%, 33% 100%, 0% 100%)"
  },
  bright: {
    filter: "brightness(1.3)"
  }
};

export const CybexLogo = Radium(
  ({
    isShort = false,
    isActive = false,
    onClick = () => void 0,
    style = {}
  }) => {
    return (
      <>
        <img
          key={"normal-logo"}
          src={require("assets/logo-text.png")}
          style={
            [
              $style.base,
              isShort && $style.short,
              isActive && $style.bright,
              style
            ] as any
          }
          className="logo-normal clickable"
          onClick={onClick}
          alt="Cybex Dashboard"
        />
        <img
          key={"short-logo"}
          src={require("assets/logo-text-short.png")}
          style={
            [
              $style.base,
              isShort && $style.short,
              isActive && $style.bright,
              style
            ] as any
          }
          className="logo-short clickable"
          onClick={onClick}
          alt="Cybex Dashboard"
        />
      </>
    );
  }
);
export default CybexLogo;
