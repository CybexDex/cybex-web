import * as React from "react";
import counterpart from "counterpart";
import { EtoPanel } from "./EtoPanel";
import { Colors } from "../Common";

export const EtoRule = () => (
  <EtoPanel>
    <h4>{counterpart.translate("eto_apply.survey.rule_title")}</h4>
    <p>{counterpart.translate("eto_apply.survey.rule_content")}</p>
    <table>
      <thead>
        <tr>
          <th>{counterpart.translate("eto_apply.survey.rule_table_th1")}</th>
          <th>{counterpart.translate("eto_apply.survey.rule_table_th2")}</th>
          <th>{counterpart.translate("eto_apply.survey.rule_table_th3")}</th>
        </tr>
      </thead>
      <tbody>
        {new Array(4).fill(1).map((_, i) => (
          <tr key={i}>
            {new Array(3).fill(1).map((_, j) => (
              <td key={j}>
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
  <p>
    <span style={{ color: Colors.$colorFlame }}>*</span>
    <small>{counterpart.translate("eto_apply.explain")}</small>
  </p>
);
