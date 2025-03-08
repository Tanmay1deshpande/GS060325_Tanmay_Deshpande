import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AgBarSeriesOptions,
  AgCartesianAxisOptions,
  AgCartesianSeriesOptions,
  AgChartOptions,
  AgLineSeriesOptions,
} from "ag-charts-community";

type Props = {
  selectedTab?: string;
};

//Main Data-----------------------------------------------------------------------------------
const salesData = [
  { Week: "W01", GMDol: 140061.78, SalesDol: 239526.34, GMPercent: 58 },
  { Week: "W02", GMDol: 110391.21, SalesDol: 258634.6, GMPercent: 43 },
  { Week: "W03", GMDol: 101657.28, SalesDol: 263774.46, GMPercent: 39 },
  { Week: "W04", GMDol: 134341.07, SalesDol: 332652.41, GMPercent: 40 },
  { Week: "W05", GMDol: 130398.15, SalesDol: 275162.26, GMPercent: 47 },
  { Week: "W06", GMDol: 137438.96, SalesDol: 319884.6, GMPercent: 43 },
  { Week: "W07", GMDol: 116387.03, SalesDol: 252500.95, GMPercent: 46 },
  { Week: "W08", GMDol: 159070.65, SalesDol: 335894.42, GMPercent: 47 },
  { Week: "W09", GMDol: 88328.55, SalesDol: 174790.68, GMPercent: 51 },
  { Week: "W10", GMDol: 119284.46, SalesDol: 261782.66, GMPercent: 46 },
  { Week: "W11", GMDol: 130099.18, SalesDol: 292137.38, GMPercent: 45 },
  { Week: "W12", GMDol: 139360.58, SalesDol: 284207.55, GMPercent: 49 },
  { Week: "W13", GMDol: 128456.87, SalesDol: 294047.89, GMPercent: 44 },
  { Week: "W14", GMDol: 86661.91, SalesDol: 189073.83, GMPercent: 46 },
  { Week: "W15", GMDol: 151592.15, SalesDol: 271421.42, GMPercent: 56 },
  { Week: "W16", GMDol: 151686.17, SalesDol: 347732.0, GMPercent: 44 },
  { Week: "W17", GMDol: 88672.61, SalesDol: 206735.46, GMPercent: 43 },
  { Week: "W18", GMDol: 81851.01, SalesDol: 175256.89, GMPercent: 47 },
  { Week: "W19", GMDol: 117644.42, SalesDol: 257209.45, GMPercent: 46 },
  { Week: "W20", GMDol: 75460.72, SalesDol: 196483.55, GMPercent: 38 },
  { Week: "W21", GMDol: 89873.37, SalesDol: 232307.36, GMPercent: 39 },
  { Week: "W22", GMDol: 217801.24, SalesDol: 400567.98, GMPercent: 54 },
  { Week: "W23", GMDol: 80015.21, SalesDol: 187739.22, GMPercent: 43 },
  { Week: "W24", GMDol: 99365.58, SalesDol: 233854.94, GMPercent: 42 },
  { Week: "W25", GMDol: 146165.37, SalesDol: 338581.81, GMPercent: 43 },
  { Week: "W26", GMDol: 90708.15, SalesDol: 281071.52, GMPercent: 32 },
  { Week: "W27", GMDol: 180504.75, SalesDol: 276942.13, GMPercent: 65 },
  { Week: "W28", GMDol: 139442.48, SalesDol: 303695.38, GMPercent: 46 },
  { Week: "W29", GMDol: 139216.77, SalesDol: 314421.17, GMPercent: 44 },
  { Week: "W30", GMDol: 100489.04, SalesDol: 262484.91, GMPercent: 38 },
  { Week: "W31", GMDol: 152765.66, SalesDol: 316858.04, GMPercent: 48 },
  { Week: "W32", GMDol: 75704.04, SalesDol: 169452.56, GMPercent: 45 },
  { Week: "W33", GMDol: 167605.48, SalesDol: 340037.18, GMPercent: 49 },
  { Week: "W34", GMDol: 79485.96, SalesDol: 234269.32, GMPercent: 34 },
  { Week: "W35", GMDol: 119596.45, SalesDol: 256836.52, GMPercent: 47 },
  { Week: "W36", GMDol: 120675.47, SalesDol: 260032.26, GMPercent: 46 },
  { Week: "W37", GMDol: 97413.66, SalesDol: 257055.42, GMPercent: 38 },
  { Week: "W38", GMDol: 155962.01, SalesDol: 340058.58, GMPercent: 46 },
  { Week: "W39", GMDol: 37571.16, SalesDol: 161007.9, GMPercent: 23 },
  { Week: "W40", GMDol: 121974.94, SalesDol: 242047.42, GMPercent: 50 },
  { Week: "W41", GMDol: 128438.16, SalesDol: 196580.97, GMPercent: 65 },
  { Week: "W42", GMDol: 71208.94, SalesDol: 201049.32, GMPercent: 35 },
  { Week: "W43", GMDol: 128752.29, SalesDol: 293362.74, GMPercent: 44 },
  { Week: "W44", GMDol: 55866.91, SalesDol: 259462.35, GMPercent: 22 },
  { Week: "W45", GMDol: 134230.98, SalesDol: 358561.15, GMPercent: 37 },
  { Week: "W46", GMDol: 146587.86, SalesDol: 281889.16, GMPercent: 52 },
  { Week: "W47", GMDol: 73497.75, SalesDol: 209428.43, GMPercent: 35 },
  { Week: "W48", GMDol: 133371.47, SalesDol: 233990.84, GMPercent: 57 },
  { Week: "W49", GMDol: 73773.56, SalesDol: 225732.78, GMPercent: 33 },
  { Week: "W50", GMDol: 110037.62, SalesDol: 244378.2, GMPercent: 45 },
  { Week: "W51", GMDol: 96149.38, SalesDol: 266757.29, GMPercent: 36 },
  { Week: "W52", GMDol: 138093.51, SalesDol: 245570.72, GMPercent: 56 },
];

