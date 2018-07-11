import * as React from "react";
// import { FetchDemo } from "components/Common/Fetch";
import Fetch from "react-fetch-component";
import { API_URL, getTradeUrl } from "services/IEOService";
import LoadingIndicator from "components/LoadingIndicator";
import { Table } from "components/Common/Table";
import * as counterpart from "counterpart";

let AccountIEO = class extends React.Component<{ account }, {}> {
  render() {
    let { account } = this.props;
    return (
      <>
        <Fetch url={getTradeUrl(account.get("name"))}>
          {({ loading, error, data }) => (
            <div className="cybex-records">
              {data && (
                <Table
                  data={data.result.data}
                  loading={loading}
                  noDataText={counterpart.translate("ieo.records.no_data")}
                  columns={[
                    {
                      Header: counterpart.translate("ieo.records.project_id"),
                      accessor: (d: IEO.IEORecord) => d.project_id,
                      id: "project_id"
                    },
                    {
                      Header: counterpart.translate("ieo.records.ieo_type"),
                      accessor: (d: IEO.IEORecord) => d.ieo_type,
                      id: "ieo_type"
                    },
                    {
                      Header: counterpart.translate("ieo.records.token_count"),
                      accessor: (d: IEO.IEORecord) => d.token_count,
                      id: "token_count"
                    },
                    {
                      Header: counterpart.translate("ieo.records.ieo_status"),
                      accessor: (d: IEO.IEORecord) => d.ieo_status,
                      id: "ieo_status"
                    },
                    {
                      Header: counterpart.translate("ieo.records.update_at"),
                      accessor: (d: IEO.IEORecord) => d.update_at,
                      id: "update_at"
                    },
                    {
                      Header: counterpart.translate("ieo.records.block_num"),
                      accessor: (d: IEO.IEORecord) => d.block_num,
                      id: "block_num"
                    }
                  ]}
                />
              )}
              {error && JSON.stringify(error)}
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

export { AccountIEO };
