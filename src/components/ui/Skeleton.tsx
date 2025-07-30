// components/ui/skeleton.tsx
import React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md',
        className
      )}
      {...props}
    />
  );
};

export { Skeleton };
