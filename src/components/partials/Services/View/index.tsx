'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronLeft, LanguagesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { ServiceStatus, ServiceType } from '@/types/game';
import { useServiceById } from '@/hooks/useServices';

export default function ViewGameService({
  serviceId,
}: {
  serviceId: string | number;
}) {
  const router = useRouter();
  const { data: serviceData, isLoading } = useServiceById(serviceId);
  const [service, setService] = useState<typeof serviceData.data | null>(null);

  useEffect(() => {
    if (serviceData?.data) {
      setService(serviceData.data);
    }
  }, [serviceData]);

  if (isLoading || !service) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service data...</p>
        </div>
      </div>
    );
  }

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case ServiceStatus.PUBLISHED:
        return 'Published';
      case ServiceStatus.UNPUBLISHED:
        return 'Unpublished';
      default:
        return status;
    }
  };

  const getTypeText = (type: ServiceType) => {
    switch (type) {
      case ServiceType.COACHING:
        return 'Coaching';
      case ServiceType.BOOSTING:
        return 'Boosting';
      case ServiceType.LEVELING:
        return 'Leveling';
      case ServiceType.CURRENCY:
        return 'Currency';
      case ServiceType.OTHER:
        return 'Other';
      default:
        return type;
    }
  };

  // Mock vendor data - should come from API in real app
  const vendors = [
    { id: '7', name: 'Vendor A' },
    { id: '8', name: 'Vendor B' },
    { id: '9', name: 'Vendor C' },
  ];

  const getVendorName = (id: string) => {
    return vendors.find((v) => v.id === id)?.name || id;
  };

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
            View Game Service
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Viewing details for:{' '}
            <span className="font-medium text-gray-900">{service.name}</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                  Service Name
                </Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {service.name || '-'}
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Service Slug
                </Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {service.slug || '-'}
                </div>
              </div>
            </div>

            {/* Description Field */}
            {/* <div className="mt-6">
              <Label className="text-gray-700 font-medium">Description</Label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <SunEditor
                  setContents={service.description}
                  setOptions={{
                    height: 'auto',
                    buttonList: [],
                    mode: 'balloon',
                    resizingBar: false,
                    charCounter: false,
                    toolbarContainer: undefined,
                    showPathLabel: false
                  }}
                  disable={true}
                />
              </div>
            </div> */}

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <Label className="text-gray-700 font-medium">Currency</Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {service.currency || '-'}
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Status</Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {getStatusText(service.status)}
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">
                  Service Type
                </Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {getTypeText(service.type)}
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Vendor</Label>
                <div className="py-3 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700">
                  {getVendorName(service.vendorId)}
                </div>
              </div>
            </div>
          </div>

          {/* Image Display */}
          {service.imageUrl && (
            <div className="mt-4">
              <Label className="text-gray-700 font-medium block mb-3">
                Service Image
              </Label>
              <div className="w-full max-w-3xl mx-auto aspect-video bg-white rounded-lg border shadow-sm overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={1200}
                  height={630}
                  className="object-cover w-full h-full bg-white"
                />
              </div>
            </div>
          )}

          {/* Categories Section */}
          {service.categories?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Categories
                </h2>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.categories.map(
                    (
                      category: { name: string; description?: string },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                      >
                        <div>
                          <span className="font-medium text-gray-900">
                            {category.name}
                          </span>
                          {category.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SEO Section */}
          {service.seo?.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">SEO</h2>
              </div>

              <div className="space-y-6">
                {service.seo.map(
                  (
                    seo: {
                      language?: string;
                      metaTitle?: string;
                      metaDescription?: string;
                      introduction?: string;
                      keywords?: string[];
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <LanguagesIcon className="size-5 text-blue-600" />
                        <h3 className="font-medium text-gray-700">
                          SEO #{index + 1}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-gray-700 mb-1 block">
                            Language Code
                          </Label>
                          <div className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700">
                            {seo.language || '-'}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-gray-700 mb-1 block">
                            Meta Title
                          </Label>
                          <div className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700">
                            {seo.metaTitle || '-'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-gray-700 mb-1 block">
                          Meta Description
                        </Label>
                        <div className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 min-h-[100px]">
                          {seo.metaDescription || '-'}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-gray-700 mb-1 block">
                          Introduction
                        </Label>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <SunEditor
                            setContents={seo.introduction}
                            setOptions={{
                              height: 'auto',
                              buttonList: [],
                              mode: 'balloon',
                              resizingBar: false,
                              charCounter: false,
                              toolbarContainer: undefined,
                              showPathLabel: false,
                            }}
                            disable={true}
                          />
                        </div>
                      </div>

                      {Array.isArray(seo.keywords) &&
                        seo.keywords.length > 0 && (
                          <div className="mt-6">
                            <div className="mt-4">
                              <Label className="text-gray-700 mb-1 block">
                                Keywords
                              </Label>
                              <div className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700">
                                {seo.keywords.join(', ')}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex pt-8 border-t border-gray-200">
            <Button
              onClick={() => router.push('/games')}
              className="py-5 sm:py-6 text-base rounded-xl bg-gray-800 hover:bg-gray-900 flex-1 max-w-[200px]"
            >
              Back to Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
