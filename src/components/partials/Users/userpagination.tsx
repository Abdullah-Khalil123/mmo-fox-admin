import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

const Pagination = ({
  setPage,
  setLimit,
  pagination,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}) => {
  const { currentPage, totalPages, totalItems, limit } = pagination;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{start}</span> to{' '}
            <span className="font-medium">{end}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {generatePageNumbers().map((page, idx) =>
              page === '...' ? (
                <Button key={idx} variant="ghost" size="sm" disabled>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className={
                    page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  }
                  onClick={() => setPage(Number(page))}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="text-sm text-muted-foreground">Rows per page:</p>
        <select
          className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // reset to first page
          }}
        >
          {[10, 25, 50, 100].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Pagination;
