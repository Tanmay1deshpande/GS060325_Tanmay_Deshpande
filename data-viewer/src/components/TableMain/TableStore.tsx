import * as React from "react";
import "./TableMain.css";
import type {
  ColDef,
  GetRowIdParams,
  RowSelectionOptions,
  ValueFormatterParams,
} from "ag-grid-community";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import * as XLSX from "xlsx";
// import initSqlJs, { Database } from "sql.js/dist/sql-wasm.js";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  SNo: number;
  Store: string;
  City: string;
  State: string;
}

interface SkuRow {
  SKU: string;
  Price: number;
  Cost: number;
}

interface PlanRow {
  Store: string;
  SKU: string;
  Week: string;
  Sales_Units: number;
  Sales_Dollars: number;
  Cost_Dollars: number;
  GM_Dollars: number;
  GM_Percentage: number;
}

const dialogBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const rowClass = "all_row_class";
const undoRedoCellEditing = true;
const undoRedoCellEditingLimit = 20;
//Pagination
const pagination = true;
const paginationPageSize = 50;
const paginationPageSizeSelector = [10, 50, 100];

type Props = {
  selectedTab: string;
};

const TableStore: React.FC<Props> = ({ selectedTab }) => {
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
  const [fileUploaderOpen, setFileUploaderOpen] = React.useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);
  // const [db, setDb] = React.useState<Database | null>(null);
  const [queryResult, setQueryResult] = React.useState<any[]>([]);

  const handleOpen = () => setDialogBoxOpen(true);
  const handleFileUploaderOpen = () => setFileUploaderOpen(true);

  // Row Data for Store: The data to be displayed.
  const [rowDataStore, setRowDataStore] = React.useState<IRow[]>([
    {
      SNo: 1,
      Store: "San Francisco Bay Trends",
      City: "San Francisco",
      State: "CA",
    },
    { SNo: 2, Store: "Phoenix Sunwear", City: "Phoenix", State: "AZ" },
    { SNo: 3, Store: "Dallas Ranch Supply", City: "Dallas", State: "TX" },
    { SNo: 4, Store: "Atlanta Outfitters", City: "Atlanta", State: "GA" },
    {
      SNo: 5,
      Store: "Nashville Melody Music Store",
      City: "Nashville",
      State: "TN",
    },
    { SNo: 6, Store: "New York Empire Eats", City: "New York", State: "NY" },
    { SNo: 7, Store: "Denver Peaks Outdoor", City: "Denver", State: "CO" },
    {
      SNo: 8,
      Store: "Philadelphia Liberty Market",
      City: "Philadelphia",
      State: "PA",
    },
    { SNo: 9, Store: "Boston Harbor Books", City: "Boston", State: "MA" },
    { SNo: 10, Store: "Austin Vibe Co.", City: "Austin", State: "TX" },
    { SNo: 11, Store: "Los Angeles Luxe", City: "Los Angeles", State: "CA" },
    { SNo: 12, Store: "Houston Harvest Market", City: "Houston", State: "TX" },
    {
      SNo: 13,
      Store: "Portland Evergreen Goods",
      City: "Portland",
      State: "OR",
    },
    { SNo: 14, Store: "Chicago Charm Boutique", City: "Chicago", State: "IL" },
    {
      SNo: 15,
      Store: "Las Vegas Neon Treasures",
      City: "Las Vegas",
      State: "NV",
    },
    { SNo: 16, Store: "Seattle Skyline Goods", City: "Seattle", State: "WA" },
    { SNo: 17, Store: "Miami Breeze Apparel", City: "Miami", State: "FL" },
    {
      SNo: 18,
      Store: "San Diego Wave Surf Shop",
      City: "San Diego",
      State: "CA",
    },
    {
      SNo: 19,
      Store: "Charlotte Queen’s Closet",
      City: "Charlotte",
      State: "NC",
    },
    { SNo: 20, Store: "Detroit Motor Gear", City: "Detroit", State: "MI" },
  ]);

  // Row Data for SKU: The data to be displayed.
  const [rowDataSku, setRowDataSku] = React.useState<SkuRow[]>([
    { SKU: "Crew Neck Merino Wool Sweater", Price: 114.99, Cost: 18.28 },
    { SKU: "Faux Leather Leggings", Price: 9.99, Cost: 8.45 },
    { SKU: "Fleece-Lined Parka", Price: 199.99, Cost: 17.8 },
    { SKU: "Cotton Polo Shirt", Price: 139.99, Cost: 10.78 },
    { SKU: "Foldable Travel Hat", Price: 44.99, Cost: 27.08 },
    { SKU: "Chic Quilted Wallet", Price: 14.99, Cost: 4.02 },
    { SKU: "High-Slit Maxi Dress", Price: 74.99, Cost: 47.47 },
    { SKU: "Turtleneck Cable Knit Sweater", Price: 49.99, Cost: 22.6 },
    { SKU: "Retro-Inspired Sunglasses", Price: 194.99, Cost: 115.63 },
    { SKU: "Stretch Denim Overalls", Price: 129.99, Cost: 47.06 },
    { SKU: "Adjustable Elastic Headband", Price: 19.99, Cost: 1.34 },
    { SKU: "Adjustable Baseball Cap", Price: 4.99, Cost: 2.29 },
    { SKU: "Cotton Polo Shirt", Price: 114.99, Cost: 60.94 },
    { SKU: "Faux Suede Ankle Boots", Price: 94.99, Cost: 71.53 },
    { SKU: "Striped Cotton Socks", Price: 9.99, Cost: 6.91 },
    { SKU: "Performance Compression Tights", Price: 54.99, Cost: 59.61 },
    { SKU: "Vintage Logo Hoodie", Price: 94.99, Cost: 84.45 },
    { SKU: "Floral Chiffon Wrap Dress", Price: 149.99, Cost: 68.55 },
    { SKU: "Asymmetrical Hem Skirt", Price: 99.99, Cost: 66.89 },
    { SKU: "Slim Fit Pinstripe Suit", Price: 99.99, Cost: 13.3 },
    { SKU: "Chunky Heel Sandals", Price: 89.99, Cost: 46.7 },
    { SKU: "Suede Fringe Vest", Price: 184.99, Cost: 159.65 },
    { SKU: "Relaxed Fit Cargo Pants", Price: 149.99, Cost: 7.2 },
    { SKU: "Corduroy A-Line Skirt", Price: 129.99, Cost: 48.62 },
    { SKU: "Formal Dress Shoes", Price: 164.99, Cost: 161.69 },
    { SKU: "Tailored Corduroy Blazer", Price: 89.99, Cost: 62.99 },
    { SKU: "Foldable Travel Hat", Price: 194.99, Cost: 56.16 },
    { SKU: "Asymmetrical Hem Skirt", Price: 89.99, Cost: 67.94 },
    { SKU: "Plaid Flannel Shirt", Price: 124.99, Cost: 17.5 },
    { SKU: "Oversized Hoodie", Price: 159.99, Cost: 122.23 },
    { SKU: "Woven Straw Sun Hat", Price: 164.99, Cost: 8.91 },
    { SKU: "Faux Fur Winter Coat", Price: 9.99, Cost: 7.37 },
    { SKU: "Casual Cotton Romper", Price: 119.99, Cost: 52.32 },
    { SKU: "Racerback Sports Bra", Price: 14.99, Cost: 8.72 },
    { SKU: "Polarized Sports Sunglasses", Price: 79.99, Cost: 9.44 },
    { SKU: "Chunky Platform Sneakers", Price: 109.99, Cost: 61.7 },
    { SKU: "Slim Fit Chinos", Price: 114.99, Cost: 51.98 },
    { SKU: "Faux Leather Leggings", Price: 194.99, Cost: 13.06 },
    { SKU: "Water-Resistant Fanny Pack", Price: 24.99, Cost: 23.64 },
    { SKU: "Performance Compression Tights", Price: 14.99, Cost: 16.29 },
    { SKU: "Cropped Faux Leather Jacket", Price: 79.99, Cost: 19.52 },
    { SKU: "Breathable Mesh Shorts", Price: 194.99, Cost: 28.08 },
    { SKU: "Minimalist Silver Ring", Price: 174.99, Cost: 147.34 },
    { SKU: "Ribbed Turtleneck Dress", Price: 94.99, Cost: 22.61 },
    { SKU: "Velvet Slip Dress", Price: 69.99, Cost: 41.64 },
    { SKU: "Waterproof Smartwatch", Price: 144.99, Cost: 53.5 },
    { SKU: "Patterned Cotton Bucket Hat", Price: 144.99, Cost: 114.4 },
    { SKU: "Diamond Stud Earrings", Price: 144.99, Cost: 146.0 },
    { SKU: "Tassel Fringe Handbag", Price: 59.99, Cost: 33.29 },
    { SKU: "Tactical Hiking Backpack", Price: 49.99, Cost: 52.54 },
    { SKU: "Patterned Cotton Bucket Hat", Price: 9.99, Cost: 2.14 },
    { SKU: "Bohemian Beaded Bracelet", Price: 124.99, Cost: 116.12 },
    { SKU: "Mesh Panel Yoga Pants", Price: 184.99, Cost: 166.86 },
    { SKU: "Diamond Stud Earrings", Price: 14.99, Cost: 13.75 },
    { SKU: "Faux Suede Ankle Boots", Price: 84.99, Cost: 90.43 },
    { SKU: "Water-Resistant Fanny Pack", Price: 4.99, Cost: 3.73 },
    { SKU: "Plaid Wool Scarf", Price: 139.99, Cost: 97.57 },
    { SKU: "Cropped Faux Leather Jacket", Price: 179.99, Cost: 163.43 },
    { SKU: "Textured Knit Pullover", Price: 54.99, Cost: 50.43 },
    { SKU: "Boho Style Tassel Earrings", Price: 194.99, Cost: 193.43 },
    { SKU: "Sherpa Lined Hooded Coat", Price: 174.99, Cost: 128.09 },
    { SKU: "Mesh Panel Yoga Pants", Price: 69.99, Cost: 45.49 },
    { SKU: "Graphic Print T-Shirt", Price: 109.99, Cost: 53.35 },
    { SKU: "Fitted V-Neck Sweater", Price: 124.99, Cost: 110.24 },
    { SKU: "Formal Dress Shoes", Price: 74.99, Cost: 8.62 },
    { SKU: "Satin Lace Camisole", Price: 184.99, Cost: 136.15 },
    { SKU: "Slim Fit Chinos", Price: 89.99, Cost: 61.64 },
    { SKU: "Retro-Inspired Sunglasses", Price: 44.99, Cost: 41.12 },
    { SKU: "Formal Velvet Blazer", Price: 194.99, Cost: 189.14 },
    { SKU: "Striped Cotton Socks", Price: 169.99, Cost: 10.54 },
    { SKU: "Yoga Leggings", Price: 164.99, Cost: 172.58 },
    { SKU: "Formal Dress Shoes", Price: 9.99, Cost: 1.96 },
    { SKU: "Aviator Sunglasses", Price: 44.99, Cost: 12.37 },
    { SKU: "Perforated Leather Belt", Price: 44.99, Cost: 4.5 },
    { SKU: "Smart Heated Gloves", Price: 109.99, Cost: 100.53 },
    { SKU: "Silk Embroidered Kimono", Price: 109.99, Cost: 78.64 },
    { SKU: "Performance Swim Trunks", Price: 174.99, Cost: 157.84 },
    { SKU: "Tactical Hiking Backpack", Price: 69.99, Cost: 58.16 },
    { SKU: "Thermal Running Gloves", Price: 49.99, Cost: 53.79 },
    { SKU: "Quilted Leather Clutch", Price: 134.99, Cost: 95.84 },
    { SKU: "Rugged Utility Jacket", Price: 44.99, Cost: 2.43 },
    { SKU: "Tapered Suit Trousers", Price: 64.99, Cost: 53.1 },
    { SKU: "Faux Leather Leggings", Price: 139.99, Cost: 22.54 },
    { SKU: "Lace-Up Combat Boots", Price: 109.99, Cost: 64.89 },
    { SKU: "Athletic Crew Socks", Price: 174.99, Cost: 1.75 },
    { SKU: "Silk Neck Scarf", Price: 94.99, Cost: 49.87 },
    { SKU: "Sherpa Lined Denim Jacket", Price: 119.99, Cost: 28.92 },
    { SKU: "Lace-Up Combat Boots", Price: 24.99, Cost: 24.84 },
    { SKU: "Sporty Zip-Up Hoodie", Price: 184.99, Cost: 65.3 },
    { SKU: "Minimalist Gold Necklace", Price: 104.99, Cost: 52.08 },
    { SKU: "Classic Denim Jacket", Price: 149.99, Cost: 144.29 },
    { SKU: "Tassel Fringe Handbag", Price: 109.99, Cost: 3.19 },
    { SKU: "Oversized Cat-Eye Sunglasses", Price: 159.99, Cost: 109.11 },
    { SKU: "Minimalist Leather Watch", Price: 49.99, Cost: 49.89 },
    { SKU: "Quilted Leather Clutch", Price: 4.99, Cost: 0.68 },
    { SKU: "Floral Chiffon Wrap Dress", Price: 184.99, Cost: 39.59 },
    { SKU: "Graphic Skateboard Tee", Price: 194.99, Cost: 53.43 },
    { SKU: "Minimalist Silver Ring", Price: 9.99, Cost: 9.53 },
    { SKU: "Padded Winter Mittens", Price: 154.99, Cost: 53.78 },
    { SKU: "Classic Denim Jacket", Price: 109.99, Cost: 89.53 },
    { SKU: "Lace-Up Combat Boots", Price: 134.99, Cost: 75.59 },
    { SKU: "Cuffed Jogger Pants", Price: 69.99, Cost: 64.95 },
    { SKU: "Oversized Hoodie", Price: 124.99, Cost: 23.25 },
    { SKU: "Unisex Oversized Sweatshirt", Price: 139.99, Cost: 77.13 },
    { SKU: "Puffer Insulated Vest", Price: 14.99, Cost: 10.72 },
    { SKU: "Faux Fur Winter Coat", Price: 14.99, Cost: 4.56 },
    { SKU: "Tactical Hiking Backpack", Price: 199.99, Cost: 115.79 },
    { SKU: "Stretch Fit Slip-On Sneakers", Price: 124.99, Cost: 54.12 },
    { SKU: "Crew Neck Merino Wool Sweater", Price: 19.99, Cost: 3.62 },
    { SKU: "Handcrafted Wooden Watch", Price: 154.99, Cost: 122.91 },
    { SKU: "Smart Heated Gloves", Price: 34.99, Cost: 4.13 },
    { SKU: "Luxury Silk Tie", Price: 114.99, Cost: 49.68 },
    { SKU: "Heavy-Duty Work Gloves", Price: 164.99, Cost: 63.03 },
    { SKU: "Waterproof Hiking Boots", Price: 144.99, Cost: 17.25 },
    { SKU: "Performance Swim Trunks", Price: 114.99, Cost: 41.51 },
    { SKU: "Feather Embellished Fedora", Price: 184.99, Cost: 193.87 },
    { SKU: "Floral Chiffon Wrap Dress", Price: 159.99, Cost: 110.23 },
    { SKU: "Bamboo Fiber Boxer Briefs", Price: 89.99, Cost: 7.74 },
    { SKU: "Woven Straw Sun Hat", Price: 99.99, Cost: 9.7 },
    { SKU: "Silk Embroidered Kimono", Price: 74.99, Cost: 12.3 },
    { SKU: "Asymmetrical Hem Skirt", Price: 184.99, Cost: 19.98 },
    { SKU: "Wool Fedora Hat", Price: 99.99, Cost: 86.49 },
    { SKU: "Fleece Jogger Sweatpants", Price: 79.99, Cost: 45.67 },
    { SKU: "Cuffed Jogger Pants", Price: 114.99, Cost: 52.9 },
    { SKU: "Relaxed Fit Cargo Pants", Price: 199.99, Cost: 80.8 },
    { SKU: "Velvet Slip Dress", Price: 164.99, Cost: 106.75 },
    { SKU: "Cashmere Turtleneck Sweater", Price: 99.99, Cost: 91.79 },
    { SKU: "High-Waisted Bikini Set", Price: 64.99, Cost: 69.34 },
    { SKU: "Minimalist Gold Necklace", Price: 74.99, Cost: 71.47 },
    { SKU: "Oversized Cat-Eye Sunglasses", Price: 119.99, Cost: 117.83 },
    { SKU: "Minimalist Silver Ring", Price: 64.99, Cost: 49.59 },
    { SKU: "Sherpa Lined Denim Jacket", Price: 189.99, Cost: 28.69 },
    { SKU: "Cropped Faux Leather Jacket", Price: 39.99, Cost: 21.03 },
    { SKU: "Tassel Fringe Handbag", Price: 134.99, Cost: 20.79 },
    { SKU: "Reflective Running Vest", Price: 154.99, Cost: 112.21 },
    { SKU: "Classic Denim Jacket", Price: 24.99, Cost: 22.29 },
    { SKU: "Faux Leather Leggings", Price: 64.99, Cost: 43.02 },
    { SKU: "Woven Straw Sun Hat", Price: 9.99, Cost: 0.8 },
    { SKU: "Silk Embroidered Kimono", Price: 134.99, Cost: 48.06 },
    { SKU: "High-Slit Maxi Dress", Price: 9.99, Cost: 7.85 },
    { SKU: "Fleece-Lined Parka", Price: 59.99, Cost: 17.4 },
    { SKU: "Silk Neck Scarf", Price: 114.99, Cost: 120.62 },
    { SKU: "Unisex Oversized Sweatshirt", Price: 134.99, Cost: 106.64 },
    { SKU: "Textured Knit Pullover", Price: 34.99, Cost: 33.38 },
    { SKU: "Luxury Silk Tie", Price: 54.99, Cost: 20.95 },
    { SKU: "Rugged Utility Jacket", Price: 29.99, Cost: 20.69 },
    { SKU: "Retro-Inspired Sunglasses", Price: 79.99, Cost: 82.55 },
    { SKU: "High-Slit Maxi Dress", Price: 14.99, Cost: 6.49 },
    { SKU: "Boho Style Tassel Earrings", Price: 104.99, Cost: 11.02 },
    { SKU: "Metallic Hoop Earrings", Price: 84.99, Cost: 35.61 },
  ]);

  const [rowDataPlan, setRowDataPlan] = React.useState<PlanRow[]>([]);

  // State for new input values
  const [newStore, setNewStore] = React.useState("");
  const [newCity, setNewCity] = React.useState("");
  const [newState, setNewState] = React.useState("");
  const [newSku, setNewSku] = React.useState("");
  const [newPrice, setNewPrice] = React.useState(Number);
  const [newCost, setNewCost] = React.useState(Number);

  function formatNumber(number: number) {
    return Math.floor(number).toLocaleString();
  }

  const decimalFormatter = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(value);
  };

  function currencyFormatter(params: ValueFormatterParams) {
    return "$" + formatNumber(params.value);
  }

  function percentageFormatter(params: ValueFormatterParams) {
    return "%" + decimalFormatter(params.value * 100);
  }

  // Column Definitions: Defines & controls grid columns.
  const [colDefsSku, setColDefsSku] = React.useState<ColDef<SkuRow>[]>([
    { field: "SKU" },
    { field: "Price", valueFormatter: currencyFormatter },
    { field: "Cost", valueFormatter: currencyFormatter },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefsStore, setColDefsStore] = React.useState<ColDef<IRow>[]>([
    { field: "SNo" },
    { field: "Store" },
    { field: "City" },
    { field: "State" },
  ]);

  const [colDefsPlan, setColDefsPlan] = React.useState<ColDef<PlanRow>[]>([
    { field: "Store" },
    { field: "SKU" },
    { field: "Week" },
    {
      field: "Sales_Units",
      cellStyle: (params) =>
        params.value > 150
          ? { background: "green" }
          : params.value > 100 && params.value < 150
            ? { background: "yellow" }
            : params.value > 50 && params.value < 100
              ? { background: "orange" }
              : { background: "red" },
    },
    { field: "Sales_Dollars", valueFormatter: currencyFormatter },
    { field: "Cost_Dollars", valueFormatter: currencyFormatter },
    { field: "GM_Dollars", valueFormatter: currencyFormatter },
    {
      field: "GM_Percentage",
      valueFormatter: percentageFormatter,
      cellStyle: (params) =>
        params.value > 0.4
          ? { background: "green" }
          : params.value > 0.1 && params.value < 0.4
            ? { background: "yellow" }
            : params.value > 0.5 && params.value < 0.1
              ? { background: "orange" }
              : { background: "red" },
    },
  ]);

  const defaultColDef = React.useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      editable: true,
      // enables flashing to help see cell changes
      enableCellChangeFlash: true,
    };
  }, []);

  //Add Store Button Function
  const handleAddStore = (mode: string) => {
    if (mode == "addRow") {
      if (
        (selectedTab === "SKU" && (!newSku || !newCost || !newPrice)) ||
        (selectedTab === "Store" && (!newStore || !newCity || !newState))
      ) {
        setAllFieldsFilled(false);
        return;
      } else {
        setAllFieldsFilled(true);
      }

      const nextSNo = rowDataStore.length + 1;

      if (selectedTab == "Store") {
        const newRow: IRow = {
          SNo: nextSNo,
          Store: newStore,
          City: newCity,
          State: newState,
        };
        setRowDataStore((prev) => [...prev, newRow]); // Append new row
      } else if (selectedTab == "SKU") {
        const newRow: SkuRow = {
          SKU: newSku,
          Price: newPrice,
          Cost: newCost,
        };
        setRowDataSku((prev) => [...prev, newRow]); // Append new row
      }

      setDialogBoxOpen(false);
    }
    if (mode == "excel") {
      if (selectedTab == "Store") {
        setRowDataStore(data);
      } else if (selectedTab == "SKU") {
        setRowDataSku(data);
      } else if (selectedTab == "Planning") {
        setRowDataPlan(data);
      }
      setFileUploaderOpen(false);
    }
  };

  //Dialog box closing for cancel button
  const handleClose = () => {
    setDialogBoxOpen(false);
    setNewStore("");
    setNewCity("");
    setNewState("");
    setNewSku("");
    setNewCost(Number);
    setNewPrice(Number);
  };

  // Function to remove a row
  const handleDeleteRow = (sno: number) => {
    setRowDataStore((prev) => prev.filter((row) => row.SNo !== sno));
  };

  //Getting the row ID:
  const getRowId = React.useCallback(
    (params: GetRowIdParams) => String(params.data.SNo),
    []
  );

  //Selecting rows ---- Deprecated usage. couldn't figure out
  const rowSelection: RowSelectionOptions = React.useMemo(() => {
    return {
      mode: "multiRow",
      checkboxes: false,
      headerCheckbox: true,
      enableClickSelection: true,
    };
  }, []);

  //FileUploader
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target?.result;
      if (!binaryStr) return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });
      // const sheetName = workbook.SheetNames[0]; // Read the first sheet
      // const sheet = workbook.Sheets[sheetName];

      let transformedData: any[] = [];
      switch (selectedTab) {
        case "Store": {
          let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          ); // Convert to JSON

          transformedData = jsonData.map((row: any) => ({
            SNo: row["Seq No."],
            Store: row.Label,
            City: row.City,
            State: row.State,
          }));
          setData(transformedData);
          break;
        }

        case "SKU": {
          let jsonDataSku = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[1]]
          ); // Convert to JSON

          transformedData = jsonDataSku.map((row: any) => ({
            SKU: row.Label,
            Price: row.Price,
            Cost: row.Cost,
          }));
          setData(transformedData);
          break;
        }

        case "Planning": {
          let jsonDataPlan = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[4]]
          ); // Convert to JSON

          let calculationsTable = sanitizeColumnNames(
            XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[4]])
          );
          let storesTable = sanitizeColumnNames(
            XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          );
          let skuTable = sanitizeColumnNames(
            XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]])
          );
          let calendarTable = sanitizeColumnNames(
            XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]])
          );

          // try {
          //   // Create an in-memory SQLite database
          //   const SQL = await initSqlJs({
          //     locateFile: (file) => `/sql-wasm/dist/sql-wasm.wasm`, // Correct location in public/
          //   });
          //   const db = new SQL.Database();

          //   console.log("DB Created! ", db);
          //   // Function to create table from JSON
          //   const createTableFromJson = (
          //     tableName: string,
          //     jsonData: any[]
          //   ) => {
          //     if (jsonData.length === 0) {
          //       console.log("Table does not contain any data");
          //       return;
          //     }

          //     console.log(
          //       "Creating table from Excel data for table: ",
          //       tableName
          //     );
          //     const columns = Object.keys(jsonData[0]);
          //     const createTableQuery = `
          //   CREATE TABLE ${tableName} (${columns.map((col) => `"${col}" TEXT`).join(", ")});`;
          //     db.run(createTableQuery);

          //     jsonData.forEach((row) => {
          //       const values = columns.map((col) => `'${row[col]}'`).join(", ");
          //       const insertQuery = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values});`;
          //       db.run(insertQuery);
          //     });
          //   };

          //   // Create tables
          //   createTableFromJson("Calculations", calculationsTable);
          //   createTableFromJson("Stores", storesTable);
          //   createTableFromJson("SKU", skuTable);
          //   createTableFromJson("Calendar", calendarTable);

          //   setDb(db); // Save the database instance in state
          //   runQuery();
          //   console.log("Query ran successfully");

          //   transformedData = jsonDataPlan.map((row: any) => ({
          //     SKU: row.Label,
          //     Price: row.Price,
          //     Cost: row.Cost,
          //   }));
          //   setData(jsonDataPlan);
          // } catch (error) {
          //   console.error("Error while initializing DB!");
          //   console.log("Falling back to default static data!");
          // }

          //Static Data from Calculations Sheet
          transformedData = jsonDataPlan.map((row: any) => ({
            Store: row.Store,
            SKU: row.SKU,
            Week: row.Week,
            Sales_Units: row["Sales Units"],
            Sales_Dollars: row["Sales Dollars"],
            Cost_Dollars: row["Cost Dollars"],
            GM_Dollars: row["GM Dollars"],
            GM_Percentage: row["GM %"],
          }));
          setData(transformedData);

          break;
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  //Column names/headrs sanitization
  const sanitizeColumnNames = (jsonData: any[]) => {
    console.log("Sanitizing Columns");
    return jsonData.map((row) => {
      const sanitizedRow: any = {};
      Object.keys(row).forEach((key) => {
        const sanitizedKey = key
          .trim()
          .replace(/\s+/g, "_") // Replace spaces with underscores
          .replace(/[^a-zA-Z0-9_]/g, ""); // Remove special characters

        sanitizedRow[sanitizedKey] = row[key];
      });
      return sanitizedRow;
    });
  };

  //SQL Query for Planning table
  // const runQuery = () => {
  //   if (!db) {
  //     alert("No database available. Upload an Excel file first.");
  //     return;
  //   }

  //   console.log("Running Query");
  //   const query = `
  //   SELECT
  //       s.Label AS Store,
  //       sk.Label AS SKU,
  //       cal.Week,
  //       cal."Month-Label",
  //       c.Sales_Units,
  //       c.Sales_Dollars,
  //       c.GM_Dollars,
  //       CASE
  //           WHEN c.Sales_Dollars = 0 THEN 0
  //           ELSE c.GM_Dollars / c.Sales_Dollars
  //       END AS GM_Percent
  //   FROM Calculations c
  //   JOIN Stores s ON c.Store = s.ID
  //   JOIN SKU sk ON c.SKU = sk.ID
  //   JOIN Calendar cal ON c.Week = cal.Week;
  // `;

  //   const result = db.exec(query);

  //   // Extract column names & rows
  //   if (result.length > 0) {
  //     const columns = result[0].columns;
  //     const rows = result[0].values.map((row: any) =>
  //       Object.fromEntries(row.map((val: any, i: any) => [columns[i], val]))
  //     );

  //     setQueryResult(rows);
  //     console.log("Query Result: ", rows);
  //   } else {
  //     console.log("Query resulted in a null set");
  //     setQueryResult([]);
  //   }
  // };

  //MUI MUIMUIMUI
  //   const columns: GridColDef[] = [
  //     { field: "id", headerName: "ID", width: 70 },
  //     { field: "firstName", headerName: "First name", width: 130 },
  //     { field: "lastName", headerName: "Last name", width: 130 },
  //     {
  //       field: "age",
  //       headerName: "Age",
  //       type: "number",
  //       width: 90,
  //     },
  //     {
  //       field: "fullName",
  //       headerName: "Full name",
  //       description: "This column has a value getter and is not sortable.",
  //       sortable: false,
  //       width: 160,
  //       valueGetter: (value: any, row: { firstName: any; lastName: any }) =>
  //         `${row.firstName || ""} ${row.lastName || ""}`,
  //     },
  //   ];

  //   const rows = [
  //     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //   ];

  //   const paginationModel = { page: 0, pageSize: 5 };

  return (
    // <div>
    //   <Paper sx={{ height: 400, width: "100%" }}>
    //     <DataGrid
    //       rows={rows}
    //       columns={columns}
    //       initialState={{ pagination: { paginationModel } }}
    //       pageSizeOptions={[5, 10]}
    //       checkboxSelection
    //       sx={{ border: 0 }}
    //     />
    //   </Paper>
    // </div>

    <>
      <div
        style={{
          width: selectedTab == "Planning" ? "85%" : "45%",
          height: "82%",
          maxHeight: "82%",
          position: "absolute",
          top: "74px",
          left: "250px",
          border: "1px solid #bbbbbb",
        }}
      >
        {/* Main Grid from Ag-Grid Library  */}
        <AgGridReact
          rowData={
            selectedTab == "Store"
              ? rowDataStore
              : selectedTab == "SKU"
                ? rowDataSku
                : selectedTab == "Planning"
                  ? rowDataPlan
                  : rowDataStore
          }
          columnDefs={
            selectedTab == "Store"
              ? colDefsStore
              : selectedTab == "SKU"
                ? colDefsSku
                : selectedTab == "Planning"
                  ? colDefsPlan
                  : colDefsStore
          }
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          theme={themeBalham}
          // rowClass={rowClass}
          rowSelection={rowSelection}
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
        />
      </div>

      {/* Add Record Button  */}
      {selectedTab == "SKU" ||
        (selectedTab == "Store" && (
          <Button
            variant="outlined"
            sx={{ position: "absolute", left: "250px", bottom: "20px" }}
            onClick={handleOpen}
          >
            {selectedTab == "Store"
              ? "Add Store"
              : selectedTab == "SKU"
                ? "Add SKU"
                : ""}
          </Button>
        ))}

      {/* Add Record Dialog Box  */}
      <Dialog
        open={dialogBoxOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          {selectedTab == "Store"
            ? "Add Store"
            : selectedTab == "SKU"
              ? "Add SKU"
              : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add details about the new{" "}
            {selectedTab == "Store"
              ? "store"
              : selectedTab == "SKU"
                ? "SKU"
                : selectedTab == "Planning"
                  ? "plan"
                  : ""}
          </DialogContentText>
          {selectedTab == "Store" ? (
            <>
              <TextField
                fullWidth
                label="Store Name"
                value={newStore}
                onChange={(e) => setNewStore(e.target.value)}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="City"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="State"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                margin="dense"
                required
              />
            </>
          ) : selectedTab == "SKU" ? (
            <>
              <TextField
                fullWidth
                label="SKU"
                value={newSku}
                onChange={(e) => setNewSku(e.target.value)}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="Cost"
                value={newCost}
                onChange={(e) => setNewCost(Number(e.target.value))}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                margin="dense"
                required
              />
            </>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAddStore("addRow")}>Add Store</Button>
        </DialogActions>
        {!allFieldsFilled && (
          <Alert severity="error">All fields are mandatory</Alert>
        )}
      </Dialog>

      {/* FileUploader Button  */}
      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          left: selectedTab == "Planning" ? "250px" : "400px",
          bottom: "20px",
        }}
        onClick={handleFileUploaderOpen}
      >
        Upload File
      </Button>

      {/* File Uploader Dialog Box  */}
      <Dialog
        open={fileUploaderOpen}
        onClose={() => setFileUploaderOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Upload Excel File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload a valid .xlsx file
          </DialogContentText>
          <div>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFileUploaderOpen(false)}>Cancel</Button>
          <Button onClick={() => handleAddStore("excel")}>Add Data</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableStore;
