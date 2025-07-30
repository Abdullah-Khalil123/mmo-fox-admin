import React from 'react';
import { TableBody, TableCell, TableRow } from '../ui/table';

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          <TableCell className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-6" />
          </TableCell>
          <TableCell className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-32" />
          </TableCell>
          <TableCell className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-40" />
          </TableCell>
          <TableCell className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-24" />
          </TableCell>
          <TableCell className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-24 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
