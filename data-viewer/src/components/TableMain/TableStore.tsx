import * as React from "react";
import "./TableMain.css";
import type {
  ColDef,
  GetRowIdParams,
  RowSelectionOptions,
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

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  SNo: number;
  Store: string;
  City: string;
  State: string;
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
  const [allFieldsFilled, setAllFieldsFilled] = React.useState(true);
  const handleOpen = () => setDialogBoxOpen(true);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = React.useState<IRow[]>([
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

  // State for new input values
  const [newStore, setNewStore] = React.useState("");
  const [newCity, setNewCity] = React.useState("");
  const [newState, setNewState] = React.useState("");

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = React.useState<ColDef<IRow>[]>([
    { field: "SNo" },
    { field: "Store" },
    { field: "City" },
    { field: "State" },
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
  const handleAddStore = () => {
    if (!newStore || !newCity || !newState) {
      setAllFieldsFilled(false);
      return;
    } else {
      setAllFieldsFilled(true);
    }

    const nextSNo = rowData.length + 1;

    const newRow: IRow = {
      SNo: nextSNo,
      Store: newStore,
      City: newCity,
      State: newState,
    };

    setRowData((prev) => [...prev, newRow]); // Append new row
    handleClose();
  };

  //Dialog box closing
  const handleClose = () => {
    setDialogBoxOpen(false);
    setNewStore("");
    setNewCity("");
    setNewState("");
  };

  // Function to remove a row
  const handleDeleteRow = (sno: number) => {
    setRowData((prev) => prev.filter((row) => row.SNo !== sno));
  };

  //Getting the row ID:
  const getRowId = React.useCallback(
    (params: GetRowIdParams) => String(params.data.SNo),
    [],
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
          width: "45%",
          height: "82%",
          maxHeight: "82%",
          position: "absolute",
          top: "74px",
          left: "250px",
          border: "1px solid #bbbbbb",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          theme={themeBalham}
          rowClass={rowClass}
          rowSelection={rowSelection}
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
        />
      </div>
      <Button
        variant="outlined"
        sx={{ position: "absolute", left: "250px", bottom: "20px" }}
        onClick={handleOpen}
      >
        Add Store
      </Button>
      <Dialog
        open={dialogBoxOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Add Store</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add details about the new store
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddStore}>Add Store</Button>
        </DialogActions>
        {!allFieldsFilled && (
          <Alert severity="error">All fields are mandatory</Alert>
        )}
      </Dialog>
    </>
  );
};

export default TableStore;
