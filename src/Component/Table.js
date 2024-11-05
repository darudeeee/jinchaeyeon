import Pagination from "@mui/material/Pagination";
import { flexRender } from "@tanstack/react-table";
import { useState } from "react";
const Table = ({ table }) => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    table.setPageIndex(value - 1);
  };

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ fontWeight: 600 }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    textAlign:
                      cell.column.columnDef.header == "제목"
                        ? "left"
                        : "center",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          height: "20px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Pagination
          count={table.getPageCount()}
          page={page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Table;
