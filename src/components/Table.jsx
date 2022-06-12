import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Profile from "./Profile";

const useStyles = makeStyles({
  tableBody: {
    "&:focus": {
      backgroundColor: "#807B0F",
    },
  },
});

//creating rows and columns for the table
const columns = [
  { id: "name", label: "Name", minWidth: 50 },
  {
    id: "team",
    label: "Team",
    minWidth: 20,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "position",
    label: "Position",
    minWidth: 20,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "salary",
    label: "Salary($)",
    minWidth: 30,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "points",
    label: "Points",
    minWidth: 20,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, team, position, salary, points) {
  return { name, team, position, salary, points };
}

const PlayerTable = (props) => {
  const classes = useStyles();
  //to contain data of players
  const [players, getAllPlayers] = useState([]);
  let playerRows = [];
  //I have included the axios call inside the useEffect hook in order to prevent any multiple API calls and hence prevent any problems arising from them
  useEffect(() => {
    const getPlayers = () => {
      const url = `https://app.aurictouch.com/players?operator=${props.operator}&operatorGameType=${props.operatorGame}&operatorName=${props.operatorName}`;
      axios.get(`${url}`).then((response) => {
        const allPlayers = response.data;
        getAllPlayers(allPlayers.data);
      });
    };
    getPlayers();
  }, [props.operator, props.operatorGame, props.operatorName, players]);

  //extracting required data for the table
  players.forEach((element) => {
    playerRows.push(
      createData(
        element.operatorPlayerName,
        element.team,
        element.operatorPosition,
        element.operatorSalary,
        element.fantasyPoints
      )
    );
  });
  let rows = playerRows;
  //in some places the api doesnt return a value for the fantasy points or team. In those cases the value appears to be blank in the table. It is simply because the API doesnt return a value for the specific players.

  //to handle pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [active, setActive] = useState(false);
  function handleClick() {
    setActive(true);
  }

  //to handle the selected row to display player profile card
  const [selectedRow, setSelectedRow] = useState({});

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ width: "50%", overflow: "hidden", margin: "50px 120px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        minWidth: column.minWidth,
                        fontWeight: "700",
                        background: "#1D1D1D",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        sx={{
                          background: "#444444",
                        }}
                        onClick={() => {
                          setSelectedRow(row);
                          handleClick();
                        }}
                        className={classes.tableBody}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ background: "#262626", color: "white" }}
          />
        </Paper>
        <Profile
          playerID={selectedRow}
          style={{ display: active ? "block" : "none" }}
        />
      </div>
    </>
  );
};

export default PlayerTable;
