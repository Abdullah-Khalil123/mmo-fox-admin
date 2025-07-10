import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchHeader = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Games</h2>
        <p className="text-muted-foreground">
          Manage your game library and track status
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search games..." className="pl-8 w-[300px]" />
        </div>
        <Button
          onClick={() => {
            router.push(`/games/new`);
          }}
        >
          Add Game
        </Button>
      </div>
    </div>
  );
};

export default SearchHeader;
