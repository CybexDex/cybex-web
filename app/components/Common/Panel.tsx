import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import { Icon } from "./Icon";
import { Colors } from "./Colors";
import { $styleFlexContainer } from "./Styles";

let Panel = Radium(
  class extends React.Component<
    { children?; direction?; responsive?; style? },
    any
  > {
    static defaultProps = {
      direction: "column",
      responsive: true
    };
    
    static $style = {
      base: {
        backgroundColor: Colors.$colorLead
      },
      responsive: {
        "@media (max-width: 640px)": {
          flexDirection: "column"
        }
      }
    };

    render() {
      let { children, direction, responsive, style } = this.props;
      return (
        <div
          {...this.props}
          style={
            [
              Panel.$style.base,
              $styleFlexContainer(direction),
              responsive && Panel.$style.responsive,
              style
            ] as any
          }
        >
          {children}
        </div>
      );
    }
  }
);

export { Panel };
export default Panel;
