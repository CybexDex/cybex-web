import * as React from "react";
import classname from "classnames";
import ReactTable from "react-table";
import counterpart from "counterpart";

let Table = class extends React.Component<
  {
    data;
    columns: {
      Header: string;
      accessor: string | any;
      maxWidth?: number;
      minWidth?: number;
      id?: string;
      Cell?: (row: any) => any;
      [p: string]: any;
    }[];
    [p: string]: any;
  },
  {}
> {
  render() {
    return (
      <ReactTable
        previousText={counterpart.translate(`table.previousText`)}
        nextText={counterpart.translate(`table.nextText`)}
        loadingText={counterpart.translate(`table.loadingText`)}
        pageText={counterpart.translate(`table.pageText`)}
        ofText={counterpart.translate(`table.ofText`) + " "}
        rowsText={counterpart.translate(`table.rowsText`)}
        defaultPageSize={10}
        {...this.props}
        data={this.props.data}
        columns={this.props.columns}
        className={classname("-striped -highlight", this.props.className)}
      />
    );
  }
};

export { Table };
export default Table;
