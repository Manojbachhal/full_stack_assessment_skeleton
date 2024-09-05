import React from "react";
import { PaginationProps } from "../interfaces/interfaces";

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={() => onPageChange("prev")}
        disabled={page === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange("next")}
        disabled={totalPages === page}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
