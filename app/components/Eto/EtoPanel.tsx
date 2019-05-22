import * as React from "react";

export const EtoPanel = ({ children }) => (
  <div className="eto-panel">{children}</div>
);
export const EtoContent = ({ heading, contents }) => (
  <EtoPanel>
    <h4>{heading}</h4>
    {contents.map((content, i) => <p key={i}>{content}</p>)}
  </EtoPanel>
);
