'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateGame } from '@/hooks/useGames';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { GameFormData, gameSchema } from '@/types/game.schema';
import ErrorInput from '@/components/error';

const AddNewGames = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateGame();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
  });

  const onSubmit = (data: GameFormData) => {
    mutate(data, {
      onSuccess: () => {
        router.push('/games');
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow">
      <ChevronLeft
        className="bg-gray-200 p-1 size-8 rounded-full hover:bg-gray-300 cursor-pointer "
        onClick={() => {
          router.push('/games');
        }}
      />
      <h2 className="text-2xl font-semibold tracking-tight">Add New Game</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Game Name</Label>
            <Input {...register('name')} placeholder="Enter game name" />
            {errors.name && <ErrorInput>{errors.name.message}</ErrorInput>}
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input {...register('slug')} placeholder="Enter slug" />
            {errors.slug && <ErrorInput>{errors.slug.message}</ErrorInput>}
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              {...register('imageUrl')}
              type="text"
              placeholder="Enter image URL"
            />
            {errors.imageUrl && (
              <ErrorInput>{errors.imageUrl.message}</ErrorInput>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1" type="submit">
              Create Game
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => router.push('/games')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewGames;
