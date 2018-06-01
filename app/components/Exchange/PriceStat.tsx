import * as React from "react";
import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import AssetName from "../Utility/AssetName";
import { VolumnStore } from "stores/VolumeStore";
import utils from "common/utils";
import cnames from "classnames";
import ReactTooltip from "react-tooltip";
import { connect } from "alt-react";

let PriceStat = class extends React.Component<
  {
    base;
    quote;
    hideQuote?;
    hideBase?;
    price;
    content?;
    ready;
    value?;
    valueByYuan?;
    withYuan?;
    volume?;
    volume2?;
    toolTip?;
    className?;
  },
  { change }
> {
  constructor(props) {
    super(props);
    this.state = {
      change: null
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.volume2 && nextProps.volume2 !== this.props.volume2) {
      return true;
    }
    return (
      nextProps.price !== this.props.price ||
      nextProps.ready !== this.props.ready
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && this.props.ready) {
      this.setState({
        change: parseFloat(nextProps.price) - parseFloat(this.props.price)
      });
    } else {
      this.setState({ change: 0 });
    }
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    let {
      base,
      quote,
      hideQuote,
      hideBase,
      price,
      content,
      ready,
      value,
      valueByYuan,
      volume,
      volume2,
      withYuan,
      toolTip
    } = this.props;
    let { change } = this.state;
    let changeClass = null;
    if (change && change !== null) {
      changeClass = change > 0 ? "change-up" : "change-down";
    }

    let value2 = volume2 ? utils.format_volume(volume2) : null;

    let changeComp = !change ? null : change !== null ? (
      <span className={changeClass}>
        &nbsp;{changeClass === "change-up" ? (
          <span>&#8593;</span>
        ) : (
          <span>&#8595;</span>
        )}
      </span>
    ) : null;

    return (
      <li
        className={cnames("stat", this.props.className)}
        data-place="bottom"
        data-tip={toolTip}
      >
        <span>
          {content && <Translate content={content} />}
          {content && <br />}
          <b className={`value stat-primary ${hideBase ? changeClass : ""}`}>
            {!ready ? 0 : value}&nbsp;
            {!hideBase && changeComp}
          </b>
          <span className="symbol-text">
            {!hideBase && <AssetName name={base.get("symbol")} />}
            {!hideQuote && quote && !volume ? (
              <span>
                /<AssetName name={quote.get("symbol")} />
              </span>
            ) : null}
          </span>
        </span>
        {typeof volume2 === "number" ? (
          <span>
            <span />
            <b className="value stat-primary">
              {!ready ? 0 : <span> / {value2}</span>}&nbsp;
              {changeComp}
            </b>
            <span className="symbol-text">
              <AssetName name={quote.get("symbol")} />
            </span>
          </span>
        ) : null}
        {withYuan &&
          !isNaN(valueByYuan) && (
            <span>
              <span />
              {!hideBase && " / "}
              <b className="value stat-primary">
                <span className="symbol-text">¥</span>
                {!ready ? 0 : <span> {valueByYuan}</span>}&nbsp;
              </b>
            </span>
          )}
      </li>
    );
  }
};

PriceStat: PriceStat = connect(
  PriceStat,
  {
    listenTo() {
      return [VolumnStore];
    },
    getProps(props) {
      let { volume, price, quote, base } = props;
      let value = !volume
        ? utils.price_text(price, quote, base)
        : utils.format_volume(price);
      let symbolName = utils.replaceName(base.get("symbol"), false).name;
      let unitYuan = VolumnStore.getState().priceState[symbolName];
      let valueByYuan = unitYuan
        ? parseFloat((value * unitYuan).toFixed(2))
        : NaN;
      return {
        value,
        valueByYuan
      };
    }
  }
);

export { PriceStat };
export default PriceStat;
