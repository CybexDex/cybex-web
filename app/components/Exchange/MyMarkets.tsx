import * as React from "react";
import * as PropTypes from "prop-types";
import * as Immutable from "immutable";
import utils from "common/utils";
import Translate from "react-translate-component";
import { connect } from "alt-react";
import MarketRow from "./MarketRow";
import SettingsStore from "stores/SettingsStore";
import MarketsStore from "stores/MarketsStore";
import IntlStore from "stores/IntlStore";
import AssetStore from "stores/AssetStore";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import AssetName from "../Utility/AssetName";
import SettingsActions from "actions/SettingsActions";
import AssetActions from "actions/AssetActions";
import MarketsActions from "actions/MarketsActions";
import cnames from "classnames";
import { debounce } from "lodash";
import AssetSelector from "../Utility/AssetSelector";
import counterpart from "counterpart";
import LoadingIndicator from "../LoadingIndicator";
import { Checkbox, Icon, FlexGrowDivider, TabLink } from "components/Common";
import AltContainer from "alt-container";

let lastLookup = new Date();

// Tempoary for GET
const SpecialMarkets = {
  "JADE.USDT": {
    CYB: 0,
    "JADE.ETH": 1,
    "JADE.BTC": 2,
    "JADE.EOS": 3,
    "JADE.LTC": 4
  }
};

const BTC_MARKETS = [
  "JADE.MT",
  "JADE.ETH",
  "JADE.BTC",
  "JADE.EOS",
  "JADE.INK",
  "JADE.BAT",
  "JADE.VET",
  "JADE.OMG",
  "JADE.SNT",
  "JADE.NAS",
  "JADE.KNC",
  "JADE.PAY",
  "JADE.GET",
  "JADE.MAD",
  "JADE.GNX",
  "JADE.KEY",
  "JADE.TCT",
  "JADE.CENNZ",
  // "JADE.NASH",
  "JADE.JCT",
  "JADE.MCO",
  // "JADE.HER",
  "JADE.CTXC",
  "JADE.NES",
  "JADE.RHOC",
  "JADE.PPT",
  "JADE.MKR",
  "JADE.FUN",
  // "JADE.SDT",
  "JADE.GNT",
  // "JADE.NKN",
  "JADE.MVP",
  // "JADE.ICX",
  // "JADE.BTM",
  "JADE.DPY"
  // "JADE.ENG"
];
const FilteredMarkets = {
  CYB: new Set(["JADE.JCT"]),
  "JADE.ETH": new Set(["JADE.LTC"]),
  "JADE.EOS": new Set(["JADE.LTC"]),
  "JADE.BTC": new Set(BTC_MARKETS)
  // "JADE.USDT": new Set(["JADE.LTC"])
};
const FixedMarkets = {
  // CYB: { "JADE.MVP": -1 },
  "JADE.ETH": { "JADE.JCT": -1 }
  // "JADE.BTC": { "JADE.MVP": -1 },
  // "JADE.EOS": { "JADE.MVP": -1 }
};

export class MarketGroup extends React.Component<any, any> {
  static defaultProps = {
    maxRows: 20
  };

  constructor(props) {
    super(props);
    this.state = this._getInitialState(props);
  }

  _getInitialState(props) {
    let open = props.findMarketTab
      ? true
      : props.viewSettings.get(`myMarketsBase_${props.index}`);
    return {
      open: open !== undefined ? open : true,
      inverseSort: props.viewSettings.get("myMarketsInvert", true),
      sortBy: props.viewSettings.get("myMarketsSort", "volume")
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.findMarketTab !== this.props.findMarketTab) {
      this.setState(this._getInitialState(nextProps));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.markets || !this.props.markets) {
      return true;
    }
    return (
      !utils.are_equal_shallow(nextState, this.state) ||
      !utils.are_equal_shallow(nextProps.markets, this.props.markets) ||
      nextProps.starredMarkets !== this.props.starredMarkets ||
      nextProps.marketStats !== this.props.marketStats ||
      nextProps.userMarkets !== this.props.userMarkets
    );
  }

  _inverseSort() {
    SettingsActions.changeViewSetting({
      myMarketsInvert: !this.state.myMarketsInvert
    });
    this.setState({
      inverseSort: !this.state.inverseSort
    });
  }

  _changeSort(type) {
    if (type !== this.state.sortBy) {
      SettingsActions.changeViewSetting({
        myMarketsSort: type
      });
      this.setState({
        sortBy: type
      });
    } else {
      this._inverseSort();
    }
  }

