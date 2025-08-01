import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CurrencyConfigFormData } from '@/types/currency.schema';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Diamond } from 'lucide-react';

const predefinedUnits = [
  'Gold',
  'Coins',
  'Credits',
  'Gems',
  'Diamonds',
  'Points',
  'Tokens',
  'Silver',
  'Platinum',
];

const BasicConfig = ({
  form,
}: {
  form: UseFormReturn<CurrencyConfigFormData>; // Adjust type as needed
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-6 bg-yellow-600 rounded-full" />
        <h2 className="text-xl font-semibold text-gray-800">
          Basic Configuration
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <Label className="block text-gray-700 font-medium mb-1">
            Base Amount <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Diamond />
            </span>
            <Input
              {...form.register('amount')}
              type="number"
              placeholder="Enter base amount"
              className="w-full pl-10 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            The base amount of currency provided
          </p>
        </div>

        <div>
          <Label className="block text-gray-700 font-medium mb-1">
            Currency Unit <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={form.control}
            name="unit"
            defaultValue="Gold"
            render={({ field }) => {
              const isPredefined = predefinedUnits.includes(field.value);

              return (
                <>
                  <Select
                    value={isPredefined ? field.value : 'Custom'}
                    onValueChange={(value) => {
                      field.onChange(value === 'Custom' ? '' : value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Custom"
                        className="
                          bg-gray-300 text-black hover:bg-gray-500 transition-colors"
                      >
                        Custom
                      </SelectItem>
                      {predefinedUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!isPredefined && (
                    <Input
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="Enter custom unit"
                      className="mt-2"
                    />
                  )}
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicConfig;
