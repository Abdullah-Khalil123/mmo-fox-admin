'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useDeleteGameCategory,
  useGameAllDataByID,
  useUpdateGame,
} from '@/hooks/useGames';
import { Game } from '@/types/game';
import { GameFormData, gameSchema } from '@/types/game.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Image as ImageIcon, Languages, Trash2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import CategoryDialog from './dialog';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

const EditGame = ({ gameId }: { gameId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGameAllDataByID(gameId);
  const { mutate, isPending } = useUpdateGame(gameId);
  const { mutate: mutateCategory } = useDeleteGameCategory(gameId);

  const [openDialog, setOpenDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gameData: Game = data?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      slug: gameData?.slug || '',
      imageUrl: undefined,
      translations:
        Array.isArray(gameData?.translations) && gameData.translations.length > 0
          ? gameData.translations
          : [{ language: 'EN', name: '', description: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'translations',
  });

  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (gameData) {
      reset({
        slug: gameData.slug,
        translations: Array.isArray(gameData.translations) && gameData.translations.length > 0
          ? gameData.translations
          : [{ language: 'EN', name: '', description: '' }],
      });

      // Set initial image preview
      if (gameData.imageUrl) {
        setImagePreview(gameData.imageUrl);
      }
    }
  }, [gameData, reset]);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const onSubmit = (data: GameFormData) => {
    if (isPending) return;

    let imageValue: string | File | undefined = undefined;
    if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
      imageValue = data.imageUrl[0];
    } else if (gameData?.imageUrl) {
      imageValue = gameData.imageUrl;
    }

    mutate(
      {
        slug: data.slug,
        imageUrl: imageValue,
        translations: data.translations,
      },
      {
        onSuccess: () => {
          router.push('/games');
        },
      }
    );
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 text-red-700 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Error loading game data</h3>
        <p className="mt-2 text-sm text-gray-500">Please try again later</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => router.push('/games')}
        >
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header with Back Button */}
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Edit Game</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Update the details of your game</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mt-1 mb-2">Unique identifier for the game</p>
                  <Input
                    {...register('slug')}
                    placeholder="Enter slug"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.slug && <p className="mt-2 text-sm text-red-600">{errors.slug.message}</p>}
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-800">Game Image</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                  <Label className="text-gray-700 font-medium flex items-center gap-1">
                    <span>Upload New Image</span>
                  </Label>
                  <p className="text-sm text-gray-500 mt-1 mb-2">Recommended size: 1200x630 pixels</p>

                  <div
                    className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 min-h-[180px]"
                    onClick={handleImageClick}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      {...register('imageUrl')}
                      ref={(e) => {
                        register('imageUrl').ref(e);
                        if (e) fileInputRef.current = e;
                      }}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
                        <Upload className="size-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload a new image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">Image Preview</Label>
                  <div className="mt-1 relative group bg-gray-100 rounded-xl min-h-[200px] flex items-center justify-center">
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="mt-2 rounded-lg w-full object-cover border shadow-sm aspect-video"
                          width={500}
                          height={300}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="opacity-100"
                            onClick={handleImageClick}
                          >
                            Change Image
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 p-6">
                        <ImageIcon className="size-12 mb-2" />
                        <p className="text-sm">No image selected</p>
                      </div>
                    )}
                  </div>
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
                  <p className="text-sm text-gray-500">Manage game categories</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenDialog(true)}
                  >
                    + Add Category
                  </Button>
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => mutateCategory(cat.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-500">No categories assigned to this game</p>
                    <p className="text-sm text-gray-400 mt-1">Add categories to organize your game</p>
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

                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => append({ language: '', name: '', description: '' })}
                >
                  + Add Translation
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-1 mb-4">Manage translations for different languages</p>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Languages className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">Translation #{index + 1}</h3>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-gray-700 mb-1 block">Language Code</Label>
                        <p className="text-sm text-gray-500 mb-2">e.g. EN, FR, ES</p>
                        <Input
                          {...register(`translations.${index}.language` as const)}
                          placeholder="EN"
                          className="py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-gray-700 mb-1 block">Game Name</Label>
                        <p className="text-sm text-gray-500 mb-2">Name in this language</p>
                        <Input
                          {...register(`translations.${index}.name` as const)}
                          placeholder="Enter game name"
                          className="py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Description</Label>
                      <p className="text-sm text-gray-500 mb-2">Description in this language</p>
                      <Textarea
                        {...register(`translations.${index}.description` as const)}
                        placeholder="Enter description"
                        rows={3}
                        className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {errors.translations && (
                <p className="mt-4 text-sm text-red-600">{errors.translations?.message as string}</p>
              )}
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-gray-700 font-medium block mb-2">Created At</Label>
                <p className="text-sm font-medium">
                  {gameData ? new Date(gameData.createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-gray-700 font-medium block mb-2">Last Updated</Label>
                <p className="text-sm font-medium">
                  {gameData ? new Date(gameData.updatedAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 flex-col sm:flex-row">
              <Button
                variant="outline"
                className="py-5 sm:py-6 text-base rounded-xl border-gray-300 hover:bg-gray-50 flex-1"
                onClick={() => router.push('/games')}
              >
                Cancel
              </Button>
              <Button
                className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : "Update Game"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <CategoryDialog
        gameId={gameId}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default EditGame;