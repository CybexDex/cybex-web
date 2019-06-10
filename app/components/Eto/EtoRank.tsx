import * as React from "react";
import { EtoPanel, EtoContentWrapper } from "./EtoPanel";
import { EtoActions } from "../../actions/EtoActions";
import { connect } from "alt-react";
import { EtoStore, EtoState } from "../../stores/EtoStore";
import Translate from "react-translate-component";
import { Eto } from "../../services/eto";
const { useEffect, useState } = React;
import counterpart from "counterpart";

enum RankType {
  Lock,
  CoinAge
}

const RankTypeOptions = [
  { lable: "eto_apply.rank_type_lock", type: RankType.Lock },
  { lable: "eto_apply.rank_type_age", type: RankType.CoinAge }
];

const RankTable = ({
  data,
  type
}: {
  data: [string, number][];
  type: RankType;
}) => (
  <table style={{ width: "100%" }}>
    <thead>
      <tr style={{ fontSize: "12px", color: "rgba(120,129,154, 0.5)" }}>
        <Translate
          component="th"
          style={{
            width: "28px",
            height: "40px",
            textAlign: "center",
            padding: "4px 8px"
          }}
          content="eto_apply.ranking"
        />
        <Translate
          component="th"
          style={{ textAlign: "left", padding: "4px 8px" }}
          content="eto_apply.account_name"
        />
        <Translate
          component="th"
          style={{ textAlign: "right", padding: "4px 8px" }}
          content={
            type === RankType.Lock
              ? "eto_apply.lock_amount"
              : "eto_apply.coin_age"
          }
        />
      </tr>
    </thead>
    <tbody>
      {data.map((user, i) => (
        <tr key={i} style={{ fontSize: "14px" }}>
          <td
            className="color-success"
            style={{
              background: "rgb(27,34,48)",
              width: "15%",
              textAlign: "center",
              padding: "4px 8px",
              fontWeight: "bold",
              boxShadow: "inset 0 1px 0 0 rgb(23,29,42)",
              height: "48px"
            }}
          >
            {i + 1}
          </td>
          <td
            style={{
              background: "rgb(27,34,48)",
              padding: "4px 8px",
              boxShadow: "inset 0 1px 0 0 rgb(23,29,42)"
            }}
          >
            {user[0]}
          </td>
          <td
            style={{
              background: "rgb(27,34,48)",
              textAlign: "right",
              padding: "4px 8px",
              boxShadow: "inset 0 1px 0 0 rgb(23,29,42)"
            }}
          >
            {(Intl && Intl.NumberFormat().format(user[1])) || user[1]}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

let EtoRank = ({
  rank,
  state,
  history
}: {
  rank: Eto.Rank | null;
  state: EtoState;
  [other: string]: any;
}) => {
  const [type, setType] = useState(RankType.Lock);

  useEffect(() => {
    if (state.state === Eto.EtoPersonalState.Uninit) {
      history.push("/eto");
    } else {
      EtoActions.queryRank();
    }
  }, []);
  return (
    <>
      <div className="grid-container show-for-small-only">
        <div className="rank-selection text-center" style={{ margin: "12px" }}>
          <div
            className="btn-group"
            style={{
              display: "inline-block",
              margin: "auto",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: "rgb(120,129,154)"
            }}
          >
            {RankTypeOptions.map(op => (
              <button
                style={{
                  height: "30px",
                  fontSize: "12px",
                  padding: "0 18px",
                  background:
                    type === op.type ? "rgb(120,129,154)" : "transparent",
                  color: type === op.type ? "white" : "rgb(120,129,154)"
                }}
                onClick={() => setType(op.type)}
              >
                {counterpart.translate(op.lable)}
              </button>
            ))}
          </div>
        </div>
        {/* <EtoPanel style={{ marginBottom: "12px" }}> */}
        {rank && rank.lock && (
          <RankTable
            data={type === RankType.Lock ? rank.lock : rank.coinAge}
            type={type}
          />
        )}
        {/* </EtoPanel> */}
      </div>
      <div className="grid-container hide-for-small-only">
        <div style={{ padding: "6px" }} />
        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            className="column small-12 medium-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <EtoContentWrapper>
              <Translate component="h5" content="eto_apply.rank_type_lock" />
            </EtoContentWrapper>
            <EtoPanel style={{ marginBottom: "12px" }}>
              {rank && rank.lock && (
                <RankTable data={rank.lock} type={RankType.Lock} />
              )}
            </EtoPanel>
          </div>
          <div
            className="column small-12 medium-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <EtoContentWrapper>
              <Translate component="h5" content="eto_apply.rank_type_age" />
            </EtoContentWrapper>

            <EtoPanel style={{ marginBottom: "12px" }}>
              {rank && rank.lock && (
                <RankTable data={rank.coinAge} type={RankType.CoinAge} />
              )}
            </EtoPanel>
          </div>
        </div>
      </div>
    </>
  );
};
EtoRank = connect(
  EtoRank,
  {
    listenTo() {
      return [EtoStore];
    },
    getProps() {
      console.debug("EtoRank: ", EtoStore.getState().rank);
      return {
        rank: EtoStore.getState().rank,
        state: EtoStore.getState()
      };
    }
  }
) as any;
export { EtoRank };
export default EtoRank;
