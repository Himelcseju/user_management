import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { Download } from "@mui/icons-material"; // Import the Download icon
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AxiosInstance from "../../axiosInstance/AxiosInstance";

const columns = [
  { accessorKey: "leagueId", header: "ID", size: 40 },
  { accessorKey: "leagueName", header: "League Name", size: 120 },
  { accessorKey: "leagueShortName", header: "Short Name", size: 120 },
  { accessorKey: "leagueCountry", header: "Country", size: 220 },
  { accessorKey: "leagueSeason", header: "Season" },
  { accessorKey: "createdAt", header: "Created At", size: 150 },
];

const Leagues = () => {
  const [tableData, setTableData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const fetchAllLeagues = async () => {
    const token = sessionStorage.getItem("jwt");
    try {
      const response = await AxiosInstance.get("/leagues", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  useEffect(() => {
    fetchAllLeagues();
  }, []);

  const handleEditClick = (row) => {
    setCurrentRow(row);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSubmit = () => {
    const updatedData = tableData.map((row) => {
      if (row.leagueId === currentRow.leagueId) {
        return { ...row, ...currentRow };
      }
      return row;
    });
    setTableData(updatedData);
    handleEditDialogClose();
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = tableData.map((row) => ({
      ID: row.leagueId,
      "League Name": row.leagueName,
      "Short Name": row.leagueShortName,
      Country: row.leagueCountry,
      Season: row.leagueSeason,
      "Created At": row.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const csvBlob = new Blob([XLSX.utils.sheet_to_csv(worksheet)], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(csvBlob, "leagues.csv");
  };

  // Export to Excel
  const exportToExcel = () => {
    const excelData = tableData.map((row) => ({
      ID: row.leagueId,
      "League Name": row.leagueName,
      "Short Name": row.leagueShortName,
      Country: row.leagueCountry,
      Season: row.leagueSeason,
      "Created At": row.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leagues");

    XLSX.writeFile(workbook, "leagues.xlsx");
  };

  return (
    <Box>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableRowSelection
        renderTopToolbarCustomActions={() => (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={exportToCSV}
              startIcon={<Download />}
            >
              CSV
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={exportToExcel}
              startIcon={<Download />}
            >
              Excel
            </Button>
          </Box>
        )}
        renderRowActions={({ row }) => (
          <Box>
            <Button onClick={() => handleEditClick(row.original)}>Edit</Button>
            <Button color="error" onClick={() => handleDeleteClick(row.index)}>
              Delete
            </Button>
          </Box>
        )}
      />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {currentRow && (
            <>
              <TextField
                margin="dense"
                label="League Name"
                fullWidth
                variant="outlined"
                value={currentRow.leagueName}
                onChange={(e) =>
                  setCurrentRow({ ...currentRow, leagueName: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Short Name"
                fullWidth
                variant="outlined"
                value={currentRow.leagueShortName}
                onChange={(e) =>
                  setCurrentRow({
                    ...currentRow,
                    leagueShortName: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Country"
                fullWidth
                variant="outlined"
                value={currentRow.leagueCountry}
                onChange={(e) =>
                  setCurrentRow({
                    ...currentRow,
                    leagueCountry: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Season"
                fullWidth
                variant="outlined"
                value={currentRow.leagueSeason}
                onChange={(e) =>
                  setCurrentRow({ ...currentRow, leagueSeason: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Created At"
                fullWidth
                variant="outlined"
                value={currentRow.createdAt}
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leagues;
