import * as React from "react";
import * as ReactDOM from "react-dom";

export const HEADER_PORTAL_ID = "headerPortal";

export class HeaderPortal extends React.Component<{children}, any> {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById("headerPortal")
    );
  }
}