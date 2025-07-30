'use client';
import React from 'react';
import { ChevronLeft, Eye, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNewsById } from '@/hooks/useNews';
import { NewsForm } from '@/types/news.schema';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function AdminArticleView({ newsId }: { newsId: string }) {
  // Mock article data
  const { data, isLoading } = useNewsById(newsId);
  const news: NewsForm = data?.data || {};

  if (isLoading) {
    return <div className="text-center my-8">Loading...</div>;
  }
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Article Details
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              View and manage article content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="size-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Article Image */}
        {news.imageUrl && (
          <div className="relative h-80 overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={news.title || 'Article image'}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Article Meta */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Article ID
              </label>
              <p className="text-lg font-semibold text-gray-900">#{news.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Views</label>
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-gray-400" />
                <p className="text-lg font-semibold text-gray-900">
                  {news.views?.toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Created
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-gray-400" />
                <p className="text-sm text-gray-700">
                  {formatDate(news.createdAt)}
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Author
              </label>
              <div className="flex items-center gap-2">
                <User className="size-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {news.author.name}
                  </p>
                  <p className="text-xs text-gray-600">{news.author.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Title */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-500 mb-2 block">
              Title
            </label>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h2>
          </div>

          {/* Article Description */}
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-500 mb-2 block">
              Description
            </label>
            <p className="text-lg text-gray-600 leading-relaxed p-4 bg-gray-50 rounded-lg">
              {news.description || 'No description provided.'}
            </p>
          </div>

          {/* Article Content */}
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-500 mb-4 block">
              Content
            </label>
            <div className="prose prose-lg max-w-none p-6 bg-gray-50 rounded-xl">
              {news.content}
            </div>
          </div>

          {/* Last Updated */}
          {news.updatedAt !== news.createdAt && (
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="size-4" />
                <span>Last updated: {formatDate(news.updatedAt)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
