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
} from "@mui/material";
import AxiosInstance from "../../axiosInstance/AxiosInstance";

const columns = [
  { accessorKey: "leagueId", header: "ID", size: 40 }, // Adjusted for league ID
  { accessorKey: "leagueName", header: "League Name", size: 120 }, // League Name
  { accessorKey: "leagueShortName", header: "Short Name", size: 120 }, // Short Name
  { accessorKey: "leagueCountry", header: "Country", size: 220 }, // Country
  { accessorKey: "leagueSeason", header: "Season" }, // League Season
  { accessorKey: "createdAt", header: "Created At", size: 150 }, // Creation Date
];

const Leagues = () => {
  const [tableData, setTableData] = useState([]); // Initialize as an empty array
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const fetchAllLeagues = async () => {
    const token = sessionStorage.getItem("jwt");
    console.log("token is sending..." + token);
    try {
      const response = await AxiosInstance.get("/leagues", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });

      console.log(`league is ${JSON.stringify(response.data)}`);
      setTableData(response.data); // Set the fetched leagues data to tableData
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  const handleEditClick = (row) => {
    setCurrentRow(row);
    setEditDialogOpen(true);
  };

  useEffect(() => {
    fetchAllLeagues();
  }, []);

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

  return (
    <Box>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableRowSelection
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
