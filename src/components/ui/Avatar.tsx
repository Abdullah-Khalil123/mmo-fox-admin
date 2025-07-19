/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Avatar = React.forwardRef<
      HTMLSpanElement,
      React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
      <span
            ref={ref}
            className={cn(
                  'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
                  className
            )}
            {...props}
      />
));
Avatar.displayName = 'Avatar';

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
      src: string;
};

const AvatarImage = React.forwardRef<
      HTMLImageElement,
      AvatarImageProps
>(({ className, src, width, height, ...props }, ref) => (
      <Image
            ref={ref}
            className={cn('aspect-square h-full w-full object-cover', className)}
            src={src}
            alt={props.alt ?? ""}
            unoptimized
            loading="lazy"
            fill
            style={{ objectFit: 'cover' }} // Ensure the image covers the avatar area
            {...props}
      />
));
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
      HTMLSpanElement,
      React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
      <span
            ref={ref}
            className={cn(
                  'flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800',
                  className
            )}
            {...props}
      />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };