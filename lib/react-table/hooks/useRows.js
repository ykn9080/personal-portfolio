import { useMemo } from "react";

export default function useRows(blogs) {
  const rows = useMemo(() => {
    return blogs;
  }, []);

  return rows;
}
