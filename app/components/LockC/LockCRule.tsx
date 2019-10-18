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
    <p style={{ paddingBottom: 10, marginBottom: "0" }}>
      <span style={{ color: Colors.$colorFlame }}>*</span>
      <small style={{ fontSize: "11px" }}>{counterpart.translate("lockC.lockup.rule_table_title")}</small>
    </p>
    <table style={{ width: "100%", marginLeft: 10, marginRight: 10 }}>
      <tbody>
        <tr>
          <td style={{ fontSize: "1.1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>
            {counterpart.translate("lockC.lockup.table_title1")}
          </td>
          <td style={{ fontSize: "1.1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>
            {counterpart.translate("lockC.lockup.table_title2")}
          </td>
          <td style={{ fontSize: "1.1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>
            {counterpart.translate("lockC.lockup.table_title3")}
          </td>
          <td style={{ fontSize: "1.1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>
            {counterpart.translate("lockC.lockup.table_title4")}
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>1-10</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>50%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>35%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>15%</td>
        </tr>
        <tr>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>11-50</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>80%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>60%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 5 }}>20%</td>
        </tr>
        <tr>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 10 }}>50+</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 10 }}>100%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 10 }}>70%</td>
          <td style={{ fontSize: "1rem", fontWeight: "bolod", paddingTop: 5, paddingBottom: 10 }}>30%</td>
        </tr>
        {/* <tr>
          <td style={{ color: Colors.$colorFlameLight, height: "24px" }}>
            {counterpart.translate("lockC.lockup.rule_example_title")}:{" "}
          </td>
          <Translate content="lockC.lockup.rule_example_0" unsafe />
        </tr>
        <tr>
          <td style={{ height: "24px" }} />
          <Translate content="lockC.lockup.rule_example_1" unsafe />
        </tr>
        <tr>
          <td style={{ height: "24px" }} />
          <Translate content="lockC.lockup.rule_example_2" unsafe />
        </tr> */}
      </tbody>
    </table>
    <p style={{ paddingBottom: 5, marginBottom: "0" }}>
      <span style={{ color: Colors.$colorFlame }}>*</span>
      <small style={{ fontSize: "11px" }}>{counterpart.translate("lockC.lockup.rule_table_last")}</small>
    </p>
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
