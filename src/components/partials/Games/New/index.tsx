'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateGame } from '@/hooks/useGames';
import { ChevronLeft, Plus, Trash2, Languages, Upload, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState, useRef } from 'react';
import { GameFormData, gameSchema } from '@/types/game.schema';
import ErrorInput from '@/components/error';
import Image from 'next/image';

const AddNewGames = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateGame();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      slug: '',
      translations: [
        { language: 'EN', name: '', description: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'translations',
  });

  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const onSubmit = (data: GameFormData) => {
    const formData = new FormData();
    formData.append('slug', data.slug);

    formData.append('translations', JSON.stringify(data.translations));

    if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
      formData.append('game-image', data.imageUrl[0]);
    }

    mutate(formData, {
      onSuccess: () => {
        router.push('/games');
      },
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Create New Game</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Fill in the details to add a new game to your platform</p>
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
                  <p className="text-sm text-gray-500 mt-1 mb-2">Unique identifier for the game (e.g. &apos;my-awesome-game&apos;)</p>
                  <Input
                    {...register('slug')}
                    placeholder="Enter slug"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.slug && <ErrorInput >{errors.slug.message}</ErrorInput>}
                </div>
              </div>
            </div>

            {/* Image Upload Section - Fixed */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-800">Game Image</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                  <Label className="text-gray-700 font-medium flex items-center gap-1">
                    <span>Upload Image</span>
                    <span className="text-red-500">*</span>
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
                      <p className="text-sm font-medium text-gray-700">Click to upload an image</p>
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
                  <Plus className="size-4" />
                  Add Translation
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-1 mb-4">Add translations for different languages</p>

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

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-gray-700 mb-1 block">Language Code</Label>
                        <p className="text-sm text-gray-500 mb-2">e.g. EN, FR, ES</p>
                        <Input
                          {...register(`translations.${index}.language`)}
                          placeholder="EN"
                          className="py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-gray-700 mb-1 block">Game Name</Label>
                        <p className="text-sm text-gray-500 mb-2">Name in this language</p>
                        <Input
                          {...register(`translations.${index}.name`)}
                          placeholder="Enter game name"
                          className="py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Description</Label>
                      <p className="text-sm text-gray-500 mb-2">Short description of the game</p>
                      <textarea
                        {...register(`translations.${index}.description`)}
                        placeholder="Enter description"
                        rows={3}
                        className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {errors.translations && (
                <ErrorInput >{errors.translations?.message as string}</ErrorInput>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-gray-200 flex-col sm:flex-row">
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
                    Creating...
                  </span>
                ) : "Create Game"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewGames;