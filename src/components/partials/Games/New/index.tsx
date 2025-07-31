'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateGame } from '@/hooks/useGames';
import {
  ChevronLeft,
  Plus,
  Trash2,
  Upload,
  LanguagesIcon,
  Bot,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState, useRef } from 'react';
import { GameFormData, gameSchema } from '@/types/game.schema';
import ErrorInput from '@/components/error';
import Image from 'next/image';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function AddNewGames() {
  const router = useRouter();
  const { mutate, isPending } = useCreateGame();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      name: '', // Added name field at top level
      slug: '',
      seo: [
        {
          language: 'EN',
          metaTitle: '',
          metaDescription: '',
          introduction: '',
          keywords: [],
        },
      ],
    },
  });

  const {
    fields: seoFields,
    append: appendSeo,
    remove: removeSeo,
  } = useFieldArray({
    control,
    name: 'seo',
  });

  const imageUrl = watch('imageUrl');
  // const gameName = watch('name');

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const onSubmit = (data: GameFormData) => {
    interface ProcessedSeoItem {
      language: string;
      metaTitle: string;
      metaDescription: string;
      introduction: string;
      keywords: string[];
    }

    interface ProcessedData {
      name: string;
      slug: string;
      imageUrl?: FileList;
      seo: ProcessedSeoItem[];
    }

    const processedData: ProcessedData = {
      name: data.name,
      slug: data.slug,
      imageUrl: typeof data.imageUrl === 'string' ? undefined : data.imageUrl,
      seo: data.seo.map(
        (seoItem: {
          language: string;
          metaTitle: string;
          metaDescription: string;
          introduction: string;
          keywords?: string | string[];
        }): ProcessedSeoItem => ({
          ...seoItem,
          keywords:
            typeof seoItem.keywords === 'string'
              ? seoItem.keywords.split(',').map((k: string) => k.trim())
              : Array.isArray(seoItem.keywords)
              ? seoItem.keywords
              : [],
        })
      ),
    };

    const formData = new FormData();

    formData.append('name', processedData.name);
    formData.append('slug', processedData.slug);
    formData.append('seo', JSON.stringify(processedData.seo));

    if (data.imageUrl && data.imageUrl.length > 0) {
      formData.append('game-image', data.imageUrl[0]);
    }

    mutate(formData, {
      onSuccess: () => router.push('/games'),
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setImagePreview(url);
  //     const fileList = { 0: file, length: 1, item: (i: number) => (i === 0 ? file : null) } as unknown as FileList;
  //     setValue('imageUrl', fileList);
  //   }
  // };

  // Auto-translation functions (mock implementation)
  const handleAutoTranslate = (index: number) => {
    // In a real implementation, this would call an API

    setValue(
      `seo.${index}.metaTitle`,
      `Auto-translated SEO title for ${watch('name')}`
    );
    setValue(
      `seo.${index}.metaDescription`,
      `Auto-translated SEO description for ${watch('name')}`
    );
    setValue(
      `seo.${index}.introduction`,
      `Auto-translated introduction for ${watch('name' as const)}`
    );
  };

  // extract ref for file input
  const { ref: inputRef, ...imageRest } = register('imageUrl');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Create New Game
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Fill in the details to add a new game to your platform
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6 sm:p-8 space-y-8">
          {/* Game Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-semibold text-gray-800">
                Game Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-gray-700 font-medium">
                  Game Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('name')}
                  placeholder="Enter game name"
                  className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && <ErrorInput>{errors.name.message}</ErrorInput>}
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Game Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('slug')}
                  placeholder="Enter slug"
                  className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.slug && <ErrorInput>{errors.slug.message}</ErrorInput>}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <div
              onClick={handleImageClick}
              className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 cursor-pointer bg-gray-50 min-h-[300px] flex items-center justify-center"
            >
              <input
                type="file"
                accept="image/*"
                {...imageRest}
                ref={(e) => {
                  inputRef(e);
                  fileInputRef.current = e;
                }}
                // onChange={handleFileChange}
                className="hidden"
              />
              {imagePreview ? (
                <div className="w-full max-w-3xl mx-auto aspect-video bg-white rounded-lg border shadow-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={1200}
                    height={630}
                    className="object-cover w-full h-full bg-white"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="size-6 text-blue-600 bg-blue-100 p-3 rounded-full mb-3 inline-block" />
                  <p className="text-lg font-medium text-gray-700">
                    Upload Game Image
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Recommended size: 1200×630 pixels • PNG, JPG, GIF up to 10MB
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleImageClick}
                  >
                    Select Image
                  </Button>
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
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() =>
                  appendSeo({
                    language: 'EN',
                    metaTitle: '',
                    metaDescription: '',
                    introduction: '',
                    keywords: [],
                  })
                }
              >
                <Plus className="size-4" /> Add SEO Entry
              </Button>
            </div>
            <div className="space-y-6">
              {seoFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <LanguagesIcon className="size-5 text-blue-600" />
                      <h3 className="font-medium text-gray-700">
                        SEO #{index + 1}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleAutoTranslate(index)}
                      >
                        <Bot className="size-4" />
                        Auto Translate
                      </Button>
                      {seoFields.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => removeSeo(index)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-700 mb-1 block">
                        Language Code
                      </Label>
                      <Input
                        {...register(`seo.${index}.language` as const)}
                        placeholder="EN"
                        className="py-3 px-4 rounded-lg border-gray-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-700 mb-1 block">
                        Meta Title
                      </Label>
                      <Input
                        {...register(`seo.${index}.metaTitle` as const)}
                        placeholder="Meta title"
                        className="py-3 px-4 rounded-lg border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label className="text-gray-700 mb-1 block">
                      Meta Description
                    </Label>
                    <textarea
                      {...register(`seo.${index}.metaDescription` as const)}
                      placeholder="Meta description"
                      className="w-full py-3 px-4 rounded-lg border border-gray-300 min-h-[100px]"
                    />
                    {errors.seo?.[index]?.metaDescription && (
                      <ErrorInput>
                        {errors.seo[index].metaDescription?.message as string}
                      </ErrorInput>
                    )}
                  </div>

                  {/* New Introduction Field */}
                  <div className="mt-4">
                    <Label className="text-gray-700 mb-1 block">
                      Game Introduction
                    </Label>
                    <Controller
                      control={control}
                      name={`seo.${index}.introduction` as const}
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
                    {errors.seo?.[index]?.introduction && (
                      <ErrorInput>
                        {errors.seo[index].introduction?.message as string}
                      </ErrorInput>
                    )}
                  </div>

                  {/* Keywords/Tags Section */}
                  <div className="mt-6">
                    <div className="mt-4">
                      <Label className="text-gray-700 mb-1 block">
                        Keywords
                      </Label>
                      <p className="text-sm text-gray-500 mb-2">
                        Comma-separated list of keywords
                      </p>
                      <Input
                        {...register(`seo.${index}.keywords` as const)}
                        placeholder="keyword1, keyword2, keyword3"
                        className="py-3 px-4 rounded-lg border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-gray-200 flex-col sm:flex-row">
            <Button
              variant="outline"
              className="py-5 sm:py-6 text-base rounded-xl border-gray-300 hover:bg-gray-50 flex-1"
              onClick={() => router.push('/games')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Game'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
