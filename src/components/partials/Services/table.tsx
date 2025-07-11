'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Service } from '@/types/game';
import React from 'react';

const ServicesTable = ({ services }: { services?: any[] }) => {
  if (!services || services.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No services available
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service: Service) => (
            <TableRow key={service.id}>
              <TableCell>{service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    service.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-800'
                      : service.status === 'DRAFT'
                      ? 'bg-yellow-100 text-yellow-800'
                      : service.status === 'UNPUBLISHED'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {service.status}
                </span>
              </TableCell>

              <TableCell>
                {service.currency} {service.basePrice}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant={'outline'}>View Details</Button>
                  <Button variant={'secondary'}>Edit</Button>
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

export default ServicesTable;
