'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AddNewGames = () => {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow">
      <ChevronLeft
        className="bg-gray-200 p-1 size-8 rounded-full hover:bg-gray-300 cursor-pointer "
        onClick={() => {
          router.push('/games');
        }}
      />
      <h2 className="text-2xl font-semibold tracking-tight">Add New Game</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Game Name</Label>
          <Input id="name" placeholder="Enter game name" />
        </div>

        <div>
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input id="seoTitle" placeholder="Enter SEO title" />
        </div>

        <div>
          <Label htmlFor="seoDesc">SEO Description</Label>
          <Textarea id="seoDesc" placeholder="Enter SEO description" />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" placeholder="Enter slug" />
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" type="file" className="cursor-pointer" />
        </div>

        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
};

export default AddNewGames;
