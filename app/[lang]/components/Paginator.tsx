import { chakra, ChakraProvider, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Paginate } from "react-paginate-chakra-ui";

export default function Paginator() {
  const [page, setPage] = React.useState(0);
  const handlePageClick = (p: number) => setPage(p);

  return (
    <>
      <Stack p={5}>
        <chakra.div>Page: {page}</chakra.div>
        <Paginate
          // required props 👇
          page={page}
          count={70}
          pageSize={10}
          onPageChange={handlePageClick}
          // optional props 👇
          margin={2}
          shadow="lg"
          fontWeight="blue"
          variant="outline"
          // ...border and other props also work 💪
          border="2px solid"
          // you can use w to adjust to parent
          // container
          // w="full"
        />
      </Stack>
    </>
  );
}
