import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { User } from '@/types/user.schema';
import React from 'react';

const UserTable = ({ users }: { users: User[] }) => {
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
                  <Button>Edit</Button>
                  <Button variant={'destructive'}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
