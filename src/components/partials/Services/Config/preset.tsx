import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CurrencyConfigFormData } from '@/types/currency.schema';
import { X } from 'lucide-react';
import React from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';

const Preset = ({
  preset,
  index,
  currencyUnit,
  presetFeild,
}: {
  preset: { id: string; amount: number };
  index: number;
  currencyUnit: string;
  presetFeild: UseFieldArrayReturn<CurrencyConfigFormData, 'presets'>;
}) => {
  return (
    <div
      key={index}
      className="border border-gray-200 rounded-xl p-4 bg-gray-50"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700">Preset #{index + 1}</h3>
        <Button onClick={() => presetFeild.remove(index)} variant={'ghost'}>
          <X />
        </Button>
      </div>

      <div>
        <label className="block text-gray-600 text-sm mb-1">Amount</label>
        <div className="relative">
          <Input
            type="number"
            min={0}
            value={presetFeild.fields[index].amount}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            onChange={(e) =>
              presetFeild.update(index, {
                ...preset,
                amount: Number(e.target.value),
              })
            }
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            {currencyUnit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preset;
