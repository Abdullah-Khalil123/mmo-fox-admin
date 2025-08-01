/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import ErrorInput from '@/components/error';
import Image from 'next/image';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  CategoryFormData,
  ServiceFormData,
  serviceSchema,
} from '@/types/game.schema';
import { ServiceStatus, ServiceType } from '@/types/enums';
import { useCreateServiceByGameId } from '@/hooks/useServices';
import CategorySection from '../CategorySection/CategorySection';

export default function AddNewGameService({
  gameId,
}: {
  gameId: string | number;
}) {
  const router = useRouter();
  const { mutate, isPending } = useCreateServiceByGameId(gameId);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<CategoryFormData>({
    name: '',
    slug: '',
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      slug: '',
      imageUrl: '' as any,
      currency: 'USD',
      status: ServiceStatus.PUBLISHED,
      type: ServiceType.COACHING,
      vendor: '',
      seo: [
        {
          language: 'EN',
          metaTitle: '',
          metaDescription: '',
          introduction: '',
          keywords: [],
        },
      ],
      categories: [],
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

  // If 'categories' is not an array in ServiceFormData, remove useFieldArray for categories and manage categories with useState instead.
  // If 'categories' should be an array, ensure ServiceFormData defines categories as an array type.
  // Example fix assuming categories should be managed with useState:

  // Remove useFieldArray for categories and use useState to manage categories
  const [categoryFields, setCategoryFields] = useState<CategoryFormData[]>([]);
  const appendCategory = (category: { name: string; slug: string }) =>
    setCategoryFields((prev) => [...prev, category]);
  const removeCategory = (index: number) =>
    setCategoryFields((prev) => prev.filter((_, i) => i !== index));

  const imageUrl = watch('imageUrl');
  const gameName = watch('name');

  console.log('categoryFields', categoryFields);

  useEffect(() => {
    if (imageUrl && typeof imageUrl !== 'string' && imageUrl.length > 0) {
      const file = imageUrl[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUrl]);

  const onSubmit = (data: ServiceFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    // formData.append('description', data.description ?? '');
    formData.append('currency', data.currency);
    formData.append('status', data.status);
    formData.append('type', data.type);
    formData.append('vendorId', data.vendor);
    // // formData.append('basePrice', data.basePrice.toString());
    // formData.append('published', data.status.toString());

    formData.append(
      'seo',
      JSON.stringify(
        data.seo.map((seo) => ({
          ...seo,
          keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
        }))
      )
    );

    formData.append('categories', JSON.stringify(categoryFields));

    if (data.imageUrl && typeof data.imageUrl !== 'string') {
      formData.append('service-image', data.imageUrl[0]);
    } else if (typeof data.imageUrl === 'string') {
      formData.append('image-url', data.imageUrl);
    }

    console.log(formData);
    console.log(data);

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

  const handleAutoTranslate = (index: number) => {
    setValue(
      `seo.${index}.metaTitle`,
      `Auto-translated SEO title for ${gameName}`
    );
    setValue(
      `seo.${index}.metaDescription`,
      `Auto-translated SEO description for ${gameName}`
    );
    setValue(
      `seo.${index}.introduction`,
      `Auto-translated introduction for ${gameName}`
    );
  };

  const { ref: inputRef, ...imageRest } = register('imageUrl');

  const handleAddCategory = () => {
    if (newCategory.name) {
      appendCategory({
        name: newCategory.name,
        slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      });
      setNewCategory({ name: '', slug: '' });
      setCategoryModalOpen(false);
    }
  };

  // Mock vendor data
  const vendors = [
    { id: '1', name: 'Vendor A' },
    { id: '2', name: 'Vendor B' },
    { id: '3', name: 'Vendor C' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Create New Game Service
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Fill in the details below to create a new game service. All fields
            marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit as (data: any) => void)}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6 sm:p-8 space-y-8">
          {/* Service Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-semibold text-gray-800">
                Service Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-gray-700 font-medium">
                  Service Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('name')}
                  placeholder="Enter service name"
                  className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.name && <ErrorInput>{errors.name.message}</ErrorInput>}
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Service Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('slug')}
                  placeholder="Enter slug"
                  className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.slug && <ErrorInput>{errors.slug.message}</ErrorInput>}
              </div>
            </div>

            {/* Description Field */}
            {/* <div className="mt-6">
              <Label className="text-gray-700 font-medium">Description <span className="text-red-500">*</span></Label>
              <Controller
                control={control}
                name="description"
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
              {errors.description && <ErrorInput>{errors.description.message}</ErrorInput>}
            </div> */}

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Currency Dropdown */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field} // ← includes onChange, onBlur, value, ref
                      onValueChange={field.onChange} // (Select uses onValueChange instead of onChange)
                      value={field.value}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.currency && (
                  <ErrorInput>{errors.currency.message}</ErrorInput>
                )}
              </div>

              {/* Status Dropdown */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={ServiceStatus.PUBLISHED}
                  render={({ field }) => (
                    <Select
                      {...field} // ← includes onChange, onBlur, value, ref
                      onValueChange={field.onChange} // (Select uses onValueChange instead of onChange)
                      value={field.value}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ServiceStatus.PUBLISHED}>
                          Published
                        </SelectItem>
                        <SelectItem value={ServiceStatus.UNPUBLISHED}>
                          Unpublished
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <ErrorInput>{errors.status.message}</ErrorInput>
                )}
              </div>

              {/* Type Dropdown - FIXED VALUES */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Service Type <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={ServiceType.COACHING}
                  render={({ field }) => (
                    <Select
                      {...field} // ← includes onChange, onBlur, value, ref
                      onValueChange={field.onChange} // (Select uses onValueChange instead of onChange)
                      value={field.value}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ServiceType.COACHING}>
                          Coaching
                        </SelectItem>
                        <SelectItem value={ServiceType.BOOSTING}>
                          Boosting
                        </SelectItem>
                        <SelectItem value={ServiceType.LEVELING}>
                          Leveling
                        </SelectItem>
                        <SelectItem value={ServiceType.CURRENCY}>
                          Currency
                        </SelectItem>
                        <SelectItem value={ServiceType.OTHER}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && <ErrorInput>{errors.type.message}</ErrorInput>}
              </div>

              {/* Vendor Dropdown */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Vendor <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="vendor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.vendor && (
                  <ErrorInput>{errors.vendor.message}</ErrorInput>
                )}
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
                    Upload Service Image
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
            {errors.imageUrl && (
              <ErrorInput>{errors.imageUrl.message as string}</ErrorInput>
            )}
          </div>

          {/* Categories Section */}
          <CategorySection
            categoryFields={categoryFields}
            setCategoryFields={setCategoryFields}
            categoryModalOpen={categoryModalOpen}
            setCategoryModalOpen={setCategoryModalOpen}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleAddCategory={handleAddCategory}
            removeCategory={removeCategory}
            CategoryField={{ name: '', slug: '' }} // Pass a default or appropriate value for CategoryField
          />

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

                  <div className="mt-4">
                    <Label className="text-gray-700 mb-1 block">
                      {' '}
                      Introduction
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
                'Create Service'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
