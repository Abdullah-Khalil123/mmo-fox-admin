'use client';

import React, { useState } from 'react';
import ConfirmDeleteDialog from '../../layouts/Dialog';
import ErrorInput from '@/components/error';
import TableSkeleton from '@/components/layouts/TableSkeleton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableCaption,
} from '@/components/ui/table';
import { NewsForm } from '@/types/news.schema';
import Link from 'next/link';
import { useDeleteNews } from '@/hooks/useNews';

const NewsTable = ({
  data,
  isLoading,
  isError,
}: {
  data: {
    data: NewsForm[];
  };
  isLoading: boolean;
  isError: boolean;
}) => {
  const news: NewsForm[] = data?.data || [];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { mutate, isPending } = useDeleteNews();

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    mutate(selectedId as number, {
      onSuccess: () => {
        setOpenDialog(false);
        setSelectedId(null);
      },
      onError: (error) => {
        console.error('Delete failed:', error);
      },
    });
  };

  if (isError) {
    return <ErrorInput>Error loading news articles</ErrorInput>;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableCaption className="my-2">
          Manage your news articles and updates
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : (
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="max-w-68 truncate">
                  {item.title}
                </TableCell>
                <TableCell className="max-w-94 truncate">
                  {item.description}
                </TableCell>
                <TableCell>
                  {item.author?.name || 'Author Not Available'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Link href={`/news/${item.id}`}>
                      <Button variant={'link'}>View</Button>
                    </Link>
                    <Link href={`/news/${item.id}/edit`}>
                      <Button variant={'default'}>Edit</Button>
                    </Link>
                    <Button
                      variant={'destructive'}
                      onClick={() => handleDelete(item.id as number)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      <ConfirmDeleteDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={confirmDelete}
        isPending={isPending}
        title="Delete News Article"
        description="Are you sure you want to delete this news article? This action cannot be undone."
      />
    </div>
  );
};

export default NewsTable;
