'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface Game {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const EditGame = () => {
  const router = useRouter();

  // Mock data for demonstration - in real app, this would come from props or API
  const gameData: Game = {
    id: 1,
    name: 'Sample Game',
    slug: 'sample-game',
    imageUrl: 'https://example.com/image.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow">
      <ChevronLeft
        className="bg-gray-200 p-1 size-8 rounded-full hover:bg-gray-300 cursor-pointer "
        onClick={() => {
          router.push('/games');
        }}
      />
      <h2 className="text-2xl font-semibold tracking-tight">Edit Game</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Game Name</Label>
          <Input
            id="name"
            placeholder="Enter game name"
            defaultValue={gameData.name}
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="Enter slug"
            defaultValue={gameData.slug}
          />
        </div>

        <div>
          <Label htmlFor="imageUrl">Current Image URL</Label>
          <Input
            id="imageUrl"
            placeholder="Enter image URL"
            defaultValue={gameData.imageUrl}
          />
        </div>

        <div>
          <Label htmlFor="imageFile">Upload New Image</Label>
          <Input
            id="imageFile"
            type="file"
            className="cursor-pointer"
            accept="image/*"
          />
        </div>

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
          <Button className="flex-1">Update Game</Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/games')}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditGame;
