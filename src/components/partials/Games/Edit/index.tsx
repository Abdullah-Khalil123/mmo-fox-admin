'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGameByID, useUpdateGame } from '@/hooks/useGames';
import { Game } from '@/types/game';
import { GameFormData, gameSchema } from '@/types/game.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CategoryDialog from './dialog';

const EditGame = ({ gameId }: { gameId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGameByID(gameId);
  const { mutate, isPending } = useUpdateGame(gameId);

  const [openDialog, setOpenDialog] = useState(false);
  const gameData: Game = data?.data;

  const onSubmit = (data: GameFormData) => {
    if (isPending) return;
    mutate(data, {
      onSuccess: () => {
        router.push('/games');
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading game data</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow">
      <ChevronLeft
        className="bg-gray-200 p-1 size-8 rounded-full hover:bg-gray-300 cursor-pointer "
        onClick={() => {
          router.push('/games');
        }}
      />
      <h2 className="text-2xl font-semibold tracking-tight">Edit Game</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Game Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter game name"
              defaultValue={gameData.name}
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register('slug')}
              placeholder="Enter slug"
              defaultValue={gameData.slug}
            />
          </div>
          <div>
            <Label>Categories</Label>

            {/* Add Category Button */}
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                + Add Category
              </Button>
            </div>

            {gameData.categories && gameData.categories.length > 0 ? (
              <div className="mt-2 space-y-2">
                {gameData.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-3 border rounded-md bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({cat.slug})
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                      onClick={() => {
                        // Delete category logic placeholder
                        console.log(`Delete category ${cat.id}`);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                No categories available
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="imageUrl">Current Image URL</Label>
            <Input
              id="imageUrl"
              {...register('imageUrl')}
              placeholder="Enter image URL"
              defaultValue={gameData.imageUrl}
            />
          </div>

          {/* <div>
          <Label htmlFor="imageFile">Upload New Image</Label>
          <Input
            id="imageFile"
            type="file"
            className="cursor-pointer"
            accept="image/*"
          />
        </div> */}

          {/* {gameData.imageUrl && (
          <div>
            <Label>Current Image Preview</Label>
            <div className="mt-2 p-4 border rounded-lg bg-gray-50">
              <img
                src={gameData.imageUrl}
                alt={gameData.name}
                className="max-w-full h-auto max-h-48 object-contain rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )} */}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <Label className="text-sm text-gray-600">Created At</Label>
              <p className="text-sm font-medium">
                {new Date(gameData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Last Updated</Label>
              <p className="text-sm font-medium">
                {new Date(gameData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1" type="submit">
              Update Game
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
      <CategoryDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default EditGame;
