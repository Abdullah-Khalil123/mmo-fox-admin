'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useServiceById, useUpdateServiceById } from '@/hooks/useServices';
import { Service } from '@/types/game';
import { ServiceFormData, serviceSchema } from '@/types/game.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const ServiceEdit = ({ serviceId }: { serviceId: string | number }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useServiceById(serviceId);

  const serviceData: Service = data?.data;
  const { mutate, isPending } = useUpdateServiceById(serviceId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (formData: ServiceFormData) => {
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
      <ChevronLeft className="bg-gray-200 p-1 size-8 rounded-full hover:bg-gray-300 cursor-pointer " />
      <h2 className="text-2xl font-semibold tracking-tight">Edit Service</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1">Service Name</label>
          <Input
            defaultValue={serviceData.name}
            {...register('name')}
            placeholder="Enter service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            defaultValue={serviceData.description}
            {...register('description')}
            placeholder="Enter service description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Base Price</label>
          <Input
            defaultValue={serviceData.basePrice}
            type="number"
            {...register('basePrice')}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <Input
            defaultValue={serviceData.currency}
            {...register('currency')}
            placeholder="USD, PKR, EUR, etc."
          />
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
