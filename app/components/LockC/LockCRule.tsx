import * as React from "react";
import counterpart from "counterpart";
import { LockCPanel } from "./LockCPanel";
import { Colors } from "../Common";
import Translate from "react-translate-component";

export const LockCRule = props => (
  <LockCPanel {...props}>
    <h4 style={{ fontSize: "14px" }}>
      {counterpart.translate("lockC.lockup.rule_title")}
    </h4>
    <Translate
      component="p"
      className="color-steel"
      style={{
        fontSize: "12px",
        textAlign: "justify",
        lineHeight: "20px",
        margin: "12px auto"
      }}
      unsafe
      content="lockC.lockup.rule_content_1"
    />
    {/* <table style={{ width: "100%" }}>
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
            {counterpart.translate("lockC.lockup.rule_table_th1")}
          </th>
          <th
            className="color-steel-light"
            style={{
              textAlign: "center",
              fontSize: "10px",
              lineHeight: "14px",
              padding: "0 8px"
            }}
          >
            {counterpart.translate("lockC.lockup.rule_table_th2")}
          </th>
          <th
            className="color-steel-light"
            style={{
              fontSize: "10px",
              lineHeight: "14px",
              textAlign: "center",
              paddingLeft: "8px"
            }}
          >
            {counterpart.translate("lockC.lockup.rule_table_th3")}
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
            {counterpart.translate("lockC.lockup.rule_table_th4")}
          </th>
        </tr>
      </thead>
      <tbody>
        {new Array(3).fill(1).map((_, i) => (
          <tr key={i}>
            {new Array(4).fill(1).map((_, j) => (
              <td
                key={j}
                className="color-steel"
                style={{
                  padding:
                    j === 0 ? "0 8px 0 0" : j === 1 ? "0 8px" : "0 0 0 8px",
                  fontSize: "10px",
                  height: "30px",
                  textAlign: j === 0 ? "left" : j === 3 ? "right" : "center"
                }}
              >
                {counterpart.translate(
                  `lockC.lockup.rule_table_row${i + 1}_cell${j + 1}`
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table> */}
    {/* <Translate
      component="p"
      className="color-steel"
      style={{
        fontSize: "12px",
        textAlign: "justify",
        lineHeight: "20px",
        margin: "12px auto"
      }}
      unsafe
      content="lockC.lockup.rule_content_2"
    /> */}
    {/* <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th
            className="color-steel-light"
            style={{
              textAlign: "left",
              height: "30px",
              width: "30%",
              paddingRight: "8px",
              fontSize: "10px",
              lineHeight: "14px"
            }}
          >
            {counterpart.translate("lockC.lockup.rule_table2_th1")}
          </th>
          <th
            className="color-steel-light"
            style={{
              textAlign: "center",
              fontSize: "10px",
              lineHeight: "14px",
              padding: "0 8px"
            }}
          >
            {counterpart.translate("lockC.lockup.rule_table2_th2")}
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
            {counterpart.translate("lockC.lockup.rule_table2_th3")}
          </th>
        </tr>
      </thead>
      <tbody>
        {new Array(2).fill(1).map((_, i) => (
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
                  textAlign: j === 0 ? "left" : j === 2 ? "right" : "center"
                }}
              >
                {counterpart.translate(
                  `lockC.lockup.rule_table2_row${i + 1}_cell${j + 1}`
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table> */}
    {[].map(num => (
      <Translate
        key={num}
        component="p"
        className="color-steel"
        style={{
          fontSize: "12px",
          textAlign: "justify",
          lineHeight: "20px",
          margin: "12px auto"
        }}
        unsafe
        content={`lockC.lockup.rule_content_${num}`}
      />
    ))}
  </LockCPanel>
);

export const LockCExplain = ({ content = "eto_apply.explain" }) => (
  <p style={{ marginBottom: "0" }}>
    <span style={{ color: Colors.$colorFlame }}>*</span>
    <small style={{ fontSize: "11px" }}>{counterpart.translate(content)}</small>
  </p>
);
