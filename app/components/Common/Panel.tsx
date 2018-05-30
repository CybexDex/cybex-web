import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "Radium";
import { Icon } from "./Icon";
import { Colors } from "./Colors";
import { $styleFlexContainer } from "./Styles";

let Panel = Radium(
  class extends React.Component<
    { children?; direction?; responsive?; styles? },
    any
  > {
    static defaultProps = {
      direction: "column",
      responsive: true
    };
    static propTypes = {
      responsive: PropTypes.bool.isRequired
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
      let { children, direction, responsive, styles } = this.props;
      return (
        <div
          style={
            [
              styles,
              Panel.$style.base,
              $styleFlexContainer(direction),
              responsive && Panel.$style.responsive
            ] as any
          }
          {...this.props}
        >
          {children}
        </div>
      );
    }
  }
);

export { Panel };
export default Panel;
