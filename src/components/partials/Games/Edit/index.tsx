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
import { ChevronLeft, Languages, Plus, Trash2, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import CategoryDialog from './dialog';
import Image from 'next/image';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import ErrorInput from '@/components/error';

const EditGame = ({ gameId }: { gameId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGameAllDataByID(gameId);
  const { mutate, isPending } = useUpdateGame(gameId);
  const { mutate: mutateCategory } = useDeleteGameCategory(gameId);

  const [openDialog, setOpenDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const keywordInputRefs = useRef<HTMLInputElement[]>([]);
  const gameData: Game = data?.data;

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
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
      seo:
        Array.isArray(gameData?.seo) && gameData?.seo?.length > 0
          ? gameData?.seo
          : [{ language: 'EN', title: '', description: '', keywords: [] }],
    },
  });

  const { fields: transFields, append: appendTrans, remove: removeTrans } = useFieldArray({
    control,
    name: 'translations',
  });

  const { fields: seoFields, append: appendSeo, remove: removeSeo } = useFieldArray({
    control,
    name: 'seo',
  });

  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (gameData) {
      reset({
        slug: gameData.slug,
        translations: Array.isArray(gameData.translations) && gameData.translations.length > 0
          ? gameData.translations
          : [{ language: 'EN', name: '', description: '' }],
        seo: Array.isArray(gameData.seo) && gameData.seo.length > 0
          ? gameData.seo
          : [{ language: 'EN', title: '', description: '', keywords: [] }],
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

    const payload = {
      slug: data.slug,
      imageUrl: imageValue,
      translations: data.translations,
      seo: data.seo,
    };

    mutate(payload, {
      onSuccess: () => {
        router.push('/games');
      },
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);

      const fileList: FileList = {
        0: file,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
      } as unknown as FileList;

      setValue('imageUrl', fileList);
    }
  };

  // Handle keyword input for SEO section
  const handleKeywordKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = keywordInputRefs.current[index];
      const value = input.value.trim();

      if (value) {
        const currentKeywords = watch(`seo.${index}.keywords`) || [];
        if (!currentKeywords.includes(value)) {
          setValue(`seo.${index}.keywords`, [...currentKeywords, value]);
        }
        input.value = '';
      }
    }
  };

  const removeKeyword = (index: number, keywordIndex: number) => {
    const currentKeywords = [...(watch(`seo.${index}.keywords`) || [])];
    currentKeywords.splice(keywordIndex, 1);
    setValue(`seo.${index}.keywords`, currentKeywords);
  };

  // Extract ref for register + manual control
  const {
    ref: inputRef,
    ...imageRest
  } = register('imageUrl');

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
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">Game Image</h2>
              </div>

              <div className="mt-4">
                <div
                  className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 min-h-[300px] flex flex-col items-center justify-center"
                  onClick={handleImageClick}
                >
                  <input
                    type="file"
                    accept="image/*"
                    {...imageRest}
                    ref={(e) => {
                      inputRef(e); // react-hook-form ref
                      fileInputRef.current = e; // manual access
                    }}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="w-full max-w-3xl mx-auto aspect-video bg-white rounded-lg border shadow-sm overflow-hidden group">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full bg-white"
                        width={1200}
                        height={630}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
                        <Upload className="size-6 text-blue-600" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">Upload Game Image</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Recommended size: 1200×630 pixels • PNG, JPG, GIF up to 10MB
                      </p>
                      <Button variant="outline" className="mt-4" onClick={handleImageClick}>
                        Select Image
                      </Button>
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

            {/* SEO Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-800">SEO</h2>
                </div>
              </div>
              <div className="space-y-6">
                {seoFields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Languages className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">SEO #{index + 1}</h3>
                      </div>
                      {seoFields.length > 1 && (
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => removeSeo(index)}>
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-gray-700 mb-1 block">Language Code</Label>
                        <Input {...register(`seo.${index}.language` as const)} placeholder="EN" className="py-3 px-4 rounded-lg border-gray-300" />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-gray-700 mb-1 block">Meta Title</Label>
                        <Input {...register(`seo.${index}.title` as const)} placeholder="Meta title" className="py-3 px-4 rounded-lg border-gray-300" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">Meta Description</Label>
                      <Controller
                        control={control}
                        name={`seo.${index}.description` as const}
                        render={({ field }) => (
                          <SunEditor
                            {...field}
                            onChange={(content) => field.onChange(content)}
                            setContents={field.value}
                            setOptions={{
                              height: '200',
                              buttonList: [
                                ['undo', 'redo'],
                                ['formatBlock', 'fontSize'],
                                ['bold', 'underline', 'italic', 'strike'],
                                ['fontColor', 'hiliteColor'],
                                ['align', 'list', 'lineHeight'],
                                ['table', 'link', 'image', 'video'],
                                ['fullScreen', 'showBlocks', 'codeView'],
                              ],
                            }}
                          />
                        )}
                      />
                      {errors.seo?.[index]?.description && (
                        <ErrorInput>{errors.seo[index].description?.message as string}</ErrorInput>
                      )}
                    </div>

                    {/* Keywords/Tags Section */}
                    <div className="mt-6">
                      <Label className="text-gray-700 mb-2 block">Keywords (Press Enter to add)</Label>
                      <div className="border border-gray-300 rounded-lg p-2 bg-white">
                        {/* Keyword Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(watch(`seo.${index}.keywords`) || []).map((keyword, keywordIndex) => (
                            <div
                              key={keywordIndex}
                              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              <span>{keyword}</span>
                              <button
                                type="button"
                                onClick={() => removeKeyword(index, keywordIndex)}
                                className="text-blue-800 hover:text-blue-900"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Keyword Input */}
                        <input
                          type="text"
                          placeholder="Type keyword and press Enter"
                          className="w-full py-2 px-3 border-none focus:outline-none text-sm"
                          onKeyDown={(e) => handleKeywordKeyDown(index, e)}
                          ref={(el) => {
                            if (el) keywordInputRefs.current[index] = el;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => appendSeo({ language: 'EN', title: '', description: '', keywords: [] })}>
                  <Plus className="size-4" /> Add SEO Entry
                </Button>
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
                  onClick={() => appendTrans({ language: '', name: '', description: '' })}
                >
                  + Add Translation
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-1 mb-4">Manage translations for different languages</p>

              <div className="space-y-6">
                {transFields.map((field, index) => (
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
                        onClick={() => removeTrans(index)}
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
                      <Controller
                        control={control}
                        name={`translations.${index}.description`}
                        render={({ field }) => (
                          <SunEditor
                            {...field}
                            onChange={(content) => field.onChange(content)}
                            setContents={field.value}
                            setOptions={{
                              height: '200',
                              buttonList: [
                                ['undo', 'redo'],
                                ['formatBlock', 'fontSize'],
                                ['bold', 'underline', 'italic', 'strike'],
                                ['fontColor', 'hiliteColor'],
                                ['align', 'list', 'lineHeight'],
                                ['table', 'link', 'image', 'video'],
                                ['fullScreen', 'showBlocks', 'codeView'],
                              ],
                            }}
                          />
                        )}
                      />
                      {errors.translations?.[index]?.description && (
                        <ErrorInput>
                          {errors.translations[index].description?.message as string}
                        </ErrorInput>
                      )}
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