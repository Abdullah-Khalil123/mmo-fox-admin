'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useServiceById, useUpdateServiceById } from '@/hooks/useServices';
import { Service } from '@/types/game';
import { ServiceFormData, serviceSchema } from '@/types/game.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ServiceEdit = ({ serviceId }: { serviceId: string | number }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useServiceById(serviceId);

  const serviceData: Service = data?.data;
  const { mutate, isPending } = useUpdateServiceById(serviceId);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    serviceData?.imageUrl ? serviceData.imageUrl : undefined
  );

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
        router.push(`/games/${serviceData.gameId}/services`);
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading service data</div>;
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold tracking-tight">Edit Service</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Service Name</Label>
          <Input
            defaultValue={serviceData.name}
            {...register('name')}
            placeholder="Enter service name"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            defaultValue={serviceData.description}
            {...register('description')}
            placeholder="Enter service description"
          />
        </div>

        <div>
          <Label>Base Price</Label>
          <Input
            defaultValue={serviceData.basePrice}
            type="number"
            {...register('basePrice')}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label>Currency</Label>
          <Input
            defaultValue={serviceData.currency}
            {...register('currency')}
            placeholder="USD, PKR, EUR, etc."
          />
        </div>

        <div>
          <Label>Service Image</Label>
          <Input
            type="file"
            className="mb-2"
            {...register('imageUrl')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
              }
            }}
          />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Service Preview"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          ) : (
            <div className="h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-gray-500">No image uploaded</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isPending}>
            Edit Service
          </Button>
          <Button
            onClick={() => {
              router.back();
            }}
            variant={'secondary'}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceEdit;