  // _onSelectBase(e) {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     SettingsActions.changeBase(this.props.index, e.target.value);
  // }

  _onToggle(e) {
    if (!this.props.findMarketTab) {
      let open = !this.state.open;
      this.setState({
        open: open
      });

      let setting = {};
      setting[`myMarketsBase_${this.props.index}`] = open;
      SettingsActions.changeViewSetting(setting);
    }
  }

  _onToggleUserMarket(market) {
    let [base, quote] = market.split("_");
    let newValue = !this.props.userMarkets.get(market);
    SettingsActions.setUserMarket(base, quote, newValue);
  }

  render() {
    let {
      columns,
      markets,
      base,
      marketStats,
      starredMarkets,
      current,
      findMarketTab
    } = this.props;
    let { sortBy, inverseSort, open } = this.state;

    if (!markets || !markets.length) {
      return null;
    }

    let headers = columns.map(header => {
      switch (header.name) {
        case "market":
          return (
            <span
              key={header.name}
              className="clickable"
              onClick={this._changeSort.bind(this, "name")}
            >
              <Translate content="exchange.market" />
            </span>
          );

        case "vol":
          return (
            <span
              key={header.name}
              className="clickable"
              onClick={this._changeSort.bind(this, "volume")}
              style={{ textAlign: "right" }}
            >
              <Translate content="exchange.vol_short" />
            </span>
          );

        case "price":
          return (
            <span key={header.name} style={{ textAlign: "right" }}>
              <Translate content="exchange.price" />
            </span>
          );

        case "quoteSupply":
          return (
            <span key={header.name}>
              <Translate content="exchange.quote_supply" />
            </span>
          );

        case "baseSupply":
          return (
            <span key={header.name}>
              <Translate content="exchange.base_supply" />
            </span>
          );

        case "change":
          return (
            <span
              key={header.name}
              className="clickable"
              onClick={this._changeSort.bind(this, "change")}
              style={{ textAlign: "right" }}
            >
              <Translate content="exchange.change" />
            </span>
          );

        case "issuer":
          return (
            <span key={header.name}>
              <Translate content="explorer.assets.issuer" />
            </span>
          );

        case "add":
          return <span key={header.name} />;

        default:
          return <span key={header.name} />;
      }
    });

    let index = 0;

    let marketRows = markets
      .map(market => {
        return (
          <MarketRow
            key={market.id}
            withYuan
            name={
              base === "others" ? (
                <span>
                  <AssetName name={market.quote} />:<AssetName
                    name={market.base}
                  />
                </span>
              ) : (
                <AssetName dataPlace="left" name={market.quote} />
              )
            }
            quote={market.quote}
            base={market.base}
            columns={columns}
            // leftAlign={true}
            hideZeroVol={true}
            compact={true}
            noSymbols={true}
            stats={marketStats.get(market.id)}
            starred={starredMarkets.has(market.id)}
            current={current === market.id}
            isChecked={this.props.userMarkets.has(market.id)}
            isDefault={
              this.props.defaultMarkets &&
              this.props.defaultMarkets.has(market.id)
            }
            onCheckMarket={this._onToggleUserMarket.bind(this)}
          />
        );
      })
      .filter(a => {
        return a !== null;
      })
      .filter(a => {
        return a.props.base in FilteredMarkets
          ? !FilteredMarkets[a.props.base].has(a.props.quote)
          : a;
      })
      .filter(a => {
        return a.props.base in SpecialMarkets
          ? a.props.quote in SpecialMarkets[a.props.base]
          : a;
      })
      .sort((a, b) => {
        if (a.props.base in SpecialMarkets) {
          return (
            SpecialMarkets[a.props.base][a.props.quote] -
            SpecialMarkets[a.props.base][b.props.quote]
          );
        }
        if (
          a.props.base in FixedMarkets &&
          (a.props.quote in FixedMarkets[a.props.base] ||
            b.props.quote in FixedMarkets[a.props.base])
        ) {
          return a.props.quote in FixedMarkets[a.props.base] ? -1 : 1;
        }
        let a_symbols = a.key.split("_");
        let b_symbols = b.key.split("_");
        let aStats = marketStats.get(a_symbols[0] + "_" + a_symbols[1]);
        let bStats = marketStats.get(b_symbols[0] + "_" + b_symbols[1]);

        switch (sortBy) {
          case "name":
            if (
              utils.replaceName(a_symbols[0]).name >
              utils.replaceName(b_symbols[0]).name
            ) {
              return inverseSort ? -1 : 1;
            } else if (a_symbols[0] < b_symbols[0]) {
              return inverseSort ? 1 : -1;
            } else {
              if (
                utils.replaceName(a_symbols[1]).name >
                utils.replaceName(b_symbols[1]).name
              ) {
                return inverseSort ? -1 : 1;
              } else if (
                utils.replaceName(a_symbols[1]).name <
                utils.replaceName(b_symbols[1]).name
              ) {
                return inverseSort ? 1 : -1;
              } else {
                return 0;
              }
            }

          case "volume":
            if (aStats && bStats) {
              if (inverseSort) {
                return bStats.volumeBase - aStats.volumeBase;
              } else {
                return aStats.volumeBase - bStats.volumeBase;
              }
            } else {
              return 0;
            }

          case "change":
            if (aStats && bStats) {
              if (inverseSort) {
                return bStats.change - aStats.change;
              } else {
                return aStats.change - bStats.change;
              }
            } else {
              return 0;
            }
        }
      })

    let caret = open ? <span>&#9660;</span> : <span>&#9650;</span>;

    return (
      open && <>
        <div className="table table-hover">
          <div className="table-row" style={{ paddingRight: "10px" }}>
            {headers}
          </div>
        </div>
        <div
          className="table table-hover _scroll-bar"
          style={{ overflowY: "auto", paddingRight: "4px" }}
        >
          {marketRows}
        </div>
      </>
    );
  }
}

