"use client";

import { useTable, usePagination } from "react-table";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import "@/styles/reacttable.css";
import useRows from "./hooks/useRows";
import useColumns from "./hooks/useColumns";

export default function ReactTable({ blogs }) {
  const columns = useColumns();
  const data = useRows(blogs);

  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    // headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = table;

  return (
    <div className="container1">
      <table {...getTableProps()}>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row, indx) => {
              // Prepare the row for display
              prepareRow(row);
              if (row)
                return (
                  // Apply the row props

                  <tr key="tr" indx {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, indx1) => {
                        // Apply the cell props
                        if (cell)
                          return (
                            <td key="td" indx1 {...cell.getCellProps()}>
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                      })
                    }
                  </tr>
                );
            })
          }
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Page&nbsp;
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiFirstPage className="page-controller" />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <MdKeyboardArrowLeft className="page-controller" />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <MdKeyboardArrowRight className="page-controller" />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiLastPage className="page-controller" />
          </button>{" "}
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 15 ? `Show ${pageSize}` : `Show all`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

ReactTable.getInitialProps = async (ctx) => {
  return {
    blogs: [
      {
        single: {
          title: "",
          excerpt: "",
          featureImage: "",
          slug: "",
          lang: "",
        },
      },
    ],
  };
};
