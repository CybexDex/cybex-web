import * as React from "react";

export const RefreshTip = class extends React.Component<any> {
  componentDidMount() {
    location.reload();
  }
  render() {
    return (
      <div
        style={{
          color: "#eee",
          textAlign: "center",
          height: "100vh",
          display: "table-cell",
          verticalAlign: "middle",
          width: "100vw"
        }}
      >
        <div
          style={{
            width: "16em",
            height: "16em",
            margin: "auto",
            lineHeight: "16em",
            borderRadius: "100%",
            overflow: "hidden",
            background: "#ddd",
            boxShadow: "0 0 4px #fff"
          }}
        >
          <img src="/images/logo-main.png" />
        </div>
        <p style={{ fontSize: 18, marginTop: "2em" }}>
          The connection has been broken; The site will be refreshed in some seconds;
        </p>
      </div>
    );
  }
};
