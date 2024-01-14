import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useStore from "../store/store";

const selector = (state) => ({
  nodes: state.nodes,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  padding:14,

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Footer = () => {
  const { nodes } = useStore(selector);
  function createData(id, name, calories) {
    return { id, name, calories };
  }

  const rows = nodes.map((item) => {
    return createData(item.id, item.data["label"], item.properties);
  });

  // console.log("rows", rows);

  return (
    <Box
      sx={{
        position: "absolute",
        left:0,
        // marginLeft: {lg:"7vh",md:'5vh'},
        width:'-webkit-fill-available',
      }}
    >
      <BottomNavigation>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Properties</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.calories.join(", ")}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
