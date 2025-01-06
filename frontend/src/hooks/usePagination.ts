import { useState } from "react";

export const usePagination = (totalPages: number) => {
  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return {
    page,
    nextPage,
    prevPage,
    goToPage,
  };
};
