import * as React from "react";
import counterpart from "counterpart";
import { EtoPanel } from "./EtoPanel";
import { Colors } from "../Common";

export const EtoRule = props => (
  <EtoPanel {...props}>
    <h4 style={{ fontSize: "14px" }}>
      {counterpart.translate("eto_apply.survey.rule_title")}
    </h4>
    <p
      className="color-steel"
      style={{
        fontSize: "12px",
        textAlign: "justify",
        lineHeight: "20px",
        margin: "12px auto"
      }}
    >
      {counterpart.translate("eto_apply.survey.rule_content")}
    </p>
    <table>
      <thead>
        <tr>
          <th
            className="color-steel-light"
            style={{
              textAlign: "left",
              height: "30px",
              paddingRight: "8px",
              fontSize: "10px",
              lineHeight: "14px"
            }}
          >
            {counterpart.translate("eto_apply.survey.rule_table_th1")}
          </th>
          <th
            className="color-steel-light"
            style={{
              textAlign: "left",
              fontSize: "10px",
              lineHeight: "14px",
              padding: "0 8px"
            }}
          >
            {counterpart.translate("eto_apply.survey.rule_table_th2")}
          </th>
          <th
            className="color-steel-light"
            style={{
              fontSize: "10px",
              lineHeight: "14px",
              textAlign: "right",
              paddingLeft: "8px"
            }}
          >
            {counterpart.translate("eto_apply.survey.rule_table_th3")}
          </th>
        </tr>
      </thead>
      <tbody>
        {new Array(4).fill(1).map((_, i) => (
          <tr key={i}>
            {new Array(3).fill(1).map((_, j) => (
              <td
                key={j}
                className="color-steel"
                style={{
                  padding:
                    j === 0 ? "0 8px 0 0" : j === 1 ? "0 8px" : "0 0 0 8px",
                  fontSize: "10px",
                  height: "30px",
                  textAlign: j < 2 ? "left" : "right"
                }}
              >
                {counterpart.translate(
                  `eto_apply.survey.rule_table_row${i + 1}_cell${j + 1}`
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </EtoPanel>
);

export const EtoExplain = () => (
  <p style={{ marginBottom: "0" }}>
    <span style={{ color: Colors.$colorFlame }}>*</span>
    <small>{counterpart.translate("eto_apply.explain")}</small>
  </p>
);
