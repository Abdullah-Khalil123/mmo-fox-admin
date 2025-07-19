'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGameAllDataByID } from '@/hooks/useGames';
import { Game } from '@/types/game';
import { ChevronLeft, Globe, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/Skeleton';

const GameView = ({ gameId }: { gameId: string }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGameAllDataByID(gameId);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const gameData: Game = data?.data;
  console.log(data)

  useEffect(() => {
    if (gameData?.imageUrl) {
      setImagePreview(gameData.imageUrl);
    }
  }, [gameData]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 sm:p-8 space-y-8">
          {/* Slug Section Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Image Section Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
            </div>
          </div>

          {/* Categories Section Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>

          {/* Translations Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-6 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-8 w-40" />
            </div>
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-300 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Info className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Game Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn&apos;t find the game you&apos;re looking for. It may have been removed or doesn&apos;t exist.
        </p>
        <Button onClick={() => router.push('/games')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header with Back Button */}
      <div
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/games')}
            className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">View Game</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Game details and information</p>
          </div>
        </div>
        <div>
          <Button
            className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
            onClick={() => router.push(`/games/${gameId}/edit`)}
          >
            Edit Game
          </Button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 space-y-8">
          {/* Slug Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  <span>Game Slug</span>
                </Label>
                <p className="text-sm text-gray-500 mt-1 mb-2">Unique identifier for the game</p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="font-medium">{gameData.slug}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800">Game Image</h2>
            </div>

            <div className="mt-4">
              <div className="relative group bg-gray-100 rounded-xl min-h-[300px] flex items-center justify-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg w-full object-contain border shadow-sm aspect-video"
                    width={800}
                    height={450}
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 p-6">
                    <Info className="size-12 mb-2" />
                    <p className="text-sm">No image available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Game categories</p>
              </div>

              {gameData?.categories && gameData.categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {gameData.categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-white shadow-sm"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{cat.name}</span>
                        <span className="text-xs text-gray-500 block">{cat.slug}</span>
                      </div>
                      <Badge variant="secondary">ID: {cat.id}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No categories assigned to this game</p>
                </div>
              )}
            </div>
          </div>

          {/* Translations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-800">Translations</h2>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-1 mb-4">Game information in different languages</p>

            <div className="space-y-6">
              {Array.isArray(gameData.translations) && gameData.translations.length > 0 ? (
                gameData.translations.map((translation, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Globe className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">
                          Translation #{index + 1} <Badge variant="outline">{translation.language}</Badge>
                        </h3>
                      </div>
                      <Badge variant="secondary">ID: {translation.id}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-gray-700 mb-1 block">Language Code</Label>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="font-medium">{translation.language}</p>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-gray-700 mb-1 block">Game Name</Label>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="font-medium">{translation.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Description</Label>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="whitespace-pre-line">{translation.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No translations available for this game</p>
                </div>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-gray-700 font-medium block mb-2">Created At</Label>
              <p className="text-sm font-medium">
                {new Date(gameData.createdAt).toLocaleDateString()} at {new Date(gameData.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-gray-700 font-medium block mb-2">Last Updated</Label>
              <p className="text-sm font-medium">
                {new Date(gameData.updatedAt).toLocaleDateString()} at {new Date(gameData.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex gap-4 pt-4 flex-col sm:flex-row">
            <Button
              className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
              onClick={() => router.push('/games')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;