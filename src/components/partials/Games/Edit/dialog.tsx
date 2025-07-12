import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React from 'react';

const CategoryDialog = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input id="categoryName" placeholder="Gold / Boosting etc." />
          </div>
          <div>
            <Label htmlFor="categorySlug">Slug</Label>
            <Input id="categorySlug" placeholder="slug" />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={() => setOpenDialog(false)}>Save</Button>
          <Button variant="secondary" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
