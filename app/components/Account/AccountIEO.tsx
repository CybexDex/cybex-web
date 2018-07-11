import * as React from "react";
// import { FetchDemo } from "components/Common/Fetch";
import Fetch from "react-fetch-component";
import { API_URL, getTradeUrl } from "services/IEOService";
import LoadingIndicator from "components/LoadingIndicator";
import { Table } from "components/Common/Table";

let AccountIEO = class extends React.Component<{ account }, {}> {
  render() {
    let { account } = this.props;
    return (
      <>
        <Fetch
          url={getTradeUrl(account.get("name"))}
        >
          {({ loading, error, data }) => (
            <div className="cybex-records">
              {data && (
                <Table
                  data={data.result.data}
                  columns={[
                    {
                      Header: "Name",
                      accessor: d => d.id,
                      id: "project-name"
                    }
                  ]}
                />
              )}
              {error && JSON.stringify(error)}
              {loading && <LoadingIndicator type="circle" />}
            </div>
          )}
        </Fetch>
      </>
    );
  }
};

export { AccountIEO };
