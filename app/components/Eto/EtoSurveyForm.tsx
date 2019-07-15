import * as React from "react";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoRule, EtoExplain } from "./EtoRule";
const { useState, useEffect } = React;
export const EtoSurveyForm = ({ account, onSubmit }) => {
  const [agreement, setAgreement] = useState(false);
  const [op1, setOp1] = useState(false);
  const [op2, setOp2] = useState(false);
  const [op3, setOp3] = useState(false);
  const [op4, setOp4] = useState(false);
  // const [op4, setOp4] = useState(false);
  const ops = [op1, op2, op3, op4];
  const setOps = [setOp1, setOp2, setOp3, setOp4];
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(ops);
      }}
    >
      <EtoContentWrapper>
        <p
          className="color-steel"
          style={{ fontSize: "12px", lineHeight: "20px", marginBottom: 0 }}
        >
          {counterpart.translate("eto_apply.survey.tip", { account })}
        </p>
      </EtoContentWrapper>
      <EtoRule />
      <EtoContentWrapper>
        <EtoExplain />
      </EtoContentWrapper>
      <EtoPanel>
        <h4 style={{ fontSize: "14px" }}>
          {counterpart.translate("eto_apply.survey.option_title")}
        </h4>
        {ops.map((value, i) => (
          <Checkbox
            key={i}
            onChange={v => setOps[i](v)}
            size="large"
            active={value}
          >
            <Translate
              style={{
                fontSize: "0.8em",
                userSelect: "none",
                lineHeight: "1.8em",
                color: "rgb(120,129,154)"
              }}
              content={`eto_apply.survey.option_${i + 1}`}
            />
          </Checkbox>
        ))}
      </EtoPanel>
      <EtoContentWrapper>
        <p className="agreement">
          <Checkbox
            onChange={v => setAgreement(v)}
            size="large"
            active={agreement}
            labelStyle={{ height: "24px" }}
          >
            <Translate
              style={{
                fontSize: "0.8em",
                userSelect: "none",
                lineHeight: "1.8em"
              }}
              content="eto_apply.survey.rule_known"
            />
          </Checkbox>
        </p>
        <div style={{ margin: "12px -12px" }}>
          <Button
            type="primary"
            disabled={!agreement || ops.every(value => !value)}
            // loading={this.state.checking}
            style={{ width: "100%" }}
          >
            {counterpart.translate("eto_apply.survey.finish")}
          </Button>
        </div>
      </EtoContentWrapper>
    </form>
  );
};
