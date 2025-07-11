'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Search = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        <p className="text-muted-foreground">
          Manage your game services library and track status
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services..." className="pl-8 w-[300px]" />
        </div>
        <Button
          onClick={() => {
            router.push(`services/new`);
          }}
        >
          Add Service
        </Button>
      </div>
    </div>
  );
};

export default Search;
