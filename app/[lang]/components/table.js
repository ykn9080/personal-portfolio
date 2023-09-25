import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

export default function App(props) {
  const { columns, rows } = props;
  return (
    <Table isCompact removeWrapper aria-label="table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// const actionButton = (
//   <Row justify="center" align="center">
//     <Col css={{ d: "flex" }}>
//       <Tooltip content="Edit user">
//         <BiPencil onClick={() => console.log("Edit user")} />
//       </Tooltip>
//     </Col>
//     <Col css={{ d: "flex" }}>
//       <Tooltip
//         content="Delete user"
//         color="error"
//         onClick={() => console.log("Delete user")}
//       >
//         <BiTrashAlt />
//       </Tooltip>
//     </Col>
//   </Row>
// );
