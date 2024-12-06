import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const Tableskeleton = ({ rowCount = 5 }) => {
  return (
    <Table  className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">Original Link</TableHead>
          <TableHead className="w-1/4">Short Link</TableHead>
          <TableHead className="w-1/6">Clicks</TableHead>
          <TableHead className="w-1/6">Created</TableHead>
          <TableHead className="w-1/6">Protected</TableHead>
          <TableHead className="w-1/6 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(rowCount)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-6 w-3/4" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-1/2" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-1/4" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-1/3" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-1/4" />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tableskeleton;