'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateGame } from '@/hooks/useGames';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { GameFormData, gameSchema } from '@/types/game.schema';
import ErrorInput from '@/components/error';

const AddNewGames = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateGame();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
  });
  const imageUrl = watch('imageUrl');
  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      // Clean up when component unmounts or new image is chosen
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const onSubmit = (data: GameFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'imageUrl') {
        formData.append(key, value as string);
      } else if (value instanceof FileList && value.length > 0) {
        formData.append('game-image', value[0]);
      }
    });

    mutate(formData, {
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
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload Image"
              {...register('imageUrl')}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 rounded-md w-full object-cover border"
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1" type="submit" disabled={isPending}>
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
