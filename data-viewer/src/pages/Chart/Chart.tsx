import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Props = {
  selectedTab?: string;
};

const Chart: React.FC<Props> = ({ selectedTab }) => {
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
      style={{
        height: "85%",
        width: "85%",
        position: "absolute",
        top: "74px",
        left: "250px",
        border: "1px solid #bbbbbb",
        borderRadius: "10px",
      }}
    >
      {/* <AgGridReact rowData={rowData} columnDefs={colDefs} />
      <AgCharts options={chartOptions} /> */}
    </div>
  );
};

export default Chart;
