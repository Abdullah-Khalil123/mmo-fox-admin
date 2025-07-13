'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/types/game.schema';
import { useCreateServiceByGameId } from '@/hooks/useServices';
import { Label } from '@/components/ui/label';

const NewService = ({ gameId }: { gameId: string | number }) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateServiceByGameId(gameId);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const imageUrl = watch('imageUrl');
  const onSubmit = (data: ServiceFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'imageUrl') {
        formData.append(key, value as string);
      } else if (value instanceof FileList && value.length > 0) {
        formData.append('service-image', value[0]);
      }
    });
    mutate(formData, {
      onSuccess: () => {
        router.push(`/games/${gameId}/services`);
      },
    });
  };

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  }, [imageUrl]);

  return (
    <div className="max-w-lg mx-auto space-y-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold tracking-tight">
        Create New Service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1">Service Name</Label>
          <Input {...register('name')} placeholder="Enter service name" />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Description</Label>
          <Textarea
            {...register('description')}
            placeholder="Enter service description"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Base Price</Label>
          <Input {...register('basePrice')} type="number" placeholder="0.00" />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Currency</Label>
          <Input {...register('currency')} placeholder="USD, PKR, EUR, etc." />
        </div>

        <div>
          <Label>Image</Label>
          <Input type="file" accept="image/*" {...register('imageUrl')} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded-md w-full object-cover border"
            />
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isPending}>
            Create Service
          </Button>
          <Button
            className="flex-1"
            variant={'secondary'}
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewService;
