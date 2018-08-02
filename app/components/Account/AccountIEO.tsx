import * as React from "react";
import * as counterpart from "counterpart";

import Fetch from "react-fetch-component";
import IntlStore from "stores/IntlStore";
import LoadingIndicator from "components/LoadingIndicator";
import utils from "common/utils";

import { API_URL, getTradeUrl } from "services/IEOService";
import { Link } from "react-router-dom";
import { connect, supplyFluxContext } from "alt-react";
import { Table } from "components/Common/Table";
import DateTime from "components/Common/DateTime";
import ReactTooltip from "react-tooltip";

const ReasonsType = {
  "1": "invalid_sub",
  "2": "invalid_sub",
  "3": "invalid_sub",
  "4": "invalid_sub",
  "5": "invalid_sub",
  "6": "invalid_sub",
  "7": "invalid_sub",
  "8": "invalid_sub",
  "9": "invalid_sub",
  "10": "invalid_sub",
  "11": "invalid_sub",
  "12": "invalid_partly_sub",
  "13": "invalid_partly_sub",
  "14": "invalid_partly_sub",
  "15": "valid_sub",
  "16": "refund"
};

let AccountIEO = class extends React.Component<{ account }, {}> {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  _renderTable(data, loading) {
    return (
      <Table
        data={data}
        loading={loading}
        noDataText={counterpart.translate("eto.records.no_data")}
        columns={[
          {
            Header: counterpart.translate("eto.records.project_id"),
            accessor: (d: ETO.ETORecord) => d.project_name,
            id: "project_id"
          },
          {
            Header: counterpart.translate("eto.records.ieo_type"),
            accessor: (d: ETO.ETORecord) =>
              counterpart.translate(`eto.records.fund_type.${d.ieo_type}`),
            id: "ieo_type"
          },
          {
            Header: counterpart.translate("eto.records.token"),
            accessor: (d: ETO.ETORecord) => utils.replaceName(d.token).name,
            id: "token"
          },
          {
            Header: counterpart.translate("eto.records.token_count"),
            accessor: (d: ETO.ETORecord) => d.token_count,
            id: "token_count"
          },
          {
            Header: counterpart.translate("eto.records.ieo_status"),
            accessor: (d: ETO.ETORecord) =>
              counterpart.translate(
                `eto.records.status_${ReasonsType[d.reason]}`
              ),
            id: "ieo_status"
          },
          {
            Header: counterpart.translate("eto.records.update_at"),
            accessor: (d: ETO.ETORecord) => d.update_at,
            id: "update_at",
            Cell: row => (
              <DateTime
                id={row.original.id}
                dateTime={row.original.update_at}
              />
            )
          },
          {
            Header: counterpart.translate("eto.records.block_num"),
            accessor: (d: ETO.ETORecord) => d.block_num,
            id: "block_num",
            Cell: row => (
              <Link to={`/block/${row.original.block_num}`}>
                {row.original.block_num}
              </Link>
            )
          }
        ]}
      />
    );
  }

  render() {
    let { account } = this.props;
    return (
      <>
        <Fetch url={getTradeUrl(account.get("name"))}>
          {({ loading, error, data }) => (
            <div className="cybex-records">
              {data && this._renderTable(data.result.data, loading)}
              {error && this._renderTable([], loading)}
              {loading && (
                <div className="text-center">
                  <span>
                    <LoadingIndicator
                      type="circle"
                      style={{ display: "inline-block" }}
                    />
                  </span>
                </div>
              )}
            </div>
          )}
        </Fetch>
      </>
    );
  }
};

AccountIEO = connect(
  AccountIEO,
  {
    listenTo: () => [IntlStore]
  }
);

export { AccountIEO };
