import * as React from "react";
import { withRouter } from "react-router-dom";
import counterpart from "counterpart";
import { Input, Checkbox, Button, Colors } from "../Common";
import { EtoPanel } from "./EtoPanel";
import { EtoFlow } from "./EtoFlow";
import Translate from "react-translate-component";
import { EtoActions } from "../../actions/EtoActions";
import { Eto } from "../../services/eto";
import { EtoExplain } from "./EtoRule";

export const EtoCenterSummary = ({ etoState }: { etoState: Eto.EtoInfo }) => {
  return (
    <div>
      <h3>
        {counterpart.translate("eto_apply.center.greeting", {
          account: etoState.info && etoState.info.accountName
        })}
      </h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>{counterpart.translate("eto_apply.center.token")}</p>
          <h2>{etoState.info && etoState.info.token}</h2>
        </div>
        <div>
          <p>{counterpart.translate("eto_apply.center.total")}</p>
          <h2>{etoState.info && etoState.sum}</h2>
        </div>
      </div>
    </div>
  );
};

export const EtoCenter = (props: any) => {
  return (
    <>
      <EtoPanel>
        <EtoCenterSummary {...props} />
        <div className="btn-wrapper">
          <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              EtoActions.setApplyDone();
              props.history.push("/eto/lock");
            }}
            style={{ width: "50%" }}
          >
            {counterpart.translate("eto_apply.center.go_lock")}
          </Button>
          <Button
            type="secondary"
            // loading={this.state.checking}
            onClick={() => {
              EtoActions.setApplyDone();
              props.history.push("/market/CYB_JADE.ETH");
            }}
            style={{ width: "50%" }}
          >
            {counterpart.translate("eto_apply.center.go_trade")}
          </Button>
        </div>
      </EtoPanel>
      <EtoFlow center />
      <EtoExplain />
    </>
  );
};
