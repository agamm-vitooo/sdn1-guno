"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null; // kalau cuma 1 halaman, jangan render

  // buat range halaman sederhana
  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // jumlah maksimal tombol angka

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-12 gap-2">
      {/* Tombol Prev */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
        <span>Prev</span>
      </button>

      {/* Tombol Halaman */}
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-2 text-gray-500">...</span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(Number(page))}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Tombol Next */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
