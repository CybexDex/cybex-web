import * as React from "react";
import { VolumnActions } from "actions/VolumeActions";
import ReactTooltip from "react-tooltip";
import Translate from "react-translate-component";

export class VolumeDisplay extends React.Component<any, any> {
  subscription;
  componentDidMount() {
    VolumnActions.queryVol();
    this.subscription = setInterval(() => {
      VolumnActions.queryVol();
    }, 20 * 1000);
  }
  componentWillUnmount() {
    if (this.subscription) {
      clearInterval(this.subscription);
    }
  }
  render() {
    let { vol } = this.props;
    return (
      <div
        className="volume-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "1em"
        }}
      >
        <div
          className="toggle tooltip"
          style={{
            fontWeight: "bold",
            fontSize: "90%"
          }}
          data-tip
          data-for="volumeDetails"
          data-place="bottom"
          // data-type="light"
        >
          <Translate content="header.volume" />
          <a href="javascript:;">{vol.sum.toFixed(6) + " ETH"}</a>
        </div>
        <ReactTooltip id="volumeDetails" delayHide={500} effect="solid">
          <table id="" className="status-table">
            {vol.details.filter(vol => vol.volByEther > 0).map(vol => (
              <tr key={vol.asset}>
                <td className="status-title text-left">{vol.asset}</td>
                <td className="status-content text-right">
                  {vol.volByEther.toFixed(6)}
                </td>
              </tr>
            ))}

            <tr className="border-top" />
          </table>
        </ReactTooltip>
      </div>
    );
  }
}

export default VolumeDisplay;
