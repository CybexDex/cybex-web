import * as React from "react";

export const LockCPanel = ({
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
export const LockCContentWrapper = ({
  children,
  style,
  ol
}: {
  style?;
  ol?;
  children;
}) => (
  <div style={{ padding: "12px", margin: "0 12px", ...style }}>{children}</div>
);
export const LockCContent = ({ heading, contents, ...props }) => (
  <LockCPanel {...props}>
    <h4 style={{ marginBottom: "12px" }}>{heading}</h4>
    {props.ol ? (
      <ol>
        {contents.map((content, i) => (
          <li
            className="eto-label"
            key={i}
            style={{
              textAlign: "justify",
              listStyle: "inherit",
              lineHeight: 2
            }}
          >
            {content}
          </li>
        ))}
      </ol>
    ) : (
      contents.map((content, i) => (
        <p
          className="eto-label"
          key={i}
          style={{ textAlign: "justify", lineHeight: 2 }}
        >
          {content}
        </p>
      ))
    )}
  </LockCPanel>
);
