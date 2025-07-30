import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ChangeEventHandler } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

const SearchHeader = ({
  title,
  discription,
  link,
  onChange,
}: // onChange,
{
  title: string;
  discription: string;
  link: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{discription}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            className="pl-8 w-[300px]"
            type="text"
            onChange={onChange}
          />
        </div>
        <Link href={link}>
          <Button>Add {title}</Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchHeader;
