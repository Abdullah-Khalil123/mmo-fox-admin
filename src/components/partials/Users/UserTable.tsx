import ConfirmDeleteDialog from '@/components/layouts/Dialog';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { useDeleteUser } from '@/hooks/useUsers';
import { User } from '@/types/user.schema';
import Link from 'next/link';
import React, { useState } from 'react';

const UserTable = ({ users }: { users: User[] }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { mutate } = useDeleteUser();
  const handleDelete = () => {
    if (selectedId === null) return;
    mutate(selectedId, {
      onSuccess: () => {
        setOpenDialog(false);
        setSelectedId(null);
      },
      onError: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={String(user.id) + idx}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button variant={'link'}>View</Button>
                  <Link href={`/users/${user.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant={'destructive'}
                    onClick={() => {
                      setSelectedId(user.id as number);
                      setOpenDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDeleteDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={handleDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default UserTable;
