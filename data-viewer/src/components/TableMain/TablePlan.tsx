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

ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  selectedTab: string;
};

interface SkuRow {
  SKU: string;
  Price: number;
  Cost: number;
}

const rowClass = "all_row_class";
const undoRedoCellEditing = true;
const undoRedoCellEditingLimit = 20;
//Pagination
const pagination = true;
const paginationPageSize = 50;
const paginationPageSizeSelector = [10, 50, 100];

const TablePlan: React.FC<Props> = ({ selectedTab }) => {
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = React.useState(true);
  const handleOpen = () => setDialogBoxOpen(true);

  // State for new input values
  const [newSku, setNewSku] = React.useState("");
  const [newPrice, setNewPrice] = React.useState(Number);
  const [newCost, setNewCost] = React.useState(Number);

  const [rowData, setRowData] = React.useState<SkuRow[]>([]);

  function formatNumber(number: number) {
    return Math.floor(number).toLocaleString();
  }

  function currencyFormatter(params: ValueFormatterParams) {
    return "$" + formatNumber(params.value);
  }

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = React.useState<ColDef<SkuRow>[]>([
    { field: "SKU" },
    { field: "Price", valueFormatter: currencyFormatter },
    { field: "Cost", valueFormatter: currencyFormatter },
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
  const handleAddSku = () => {
    if (!newSku || !newCost || !newPrice) {
      setAllFieldsFilled(false);
      return;
    } else {
      setAllFieldsFilled(true);
    }

    const newRow: SkuRow = {
      SKU: newSku,
      Price: newPrice,
      Cost: newCost,
    };

    setRowData((prev) => [...prev, newRow]); // Append new row
    handleClose();
  };

  //Dialog box closing
  const handleClose = () => {
    setDialogBoxOpen(false);
    setNewSku("");
    setNewCost(Number);
    setNewPrice(Number);
  };

  //Selecting rows ---- Deprecated usage. couldn't figure out
  const rowSelection: RowSelectionOptions = React.useMemo(() => {
    return {
      mode: "multiRow",
      checkboxes: false,
      headerCheckbox: true,
      enableClickSelection: true,
    };
  }, []);

  return (
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
        <DialogTitle>Add SKU</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add details about the new SKU
          </DialogContentText>
          <TextField
            fullWidth
            label="Store Name"
            value={newSku}
            onChange={(e) => setNewSku(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="City"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="State"
            value={newCost}
            onChange={(e) => setNewCost(Number(e.target.value))}
            margin="dense"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSku}>Add SKU</Button>
        </DialogActions>
        {!allFieldsFilled && (
          <Alert severity="error">All fields are mandatory</Alert>
        )}
      </Dialog>
    </>
  );
};

export default TablePlan;
