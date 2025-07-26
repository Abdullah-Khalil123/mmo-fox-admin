'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGameAllDataByID } from '@/hooks/useGames';
import { Game } from '@/types/game';
import { ChevronLeft, Globe, Info, Search, Edit, Tag, Calendar, RefreshCw } from 'lucide-react';
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

  useEffect(() => {
    if (gameData?.imageUrl) {
      setImagePreview(gameData.imageUrl);
    }
  }, [gameData]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 sm:p-8 space-y-8">
          {/* Game Info Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl mt-4" />
          </div>

          {/* Categories Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2 h-6 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>

          {/* Translations Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-6 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-6 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="space-y-6">
              {[...Array(1)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Info Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-6 w-full" />
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/games')}
            className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{gameData.name}</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Game details and information</p>
          </div>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md"
          onClick={() => router.push(`/games/${gameId}/edit`)}
        >
          <Edit className="size-4" />
          Edit Game
        </Button>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8 space-y-8">
          {/* Game Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  <Globe className="size-4 text-blue-600" />
                  <span>Game Slug</span>
                </Label>
                <p className="text-sm text-gray-500 mt-1 mb-2">Unique identifier for the game</p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="font-mono font-medium text-gray-800">{gameData.slug}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  <Tag className="size-4 text-blue-600" />
                  <span>Game ID</span>
                </Label>
                <p className="text-sm text-gray-500 mt-1 mb-2">Unique identifier in our system</p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="font-mono font-medium text-gray-800">{gameData.id}</p>
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
              <div className="relative group bg-gray-100 rounded-xl min-h-[300px] flex items-center justify-center border border-gray-200 overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt={gameData.name}
                    className="object-contain w-full h-full"
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
          {/* <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Game categories</p>
              </div>

              {gameData?.categories && gameData.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {gameData.categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-75">({cat.slug})</span>
                      </div>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No categories assigned to this game</p>
                </div>
              )}
            </div>
          </div> */}

          {/* Translations Section */}
          {/* <div className="space-y-4">
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
                        <Languages className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">
                          Translation #{index + 1}
                          <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {translation.language}
                          </Badge>
                        </h3>
                      </div>
                      <Badge variant="secondary">ID: {translation.id}</Badge>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block flex items-center gap-1">
                        <span>Description</span>
                      </Label>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: translation.description || '' }}
                        />
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
          </div> */}

          {/* SEO Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-800">SEO Information</h2>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-1 mb-4">Search engine optimization details</p>

            <div className="space-y-6">
              {Array.isArray(gameData.seo) && gameData.seo.length > 0 ? (
                gameData.seo.map((seo, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Search className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">
                          SEO #{index + 1}
                          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {seo.language}
                          </Badge>
                        </h3>
                      </div>
                      <Badge variant="secondary">ID: {seo.id}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-700 mb-1 block">Meta Title</Label>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="font-medium">{seo.metaTitle || '-'}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-700 mb-1 block">Meta Description</Label>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[60px]">
                          <p className="font-medium">{seo.metaDescription || '-'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Introduction</Label>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 min-h-[80px]">
                        <p className="font-medium">
                          {seo?.introduction ? (
                            <div
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: seo.introduction }}
                            />
                          ) : (
                            '-'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Keywords</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {seo.keywords && seo.keywords.length > 0 ? (
                          seo.keywords.map((keyword: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1"
                            >
                              {keyword}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No keywords defined</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No SEO information available for this game</p>
                </div>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="size-5 text-blue-600" />
              </div>
              <div>
                <Label className="text-gray-700 font-medium block mb-1">Created At</Label>
                <p className="text-sm font-medium">
                  {new Date(gameData.createdAt).toLocaleDateString()} at {new Date(gameData.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <RefreshCw className="size-5 text-blue-600" />
              </div>
              <div>
                <Label className="text-gray-700 font-medium block mb-1">Last Updated</Label>
                <p className="text-sm font-medium">
                  {new Date(gameData.updatedAt).toLocaleDateString()} at {new Date(gameData.updatedAt).toLocaleTimeString()}
                </p>
              </div>
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