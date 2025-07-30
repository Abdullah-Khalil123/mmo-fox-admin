'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft } from 'lucide-react';
import PasswordInput from './password';
import { useEditUser, useUser } from '@/hooks/useUsers';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserRole, userSchema } from '@/types/user.schema';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditUser({ userId }: { userId: string | number }) {
  const { data, isLoading, isError } = useUser(userId);
  const { mutate, isPending: EditPending } = useEditUser(userId);
  const router = useRouter();

  const user = data?.data || {};

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'CUSTOMER',
    },
  });
  useEffect(() => {
    if (data) {
      const user = data.data;
      form.reset({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'CUSTOMER',
      });
    }
  }, [form, data]);

  const onSubmit = (user: User) => {
    mutate(user, {
      onSuccess: () => {
        router.push('/users');
      },
      onError: (error) => {
        console.error('Error updating user:', error);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <Link href={'/users'}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Edit User
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Update user information and settings
          </p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <Label className="text-gray-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register('name')}
                    placeholder="Enter full name"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register('email')}
                    type="email"
                    placeholder="Enter email address"
                    className="py-4 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Account Security
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <PasswordInput />
                <div>
                  <Label className="text-gray-700 font-medium">
                    User Role <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(UserRole).map((role) => (
                            <SelectItem key={role} value={role}>
                              {role.charAt(0).toUpperCase() +
                                role.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}{' '}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* User Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Account Status
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label
                    htmlFor="isActive"
                    className="text-gray-700 font-medium"
                  >
                    Active Account
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="emailVerified"
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <Label
                    htmlFor="emailVerified"
                    className="text-gray-700 font-medium"
                  >
                    Email Verified
                  </Label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-gray-600 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Additional Information
                </h2>
              </div>
              <div className="mt-4">
                <Label className="text-gray-700 font-medium">Notes</Label>
                <textarea
                  placeholder="Add any additional notes about this user..."
                  rows={4}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-vertical"
                />
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
                disabled={isLoading || isError || EditPending}
                type="submit"
                className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
              >
                Update User
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
