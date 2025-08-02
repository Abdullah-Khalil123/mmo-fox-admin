import { Button } from '@/components/ui/button';
import React, { useEffect, useRef } from 'react';
import Preset from './preset';
import BasicConfig from './basicConfig';
import ServerSelection from './serverSelection';
import { useFieldArray, useForm } from 'react-hook-form';
import { CurrencyConfigFormData } from '@/types/currency.schema';
import {
  useCreateCurrencyConfig,
  useGetCurrencyConfig,
} from '@/hooks/useCurrencyConfig';

// Corrected server data structure

export default function CurrencyConfigUI({ serviceId }: { serviceId: string }) {
  const { mutate, isPending } = useCreateCurrencyConfig(serviceId);
  const { data, isLoading } = useGetCurrencyConfig(serviceId);

  const form = useForm<CurrencyConfigFormData>({
    defaultValues: {
      serviceId,
      amount: 0,
      unit: 'Gold',
      presets: [{ amount: 500 }, { amount: 1000 }],
      servers: [],
    },
  });

  const presetFeild = useFieldArray({
    control: form.control,
    name: 'presets',
  });

  const serverField = useFieldArray({
    control: form.control,
    name: 'servers',
  });

  const currencyUnit = form.getValues('unit');
  const servers = form.getValues('servers');

  const onSubmit = (data: CurrencyConfigFormData) => {
    mutate(data, {
      onSuccess: () => {
        console.log('Currency Config saved successfully');
      },
      onError: (error) => {
        console.error('Error saving Currency Config:', error);
      },
    });
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (isLoading || hasInitialized.current) return;
    const currencyConfig: CurrencyConfigFormData = data?.data;
    if (currencyConfig) {
      form.reset({
        serviceId,
        amount: currencyConfig.amount,
        unit: currencyConfig.unit,
        presets: currencyConfig.presets?.length
          ? currencyConfig.presets
          : [{ amount: 500 }, { amount: 1000 }],
        servers: currencyConfig.servers || [],
      });
      hasInitialized.current = true;
    }
  }, [data, form, serverField, isLoading]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button className="p-2 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
          ←
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Currency Service Configuration
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Configure currency amounts, units, presets, and available servers
            for your currency service.
          </p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8">
            {/* Basic Configuration */}
            <BasicConfig form={form} />

            {/* Presets Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-yellow-600 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Amount Presets
                  </h2>
                </div>
                <Button
                  onClick={() => {
                    presetFeild.append({ amount: 0 });
                  }}
                  variant="secondary"
                >
                  + Add Preset
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                Create preset amounts that customers can quickly select
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {presetFeild.fields.map((preset, index) => (
                  <Preset
                    key={index}
                    currencyUnit={currencyUnit}
                    index={index}
                    preset={preset}
                    presetFeild={presetFeild}
                  />
                ))}
              </div>
            </div>

            {/* Server Selection */}
            <ServerSelection
              servers={servers}
              currencyUnit={currencyUnit}
              serverField={serverField}
              amount={form.watch('amount')}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button className="px-6 py-3 text-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-black transition-colors">
                Cancel
              </Button>
              <Button
                disabled={isPending || isLoading}
                type="submit"
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
              >
                ⚙️ Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
