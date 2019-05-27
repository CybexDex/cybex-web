import * as React from "react";
import { EtoPanel } from "./EtoPanel";
import counterpart from "counterpart";

type FlowStep = {
  title: string;
  content: string;
  active?: boolean;
  append?: any;
};

const EtoAppendMark = () => {
  return <h1>?</h1>;
};

const flow = [
  {
    title: "eto_apply.flow.apply",
    content: "eto_apply.flow.apply_content",
    active: true
  },
  { title: "eto_apply.flow.lock", content: "eto_apply.flow.lock_content" },
  {
    title: "eto_apply.flow.draw",
    content: "eto_apply.flow.draw_content"
    // append: () => <EtoAppendMark />
  },
  { title: "eto_apply.flow.buy", content: "eto_apply.flow.buy_content" }
];

const flowCenter = new Array(7).fill(1).map((_, step) => ({
  title: `eto_apply.center.flow.step_${step + 1}`,
  content: `eto_apply.center.flow.step_content_${step + 1}`,
  active: step < 3
}));

export const EtoFlow = ({ center = false }) => (
  <EtoPanel>
    <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "16px" }}>
      {counterpart.translate("eto_apply.flow.title")}
    </h4>
    <ul className="eto-flow" style={{ margin: 0 }}>
      {
        (center ? flowCenter : flow).map((step: FlowStep, index) => (
          <li
            key={index}
            data-step={index + 1}
            className={step.active ? "active" : ""}
          >
            <h4 style={{ color: "inherit", fontWeight: "bold" }}>
              {counterpart.translate(step.title)}
            </h4>
            <p style={{ opacity: 0.85 }}>
              {counterpart.translate(step.content)}
            </p>
          </li>
        )) as any
      }
    </ul>
  </EtoPanel>
);
