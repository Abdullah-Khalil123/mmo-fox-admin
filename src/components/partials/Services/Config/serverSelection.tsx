'use client';
import { UseFieldArrayReturn, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { CirclePlus, Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ServerFormData, RegionFormData } from '@/types/servers.schema';
import { CurrencyConfigFormData } from '@/types/currency.schema';

type Props = {
  servers: ServerFormData[];
  currencyUnit: string;
  amount?: number;
  serverField: UseFieldArrayReturn<CurrencyConfigFormData, 'servers'>;
};
type RegionFormInputs = {
  name: string;
  serverName?: string;
  serverPrice?: number;
};

const ServerSelection = ({
  servers,
  currencyUnit,
  serverField,
  amount,
}: Props) => {
  const [openServerDialog, setOpenServerDialog] = useState<string | null>(null);
  const [openRegionDialog, setOpenRegionDialog] = useState(false);

  // Temporary forms for dialog inputs
  const serverForm = useForm<ServerFormData>({
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  const regionForm = useForm<RegionFormInputs>({
    defaultValues: {
      name: '',
      serverName: '',
      serverPrice: 0,
    },
  });

  const grouped = servers.reduce<{
    [key: string]: {
      regionId: string;
      name: string;
      servers: ServerFormData[];
    };
  }>((acc, server) => {
    const regionId = server?.region?.id ?? 'regionless';
    const regionName = server?.region?.name ?? 'No Region';

    if (!acc[regionId]) {
      acc[regionId] = {
        regionId,
        name: regionName,
        servers: [],
      };
    }

    acc[regionId].servers.push(server);
    return acc;
  }, {});

  const groupedRegions = Object.values(grouped);

  const onSubmitServer = (data: ServerFormData, regionId: string) => {
    const currentRegion = groupedRegions.find((g) => g.regionId === regionId);

    // Generate a unique ID for the new server
    const newServerId = Date.now().toString();

    const newServer: ServerFormData = {
      id: newServerId,
      name: data.name,
      price: data.price,
      region:
        regionId === 'regionless'
          ? null
          : ({
              id: regionId,
              name: currentRegion?.name || '',
            } as RegionFormData),
    };

    // Use your existing serverFeild prop to append to the main form
    serverField.append(newServer);
    serverForm.reset();
    setOpenServerDialog(null);
  };

  const onSubmitRegion = (data: RegionFormInputs) => {
    // Generate a unique ID for the new region
    const newRegionId = `r${Date.now()}`;

    // Create a server for the new region to make it appear in the UI
    const newRegionServer: ServerFormData = {
      name: data.serverName || '',
      price: Number(data.serverPrice) || 0,
      region: data.name
        ? ({
            id: newRegionId,
            name: data.name,
          } as RegionFormData)
        : null,
    };

    // Use your existing serverFeild prop to append to the main form
    serverField.append(newRegionServer);
    regionForm.reset();
    setOpenRegionDialog(false);
  };

  const removeServer = (index: number) => {
    serverField.remove(index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-800">
            Server Configuration
          </h2>
        </div>
        <Dialog open={openRegionDialog} onOpenChange={setOpenRegionDialog}>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Plus className="mr-1 h-4 w-4" />
              Add Region
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create New Region</DialogTitle>
            <form
              onSubmit={regionForm.handleSubmit(onSubmitRegion)}
              className="space-y-4 mt-4"
            >
              <div>
                <Input
                  placeholder="Region Name (e.g., Asia Pacific North)"
                  {...regionForm.register('name', { required: false })}
                />
                <p className="mx-2 mt-2 text-xs text-red-500">
                  Leave blank for Regionless
                </p>
              </div>
              <Input
                placeholder="Server Name"
                {...regionForm.register('serverName', { required: true })}
              />
              <Input
                placeholder={`Price`}
                type="number"
                {...regionForm.register('serverPrice', { required: true })}
              />
              <Button type="submit" className="w-full">
                Create Region
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-muted-foreground">
        Select the servers where this currency service will be available. You
        can create new regions and add servers to them.
      </p>

      <div className="space-y-6">
        {groupedRegions.map((group, idx) => (
          <div
            key={group.regionId + idx}
            className="border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                🖥️ {group.name}
                <span className="text-xs text-gray-500 font-normal">
                  ({group.servers.length} server
                  {group.servers.length !== 1 ? 's' : ''})
                </span>
              </h3>
              <Dialog
                open={openServerDialog === group.regionId}
                onOpenChange={(open) =>
                  setOpenServerDialog(open ? group.regionId : null)
                }
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenServerDialog(group.regionId)}
                  >
                    <CirclePlus className="mr-1 h-4 w-4" />
                    Add Server
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add Server to {group.name}</DialogTitle>
                  <form
                    onSubmit={serverForm.handleSubmit((data) =>
                      onSubmitServer(data, group.regionId)
                    )}
                    className="space-y-4 mt-4"
                  >
                    <Input
                      placeholder="Server Name"
                      {...serverForm.register('name', { required: true })}
                    />
                    <Input
                      placeholder="Price per 1000 units"
                      type="number"
                      step="0.01"
                      {...serverForm.register('price', {
                        required: true,
                        min: 0,
                        valueAsNumber: true,
                      })}
                    />
                    <Button type="submit" className="w-full">
                      Save Server
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {serverField.fields.map((field, index) => {
                const match =
                  field.region?.id === group.regionId ||
                  (!field.region && group.regionId === 'regionless');
                if (!match) return null;

                return (
                  <div
                    key={field.id ?? `${field.name}-${index}`}
                    className="p-3 rounded-lg border cursor-pointer transition-all relative group hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="font-medium text-gray-800">
                          {field.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeServer(index);
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded text-xs"
                          type="button"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Price per {amount} {currencyUnit}
                      </span>
                      <span className="font-semibold text-green-600">
                        ${Number(field.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerSelection;
