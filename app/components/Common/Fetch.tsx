import * as React from "react";
import Fetch from "react-fetch-component";
import { API_URL } from "services/IEOService";
import LoadingIndicator from "components/LoadingIndicator";
import ReactTable from "react-table";

let FetchDemo = class extends React.Component<{}, {}> {
  render() {
    return (
      <Fetch url={API_URL}>
        {({ loading, error, data }) => (
          <div>
            {data && JSON.stringify(data)}
            {error && JSON.stringify(error)}
            {loading && <LoadingIndicator type="circle" />}
          </div>
        )}
      </Fetch>
    );
  }
};

export { FetchDemo };
export default FetchDemo;
