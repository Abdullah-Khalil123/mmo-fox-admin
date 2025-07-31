'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGames } from '@/hooks/useGames';
import { useCreateNews } from '@/hooks/useNews';
import { GameFormData } from '@/types/game.schema';
import { NewsForm, newsSchema } from '@/types/news.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectPortal } from '@radix-ui/react-select';
import { ChevronLeft, Upload, Plus, X } from 'lucide-react';
import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function AddNewsForm() {
  const [imagePreview, setImagePreview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const { data } = useGames();
  const games: GameFormData[] = data?.data || [];
  const { mutate, isPending } = useCreateNews();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      published: true,
      imageUrl: undefined,
    },
  });

  const { ref: inputRef, ...restImage } = register('imageUrl');
  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0] as File;
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      const updatedTags = [...selectedTags, trimmedTag];
      setSelectedTags(updatedTags);
      setTagInput('');
      setValue('tags', updatedTags);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag: string) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = (data: NewsForm) => {
    console.log('Form Data:', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('description', data.description || '');
    formData.append('content', data.content);
    if (data.imageUrl && data.imageUrl.length > 0) {
      formData.append('news-image', data.imageUrl[0]);
    }
    formData.append('type', data.type);
    formData.append('gameId', data.gameId || '');
    formData.append('published', String(data.published));
    formData.append('isPinned', String(data.isPinned));
    formData.append('tags', JSON.stringify(data.tags || []));
    mutate(formData, {
      onSuccess: () => {
        // Handle success, e.g., show a success message or redirect
        console.log('News created successfully');
      },
      onError: (error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating news:', error);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Create New News
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Fill in the details to add a new news article
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Basic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <Label className="text-gray-700 font-medium">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('title')}
                    placeholder="Enter news title"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('slug')}
                    placeholder="Enter news slug"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    {...register('description')}
                    placeholder="Enter news description"
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Content & Media */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Content & Media
                </h2>
              </div>

              {/* Content Editor */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Content <span className="text-red-500">*</span>
                </Label>
                <div className="border border-gray-300 rounded-lg min-h-[300px] p-4 bg-gray-50">
                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                      <SunEditor
                        {...field}
                        setOptions={{
                          height: 'auto',
                          minHeight: '200',
                          buttonList: [
                            ['undo', 'redo'],
                            ['formatBlock', 'fontSize'],
                            ['bold', 'underline', 'italic', 'strike'],
                            ['fontColor', 'hiliteColor'],
                            ['align', 'list', 'lineHeight'],
                            ['table', 'link', 'image', 'video'],
                            ['fullScreen', 'showBlocks', 'codeView'],
                            ['preview'],
                          ],
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Featured Image
                </Label>
                <div
                  onClick={handleImageClick}
                  className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 cursor-pointer bg-gray-50 min-h-[250px] flex items-center justify-center"
                >
                  <Input
                    {...restImage}
                    ref={(e) => {
                      inputRef(e);
                      fileInputRef.current = e;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="w-full max-w-2xl mx-auto aspect-video bg-white rounded-lg border shadow-sm overflow-hidden relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        sizes="100vw"
                        className="object-cover bg-white"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="size-12 text-blue-600 bg-blue-100 p-3 rounded-full mb-3 inline-block" />
                      <p className="text-lg font-medium text-gray-700">
                        Upload Featured Image
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Recommended size: 1200×630 pixels • PNG, JPG, GIF up to
                        10MB
                      </p>
                      <Button type="button" variant="outline" className="mt-4">
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Categorization */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Categorization
                </h2>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* News Type */}
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    News Type <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                          <SelectValue placeholder="Select news type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ANNOUNCEMENT">
                            Announcement
                          </SelectItem>
                          <SelectItem value="NEWS">News</SelectItem>
                          <SelectItem value="NOTICE">Notice</SelectItem>
                          <SelectItem value="UPDATE">Update</SelectItem>
                          <SelectItem value="GUIDE">Guide</SelectItem>
                          <SelectItem value="EVENT">Event</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Associated Game */}
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    Associated Game
                  </Label>
                  <Controller
                    name="gameId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                          <SelectValue placeholder="Select Game (optional)" />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectContent>
                            {games.map((game) => (
                              <SelectItem key={game.id} value={`${game?.id}`}>
                                {game?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Tags
                </Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => {
                        setTagInput(e.target.value);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Add a tag..."
                      className="flex-1 py-3 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTag}
                      className="px-4 py-3"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Press Enter or click + to add tags
                </p>
              </div>
            </div>

            {/* Publishing Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Publishing Options
                </h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Input
                    {...register('published')}
                    type="checkbox"
                    id="publishNow"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label
                    htmlFor="publishNow"
                    className="text-gray-700 font-medium"
                  >
                    Publish immediately
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-7">
                  Check to publish this news immediately after saving
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Input
                    {...register('isPinned')}
                    type="checkbox"
                    id="isPinned"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label
                    htmlFor="isPinned"
                    className="text-gray-700 font-medium"
                  >
                    Pin this news
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-1 ml-7">
                  Check to pin this news at the top of the list
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-8 border-t border-gray-200 flex-col sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="py-5 sm:py-6 text-base rounded-xl border-gray-300 hover:bg-gray-50 flex-1"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
              >
                Publish News
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