let MyMarkets = class extends React.Component<any, any> {
  getAssetList = debounce(AssetActions.getAssetList.defer, 150);

  static propTypes = {
    core: ChainTypes.ChainAsset.isRequired
  };

  static defaultProps = {
    activeTab: "my-market",
    core: "1.3.0",
    setMinWidth: false
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  filterName: any;

  constructor(props) {
    super(props);

    let inputValue = null; // props.viewSettings.get("marketLookupInput", null);
    let symbols = inputValue ? inputValue.split(":") : [null];
    let quote = symbols[0];
    let base = symbols.length === 2 ? symbols[1] : null;
    this.state = {
      inverseSort: props.viewSettings.get("myMarketsInvert", true),
      sortBy: props.viewSettings.get("myMarketsSort", "volume"),
      activeTab: props.viewSettings.get("favMarketTab", "my-market"),
      activeMarketTab: props.viewSettings.get("activeMarketTab", 0),
      lookupQuote: quote,
      lookupBase: base,
      inputValue: inputValue,
      minWidth: "100%",
      findBaseInput: "USD",
      activeFindBase: "USD"
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* Trigger a lookup when switching tabs to find-market */
    if (
      this.state.activeTab !== "find-market" &&
      nextState.activeTab === "find-market" &&
      !nextProps.searchAssets.size
    ) {
      this._lookupAssets("OPEN.", true);
    }
    return (
      !Immutable.is(nextProps.searchAssets, this.props.searchAssets) ||
      !Immutable.is(nextProps.markets, this.props.markets) ||
      !Immutable.is(nextProps.starredMarkets, this.props.starredMarkets) ||
      !Immutable.is(nextProps.defaultMarkets, this.props.defaultMarkets) ||
      !Immutable.is(nextProps.marketStats, this.props.marketStats) ||
      !utils.are_equal_shallow(nextState, this.state) ||
      nextProps.locale !== this.props.locale ||
      nextProps.current !== this.props.current ||
      nextProps.minWidth !== this.props.minWidth ||
      nextProps.listHeight !== this.props.listHeight ||
      nextProps.preferredBases !== this.props.preferredBases ||
      nextProps.onlyStars !== this.props.onlyStars ||
      nextProps.assetsLoading !== this.props.assetsLoading ||
      nextProps.userMarkets !== this.props.userMarkets
    );
  }

  componentDidMount() {
    let historyContainer = this.refs.favorites;

    if (this.state.activeTab === "find-market") {
      this._lookupAssets("OPEN.", true);
    }
  }

  _inverseSort() {
    SettingsActions.changeViewSetting({
      myMarketsInvert: !this.state.myMarketsInvert
    });
    this.setState({
      inverseSort: !this.state.inverseSort
    });
  }

  _changeSort(type) {
    if (type !== this.state.sortBy) {
      SettingsActions.changeViewSetting({
        myMarketsSort: type
      });
      this.setState({
        sortBy: type
      });
    } else {
      this._inverseSort();
    }
  }

  _goMarkets() {
    this.context.router.history.push("/markets");
  }

  _changeTab(tab) {
    SettingsActions.changeViewSetting({
      favMarketTab: tab
    });
    this.setState({
      activeTab: tab
    });
  }

  _onInputName(e) {
    let inputValue = e.target.value.toUpperCase();
    this.setState({
      inputValue
    });

    this._lookupAssets(inputValue);
  }

  _lookupAssets(value, force = false) {
    console.log("__lookupAssets", value, force);
    if (!value && value !== "") {
      return;
    }
    let now = new Date();

    let symbols = value.toUpperCase().split(":");
    let quote = symbols[0];
    let base = symbols.length === 2 ? symbols[1] : null;

    this.setState({
      lookupQuote: quote,
      lookupBase: base
    });

    SettingsActions.changeViewSetting.defer({
      marketLookupInput: value.toUpperCase()
    });

    if (this.state.lookupQuote !== quote || force) {
      if (quote.length < 1 || (now as any) - (lastLookup as any) <= 250) {
        return false;
      }
      // this.getAssetList(quote, 50);
    } else {
      if (base && this.state.lookupBase !== base) {
        if (base.length < 1 || (now as any) - (lastLookup as any) <= 250) {
          return false;
        }
        this.getAssetList(base, 50);
      }
    }
  }

  toggleActiveMarketTab(index) {
    SettingsActions.changeViewSetting({
      activeMarketTab: index
    });

    this.setState({
      activeMarketTab: index
    });
  }

  _onInputBaseAsset(asset) {
    this.setState({
      findBaseInput: asset.toUpperCase(),
      error: null
    });
  }

  _onFoundBaseAsset(asset) {
    if (asset) {
      this.setState({ activeFindBase: asset.get("symbol") });
    }
  }

  _renderFindMarkets = () => {
    let defaultBases = [...this.props.preferredBases];
    return (
      <div
        className="grid-block"
        style={{
          overflow: "visible",
          width: "100%",
          textAlign: "left",
          padding: "0.75rem 0.5rem"
        }}
      >
        <AssetSelector
          onAssetSelect={this._onFoundBaseAsset.bind(this)}
          assets={defaultBases}
          className="small-12 medium-6"
          onChange={this._onInputBaseAsset.bind(this)}
          asset={this.state.findBaseInput}
          assetInput={this.state.findBaseInput}
          tabIndex={1}
          onFound={this._onFoundBaseAsset.bind(this)}
          label="exchange.base"
          noLabel
          inputStyle={{ fontSize: "0.9rem" }}
          style={{ padding: 2 }}
        />
        <div
          className="market-more small-12 medium-6"
          style={{ padding: 2, marginTop: "-1px" }}
        >
          <label>
            <Translate content="account.user_issued_assets.name" />:
          </label>
          <input
            style={{ fontSize: "0.9rem", position: "relative", top: 1 }}
            type="text"
            value={this.state.inputValue}
            onChange={this._onInputName.bind(this)}
            placeholder={counterpart.translate("exchange.search")}
          />
        </div>
      </div>
    );
  };

  render() {
    let {
      starredMarkets,
      defaultMarkets,
      marketStats,
      columns,
      searchAssets,
      assetsLoading,
      preferredBases,
      core,
      current,
      viewSettings,
      listHeight,
      onlyStars,
      userMarkets
    } = this.props;
    let { activeMarketTab, activeTab, lookupQuote, lookupBase } = this.state;
    let otherMarkets: any = <div />;
    const myMarketTab = activeTab === "my-market";

    let defaultBases = preferredBases.map(a => a);

    if (!myMarketTab) {
      preferredBases = preferredBases.clear();
      preferredBases = preferredBases.push(this.state.activeFindBase);
    }

    // Add some default base options
    // let preferredBases = [coreSymbol, "BTC", "USD", "CNY"];
    let baseGroups = {};

    let bases = [
      // coreSymbol, "BTC", "CNY", "USD"
    ];

    /* By default, show the OPEN.X assets */
    if (!lookupQuote) lookupQuote = "OPEN.";

    /* In the find-market tab, only use market tab 0 */
    if (!myMarketTab) activeMarketTab = 0;

    searchAssets
      .filter(a => {
        // Always keep core asset as an option
        // if (preferredBases.indexOf(a.symbol) === 0) {
        //     return true;
        // }
        if (lookupBase && lookupBase.length) {
          return a.symbol.indexOf(lookupBase) === 0;
        }
        return a.symbol.indexOf(lookupQuote) !== -1;
      })
      .forEach(asset => {
        if (lookupBase && lookupBase.length) {
          if (asset.symbol.indexOf(lookupBase) === 0) {
            bases.push(asset.symbol);
          }
        } else if (preferredBases.includes(asset.symbol)) {
          if (
            asset.symbol.length >= lookupQuote.length &&
            asset.symbol.length < lookupQuote.length + 3
          ) {
            bases.push(asset.symbol);
          }
        }
      });

    bases = bases.concat(
      preferredBases
        .filter(a => {
          if (!lookupBase || !lookupBase.length) {
            return true;
          }
          return a.indexOf(lookupBase) === 0;
        })
        .toArray()
    );

    bases = bases.filter(base => {
      // Always keep core asset as an option
      // if (preferredBases.indexOf(base) !== -1) {
      //     return true;
      // }
      if (lookupBase && lookupBase.length > 1) {
        return base.indexOf(lookupBase) === 0;
      } else {
        return true;
      }
    });

    let allMarkets: any = [];

    if (searchAssets.size) {
      searchAssets
        .filter(a => {
          return (
            a.symbol.indexOf(lookupQuote) !== -1 &&
            a.symbol.length >= lookupQuote.length
          );
        })
        .forEach(asset => {
          bases.forEach(base => {
            let marketID = asset.symbol + "_" + base;
            if (base !== asset.symbol) {
              allMarkets.push([marketID, { quote: asset.symbol, base: base }]);
            }
          });
        });
    }
    // console.debug("All MArkets: ", allMarkets);
    allMarkets = allMarkets.filter(a => {
      // If a base asset is specified, limit the quote asset to the exact search term
      if (lookupBase) {
        return a[1].quote === lookupQuote;
      }
      return true;
    });
    // Todo Mark for markets list
    allMarkets = Immutable.Map(allMarkets);
    let activeMarkets = myMarketTab ? defaultMarkets : allMarkets;
    // console.debug("UserMarket: ", activeMarkets.toJSON());
    if (myMarketTab && userMarkets.size) {
      userMarkets.forEach((market, key) => {
        activeMarkets = activeMarkets.set(key, market);
      });
    }

    if (activeMarkets.size > 0) {
      otherMarkets = activeMarkets
        .filter(a => {
          if (!myMarketTab) {
            if (lookupQuote.length < 1) {
              return false;
            }
            return a.quote.indexOf(lookupQuote) !== -1;
          } else {
            const ID = a.quote + "_" + a.base;
            utils.replaceName(a.quote).name;
            if (!!this.state.myMarketFilter) {
              return (
                utils
                  .replaceName(a.quote)
                  .name.indexOf(this.state.myMarketFilter) !== -1
              );
            }
            if (onlyStars && !starredMarkets.has(ID)) {
              return false;
            }
            return true;
          }
        })
        .map(market => {
          // 从Markets
          let marketID = market.quote + "_" + market.base;
          if (preferredBases.includes(market.base)) {
            // console.debug("BaseGroup: ", baseGroups);
            if (!baseGroups[market.base]) {
              baseGroups[market.base] = [];
            }
            baseGroups[market.base].push({
              id: marketID,
              quote: market.quote,
              base: market.base
            });
            return null;
          } else {
            return {
              id: marketID,
              quote: market.quote,
              base: market.base
            };
          }
        })
        .filter(a => {
          return a !== null;
        })
        .take(myMarketTab ? 100 : 20)
        .toArray();
    }
    // console.debug("Final Other Markets: ", activeMarkets.toJSON());

    let hc = "mymarkets-header clickable";
    let starClass = cnames(hc, { inactive: !myMarketTab });
    let allClass = cnames(hc, { inactive: myMarketTab });

    let listStyle: React.CSSProperties = {
      minWidth: this.state.minWidth,
      minHeight: "6rem"
    };
    if (listHeight) {
      listStyle.height = listHeight;
    }
    return <>
      <div className="grid-block shrink left-orderbook-header">
        <div
          ref="myMarkets"
          className={starClass}
          onClick={this._changeTab.bind(this, "my-market")}
        >
          <Translate content="exchange.market_name" />
        </div>
        {/* <div
            className={allClass}
            onClick={this._changeTab.bind(this, "find-market")}
          >
            <Translate content="exchange.more" />
          </div> */}
      </div>
      {this.props.controls && (
        <div className="small-12 medium-6" style={{ padding: "1rem 0" }}>
          {this.props.controls ? (
            <div style={{ paddingBottom: "0.5rem" }}>{this.props.controls}</div>
          ) : null}
          {/* {!myMarketTab ? <input type="text" value={this.state.inputValue} onChange={this._lookupAssets.bind(this)} placeholder="SYMBOL:SYMBOL" /> : null} */}
        </div>
      )}
      <ul className="mymarkets-tabs" style={{ padding: "0 0.5em" }}>
        {preferredBases.map((base, index) => {
          if (!base) return null;
          return (
            <TabLink
              style={{
                lineHeight: "1.8",
                marginRight: "1rem",
                display: "inline-block",
                height: "1.8em",
                fontWeight: "bold",
                borderBottomWidth: "2px"
              }}
              key={base}
              active={activeMarketTab === index}
              onClick={this.toggleActiveMarketTab.bind(this, index)}
            >
              <AssetName name={base} dataPlace="left" />
            </TabLink>
          );
        })}
      </ul>
      {myMarketTab ? (
        <div
          className="grid-block shrink"
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0.75rem 0.5rem"
          }}
        >
          <Checkbox
            active={this.props.onlyStars}
            onChange={() => {
              MarketsActions.toggleStars();
            }}
            labelStyle={{ alignItems: "center" }}
          >
            <Translate content="exchange.show_star_2" />
            <Translate content="exchange.show_star_1" />
            <Icon icon="star" />
          </Checkbox>
          <FlexGrowDivider />
          <div className="float-right">
            <input
              style={{
                fontSize: "0.9rem",
                height: "inherit",
                padding: 2
              }}
              className="no-margin"
              type="text"
              placeholder={counterpart.translate("exchange.filter_name")}
              value={this.state.myMarketFilter}
              onChange={e => {
                this.setState({
                  myMarketFilter: e.target.value && e.target.value.toUpperCase()
                });
              }}
            />
          </div>
        </div>
      ) : (
        this._renderFindMarkets()
      )}
      <div
        style={listStyle}
        className="table-container grid-block vertical mymarkets-list"
        ref="favorites"
      >
        {assetsLoading ? (
          <div
            style={{
              position: "absolute",
              paddingTop: "3rem",
              textAlign: "center",
              width: "100%"
            }}
          >
            <LoadingIndicator type="three-bounce" />
          </div>
        ) : null}
        {preferredBases
          .filter(a => {
            return a === preferredBases.get(activeMarketTab);
          })
          .map((base, index) => {
            return (
              <MarketGroup
                userMarkets={this.props.userMarkets}
                defaultMarkets={this.props.defaultMarkets}
                index={index}
                allowChange={false}
                key={base}
                current={current}
                starredMarkets={starredMarkets}
                marketStats={marketStats}
                viewSettings={viewSettings}
                columns={
                  myMarketTab ? columns : this.props.findColumns || columns
                }
                markets={baseGroups[base]}
                base={base}
                maxRows={myMarketTab ? 20 : 10}
                findMarketTab={!myMarketTab}
              />
            );
          })}
      </div>
    </>;
  }
};
MyMarkets = BindToChainState(MyMarkets, { keep_updating: true });

class MyMarketsWrapper extends React.Component {
  render() {
    return <MyMarkets {...this.props} />;
  }
}

export default connect(
  MyMarketsWrapper,
  {
    listenTo() {
      return [SettingsStore, MarketsStore, AssetStore, IntlStore];
    },
    getProps() {
      return {
        locale: IntlStore.getState().currentLocale,
        starredMarkets: SettingsStore.getState().starredMarkets,
        defaultMarkets: SettingsStore.getState().defaultMarkets,
        viewSettings: SettingsStore.getState().viewSettings,
        preferredBases: SettingsStore.getState().preferredBases,
        marketStats: MarketsStore.getState().allMarketStats,
        userMarkets: SettingsStore.getState().userMarkets,
        searchAssets: AssetStore.getState().assets,
        onlyStars: MarketsStore.getState().onlyStars,
        assetsLoading: AssetStore.getState().assetsLoading
      };
    }
  }
);