//Simple Bar Chart-----------------------------------------------------------------------------------
const basicBarSeries = [
  {
    type: "bar",
    xKey: "Week",
    yKey: "SalesDol",
    yname: "Sales Dollars",
  } as AgBarSeriesOptions,
];

//Bar and Line chart-----------------------------------------------------------------------------------
const BAR: AgBarSeriesOptions = {
  type: "bar",
  xKey: "Week",
  yKey: "SalesDol",
  yName: "Sales Dollars",
  grouped: true,
};
const LINE: AgLineSeriesOptions = {
  type: "line",
  xKey: "Week",
  yKey: "GMDol",
  yName: "GM Dollars",
};

const BAR_AND_LINE: AgCartesianSeriesOptions[] = [
  { ...BAR, type: "bar" },
  { ...LINE, type: "line" },
];

//Bar and Line chart-----------------------------------------------------------------------------------
const BAR2: AgBarSeriesOptions = {
  type: "bar",
  xKey: "Week",
  yKey: "GMDol",
  yName: "GM Dollars",
  grouped: true,
};
const LINE2: AgLineSeriesOptions = {
  type: "line",
  xKey: "Week",
  yKey: "GMPercent",
  yName: "GM Percentage",
};

const BAR_AND_LINE2: AgCartesianSeriesOptions[] = [
  { ...BAR2, type: "bar" },
  { ...LINE2, type: "line" },
];

//Dual Bar and Line chart---------------------------------------------------------------------------
const BAR3: AgBarSeriesOptions = {
  type: "bar",
  xKey: "Week",
  yKey: "GMDol",
  yName: "GM Dollars",
  grouped: true,
};

const BAR3_0: AgBarSeriesOptions = {
  type: "bar",
  xKey: "Week",
  yKey: "SalesDol",
  yName: "Sales Dollars",
  grouped: true,
};

const LINE3: AgLineSeriesOptions = {
  type: "line",
  xKey: "Week",
  yKey: "GMPercent",
  yName: "GM Percentage",
};

const BAR_AND_LINE3: AgCartesianSeriesOptions[] = [
  { ...BAR3, type: "bar" },
  { ...BAR3_0, type: "bar" },
  { ...LINE3, type: "line" },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Chart: React.FC<Props> = ({ selectedTab }) => {
  //Simple Bar Chart
  const [chartOptions, setChartOptions] = React.useState<AgChartOptions>({
    data: salesData,
    title: {
      text: "Sales Dollars per Week",
    },
    series: basicBarSeries,
  });

  //Bar and Line chart-----------------------------------------------------------------------------------
  const [chartOptions2, setChartOptions2] = React.useState<AgChartOptions>({
    data: salesData,
    title: {
      text: "Sales Dollars V/S GM Dollars",
    },
    series: BAR_AND_LINE,
  });

  //Bar and Line chart-----------------------------------------------------------------------------------
  const [chartOptions3, setChartOptions3] = React.useState<AgChartOptions>({
    data: salesData,
    title: {
      text: "GM Dollars V/S GM Percentage",
    },
    series: BAR_AND_LINE2,
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        // primary y axis
        type: "number",
        position: "left",
        keys: ["SalesDol", "GMDol"],
      },
      {
        // secondary y axis
        type: "number",
        position: "right",
        keys: ["GMPercent"],
        title: {
          text: "GM Percentage",
        },
      },
    ] as AgCartesianAxisOptions[],
  });

  //Dual Axis Bar Chart-----------------------------------------------------------------------------------
  const [chartOptions4, setChartOptions4] = React.useState<AgChartOptions>({
    data: salesData,
    title: {
      text: "Dual Axis Bar Chart",
    },
    series: BAR_AND_LINE3,
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        // primary y axis
        type: "number",
        position: "left",
        keys: ["SalesDol", "GMDol"],
        title: {
          text: "Dollars",
        },
      },
      {
        // secondary y axis
        type: "number",
        position: "right",
        keys: ["GMPercent"],
        title: {
          text: "GM Percentage",
        },
      },
    ] as AgCartesianAxisOptions[],
  });

  // ------------------------------------------------------------------------------------------------------------------------------
  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "80%",
        position: "absolute",
        top: "74px",
        left: "250px",
        border: "1px solid #bbbbbb",
        borderRadius: "10px",
      }}
    >
      <AgCharts options={chartOptions} />
      <hr />
      <AgCharts options={chartOptions2} />
      <hr />
      <AgCharts options={chartOptions3} />
      <hr />
      <AgCharts options={chartOptions4} />
    </div>
  );
};

export default Chart;
