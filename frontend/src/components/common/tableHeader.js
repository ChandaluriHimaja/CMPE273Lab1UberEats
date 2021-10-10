import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };
    sortColumn =
      path === sortColumn.path
        ? {
            path,
            order: sortColumn.order === "asc" ? "desc" : "asc",
          }
        : { path, order: "asc" };
    console.log("SorthingString: ", sortColumn);
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return null;
    if (order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
