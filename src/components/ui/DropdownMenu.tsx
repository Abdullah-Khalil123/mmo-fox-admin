import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
      React.ElementRef<typeof DropdownMenuPrimitive.Content>,
      React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
      <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                  ref={ref}
                  sideOffset={sideOffset}
                  className={cn(
                        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:border-gray-800 dark:bg-gray-900',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        className
                  )}
                  {...props}
            />
      </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
      React.ElementRef<typeof DropdownMenuPrimitive.Item>,
      React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
            inset?: boolean;
      }
>(({ className, inset, ...props }, ref) => (
      <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                  'focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  inset && 'pl-8',
                  className
            )}
            {...props}
      />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuItem,
};