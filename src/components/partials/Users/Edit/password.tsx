'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { EyeOff, Eye } from 'lucide-react';
import React from 'react';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div>
      <Label className="text-gray-700 font-medium">
        Password <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          className="py-4 px-4 pr-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
