import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryFormData } from '@/types/game.schema';

type CategorySectionProps = {
  categoryFields: CategoryFormData[];
  setCategoryFields: React.Dispatch<React.SetStateAction<CategoryFormData[]>>;
  categoryModalOpen: boolean;
  setCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newCategory: CategoryFormData;
  setNewCategory: React.Dispatch<React.SetStateAction<CategoryFormData>>;
  handleAddCategory: () => void;
  removeCategory: (index: number) => void;
  CategoryField: CategoryFormData; // Adjust type if needed
};

const CategorySection: React.FC<CategorySectionProps> = ({
  categoryFields,
  categoryModalOpen,
  setCategoryModalOpen,
  newCategory,
  setNewCategory,
  handleAddCategory,
  removeCategory,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        </div>
        <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="size-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 font-medium">
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Enter category name"
                  className="py-4 px-4 rounded-lg border-gray-300"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">
                  Category Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={newCategory.slug}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, slug: e.target.value })
                  }
                  placeholder="Enter category slug"
                  className="py-4 px-4 rounded-lg border-gray-300"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCategoryModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4">
        {categoryFields.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categoryFields.map((field: CategoryFormData, index: number) => (
              <div
                key={`${field.name}-${index}`}
                className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-white shadow-sm"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {field.name}
                  </span>
                  {field.slug && (
                    <p className="text-xs text-gray-500 mt-1">{field.slug}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => removeCategory(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">No categories added yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Add categories to organize your game
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
