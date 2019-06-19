import * as React from "react";

export const EdgePanel = ({
  children,
  style,
  ...other
}: {
  style?;
  children;
  [other: string]: any;
}) => (
  <div
    className="eto-panel"
    style={{ borderRadius: "4px", padding: "12px", margin: "0 12px", ...style }}
    {...other}
  >
    {children}
  </div>
);
export const EdgeContentWrapper = ({
  children,
  style
}: {
  style?;
  children;
}) => (
  <div style={{ padding: "12px", margin: "0 12px", ...style }}>{children}</div>
);
export const EdgeContent = ({ heading, contents, ...props }) => (
  <EdgePanel {...props}>
    <h4 style={{ marginBottom: "12px" }}>{heading}</h4>
    {contents.map((content, i) => (
      <p className="eto-label" key={i} style={{ textAlign: "justify" }}>
        {content}
      </p>
    ))}
  </EdgePanel>
);
