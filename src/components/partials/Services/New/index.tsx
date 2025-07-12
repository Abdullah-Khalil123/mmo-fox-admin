'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/types/game.schema';
import { useCreateServiceByGameId } from '@/hooks/useServices';

const NewService = ({ gameId }: { gameId: string | number }) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateServiceByGameId(gameId);
  const { register, handleSubmit } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (FormData: ServiceFormData) => {
    mutate(FormData, {
      onSuccess: () => {
        router.push(`/games/${gameId}/services`);
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold tracking-tight">
        Create New Service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service Name</label>
          <Input {...register('name')} placeholder="Enter service name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            {...register('description')}
            placeholder="Enter service description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Base Price</label>
          <Input {...register('basePrice')} type="number" placeholder="0.00" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <Input {...register('currency')} placeholder="USD, PKR, EUR, etc." />
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
