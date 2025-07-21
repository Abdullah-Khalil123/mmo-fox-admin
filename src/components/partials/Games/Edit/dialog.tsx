'use client';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateGameCategory } from '@/hooks/useGames';
import {
  CategoryFormData,
  categorySchema,
} from '@/types/game.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { useForm } from 'react-hook-form';

const CategoryDialog = ({
  openDialog,
  setOpenDialog,
  gameId,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  gameId: number | string;
}) => {
  const { mutate, isPending } = useCreateGameCategory(gameId);
  const { register, handleSubmit } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log('Category Data:', data);
    mutate(data, {
      onSuccess: () => {
        setOpenDialog(false);
      },
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                {...register('name')}
                id="categoryName"
                placeholder="Gold / Boosting etc."
              />
            </div>
            <div>
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                {...register('slug')}
                id="categorySlug"
                placeholder="slug"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isPending} onClick={() => {}}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
