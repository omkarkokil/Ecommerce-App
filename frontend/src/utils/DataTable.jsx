import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Pagination,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

import StateContext from "../Context/hooks/StateContext";
import FunctionContext from "../Context/Function/FunctionContext";

const DataTable = (props) => {
  const { activePage, setActivePage } = useContext(StateContext);
  const { StyledTableCell } = useContext(FunctionContext);
  console.log(activePage);
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {props.tablecol.map((ele, id) => {
                  return (
                    <StyledTableCell key={id} align={ele.pos}>
                      {ele.name}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>{props.tablerow}</TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{ mt: "20px" }}
          variant="outlined"
          color="primary"
          page={activePage}
          onChange={(e, value) => setActivePage(value)}
          count={props.count}
        />
      </Stack>
    </>
  );
};

export default DataTable;
