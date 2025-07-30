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
import React from 'react';

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
            <TableHead>Discription</TableHead>
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
                <TableCell className="max-w-68 text-ellipsis overflow-hidden">
                  {item.title}
                </TableCell>
                <TableCell className="max-w-94 text-ellipsis overflow-hidden">
                  {item.description}
                </TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Link href={`/news/${item.id}`}>
                      <Button variant={'link'}>View</Button>
                    </Link>
                    <Link href={`/news/${item.id}/edit`}>
                      <Button variant={'default'}>Edit</Button>
                    </Link>
                    <Button variant={'destructive'}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default NewsTable;
