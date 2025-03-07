import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Chart: React.FC = () => {
  const rowData = [
    { name: "Tanmay", age: 25 },
    { name: "Zalki", age: 30 },
  ];

  const colDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
  ];

  const chartOptions = {
    data: rowData,
    series: [{ type: "bar", xKey: "name", yKey: "age" }],
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "300px", width: "600px" }}
    >
      {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}
      {/* <AgCharts options={chartOptions} /> */}
    </div>
  );
};

export default Chart;
