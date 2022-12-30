import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LoadingData from "../../Shared/LoadingData/LoadingData";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function MyTasks() {
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("https://daily-tasks-server-app.vercel.app/addtasks", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      });

      const data = await res.json();

      return data;
      //   const storeData = await res.json();
      //   const data = storeData.filter((data) => data.serviceName.includes(ServiceName));
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log(tasks);
  //   const commentDelete = (deleteAccount) => {
  //     console.log(deleteAccount);
  //     fetch(`https://home-food-server-app.vercel.app/reviews/${deleteAccount?._id}`, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.deletedCount > 0) {
  //           refetch();
  //         }
  //       });
  //   };
  if (isLoading) {
    refetch();
    return <LoadingData></LoadingData>;
  }
  //

  const columns = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "text", label: "Text" },
    { id: "image", label: "Image" },
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];

  function createData(name, email, text) {
    return { name, email, text };
  }

  const rows = tasks.map((task) => createData(task.name, task.email, task.text));
  console.log("rows", rows);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
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
      />
    </Paper>
  );
}
