// app/currency-service/create/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Plus, Trash2, DollarSign, Globe, MapPin, Layers, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateServiceConfigCurrencyByServiceId } from '@/hooks/useServices';

interface Price {
      price: number;
      currency: string;
}

interface Subregion {
      name: string;
      price: Price[];
}

interface Region {
      name: string;
      subregion: Subregion[];
}

interface Country {
      country: string;
      region: Region[];
}

interface CurrencyPackage {
      amount: number;
      unit: string;
      server: Country[];
}

export default function CreateCurrencyService({
      serviceId,
}: {
      serviceId: string | number;
}) {
      const router = useRouter();
      const [packages, setPackages] = useState<CurrencyPackage[]>([
            {
                  amount: 0,
                  unit: '',
                  server: [
                        {
                              country: '',
                              region: [
                                    {
                                          name: '',
                                          subregion: [
                                                {
                                                      name: '',
                                                      price: [{ price: 0, currency: '' }]
                                                }
                                          ]
                                    }
                              ]
                        }
                  ]
            }
      ]);
      const { mutate, isPending } = useCreateServiceConfigCurrencyByServiceId(serviceId)

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            console.log('Submitting data:', packages);

            try {
                  const formData = new FormData();
                  formData.append('packages', JSON.stringify(packages));
                  await mutate(formData);
                  // Handle success (e.g., show notification, redirect)
                  console.log('Data submitted successfully');
                  // router.push(`/services/${serviceId}/config`);

            } catch (error) {
                  console.error('Error submitting data:', error);
                  // Handle error (e.g., show notification)

            }
      };

      // Package level functions
      const addPackage = () => {
            setPackages([
                  ...packages,
                  {
                        amount: 0,
                        unit: '',
                        server: [
                              {
                                    country: '',
                                    region: [
                                          {
                                                name: '',
                                                subregion: [
                                                      {
                                                            name: '',
                                                            price: [{ price: 0, currency: '' }]
                                                      }
                                                ]
                                          }
                                    ]
                              }
                        ]
                  }
            ]);
      };

      const removePackage = (index: number) => {
            const newPackages = [...packages];
            newPackages.splice(index, 1);
            setPackages(newPackages);
      };

      // Country level functions
      const addCountry = (pkgIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server.push({
                  country: '',
                  region: [
                        {
                              name: '',
                              subregion: [
                                    {
                                          name: '',
                                          price: [{ price: 0, currency: '' }]
                                    }
                              ]
                        }
                  ]
            });
            setPackages(newPackages);
      };

      const removeCountry = (pkgIndex: number, countryIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server.splice(countryIndex, 1);
            setPackages(newPackages);
      };

      // Region level functions
      const addRegion = (pkgIndex: number, countryIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region.push({
                  name: '',
                  subregion: [
                        {
                              name: '',
                              price: [{ price: 0, currency: '' }]
                        }
                  ]
            });
            setPackages(newPackages);
      };

      const removeRegion = (pkgIndex: number, countryIndex: number, regionIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region.splice(regionIndex, 1);
            setPackages(newPackages);
      };

      // Subregion level functions
      const addSubregion = (pkgIndex: number, countryIndex: number, regionIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion.push({
                  name: '',
                  price: [{ price: 0, currency: '' }]
            });
            setPackages(newPackages);
      };

      const removeSubregion = (pkgIndex: number, countryIndex: number, regionIndex: number, subregionIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion.splice(subregionIndex, 1);
            setPackages(newPackages);
      };

      // Price level functions
      const addPrice = (pkgIndex: number, countryIndex: number, regionIndex: number, subregionIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion[subregionIndex].price.push({
                  price: 0,
                  currency: ''
            });
            setPackages(newPackages);
      };

      const removePrice = (pkgIndex: number, countryIndex: number, regionIndex: number, subregionIndex: number, priceIndex: number) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion[subregionIndex].price.splice(priceIndex, 1);
            setPackages(newPackages);
      };

      // Input change handlers
      const handlePackageChange = (
            index: number,
            field: keyof CurrencyPackage,
            value: number | string | Country[]
      ) => {
            const newPackages = [...packages];
            (newPackages[index] as CurrencyPackage)[field] = value as never;
            setPackages(newPackages);
      };

      const handleCountryChange = (pkgIndex: number, countryIndex: number, value: string) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].country = value;
            setPackages(newPackages);
      };

      const handleRegionChange = (pkgIndex: number, countryIndex: number, regionIndex: number, value: string) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].name = value;
            setPackages(newPackages);
      };

      const handleSubregionChange = (pkgIndex: number, countryIndex: number, regionIndex: number, subregionIndex: number, value: string) => {
            const newPackages = [...packages];
            newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion[subregionIndex].name = value;
            setPackages(newPackages);
      };

      const handlePriceChange = (
            pkgIndex: number,
            countryIndex: number,
            regionIndex: number,
            subregionIndex: number,
            priceIndex: number,
            field: keyof Price,
            value: string | number
      ) => {
            const newPackages = [...packages];
            const priceObj = newPackages[pkgIndex].server[countryIndex].region[regionIndex].subregion[subregionIndex].price[priceIndex];
            if (field === "price" && typeof value === "number") {
                  priceObj.price = value;
            } else if (field === "currency" && typeof value === "string") {
                  priceObj.currency = value;
            }
            setPackages(newPackages);
      };

      return (
            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full border border-gray-200 shadow-sm hover:bg-gray-50">
                              <ChevronLeft className="size-5" />
                        </Button>
                        <div>
                              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Create Currency Service</h1>
                              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                                    Configure currency packages and their regional pricing. All fields marked with <span className="text-red-500">*</span> are required.
                              </p>
                        </div>
                  </div>

                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 sm:p-8 space-y-8">
                              {/* Packages Section */}
                              <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                                <div className="w-2 h-6 bg-blue-600 rounded-full" />
                                                <h2 className="text-xl font-semibold text-gray-800">Currency Packages</h2>
                                          </div>
                                          <Button
                                                type="button"
                                                variant="outline"
                                                className="flex items-center gap-2"
                                                onClick={addPackage}
                                          >
                                                <Plus className="size-4" /> Add Package
                                          </Button>
                                    </div>

                                    {packages.map((pkg, pkgIndex) => (
                                          <div key={pkgIndex} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                                                <div className="flex justify-between items-center mb-6">
                                                      <div className="flex items-center gap-2">
                                                            <DollarSign className="size-5 text-blue-600" />
                                                            <h3 className="font-medium text-gray-700">Package #{pkgIndex + 1}</h3>
                                                      </div>
                                                      <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-500 hover:bg-red-50"
                                                            onClick={() => removePackage(pkgIndex)}
                                                            disabled={packages.length <= 1}
                                                      >
                                                            <Trash2 className="size-4" />
                                                      </Button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                      <div>
                                                            <Label className="text-gray-700 font-medium flex items-center gap-1">
                                                                  <DollarSign className="size-4" /> Amount <span className="text-red-500">*</span>
                                                            </Label>
                                                            <Input
                                                                  type="number"
                                                                  value={pkg.amount}
                                                                  onChange={(e) => handlePackageChange(pkgIndex, 'amount', parseInt(e.target.value) || 0)}
                                                                  placeholder="Enter amount"
                                                                  className="py-4 px-4 rounded-lg border-gray-300"
                                                                  min={0}
                                                                  required
                                                            />
                                                      </div>
                                                      <div>
                                                            <Label className="text-gray-700 font-medium flex items-center gap-1">
                                                                  <Layers className="size-4" /> Unit <span className="text-red-500">*</span>
                                                            </Label>
                                                            <Input
                                                                  value={pkg.unit}
                                                                  onChange={(e) => handlePackageChange(pkgIndex, 'unit', e.target.value)}
                                                                  placeholder="Enter unit (e.g., Gems, Coins)"
                                                                  className="py-4 px-4 rounded-lg border-gray-300"
                                                                  required
                                                            />
                                                      </div>
                                                </div>

                                                {/* Countries Section */}
                                                <div className="mt-8">
                                                      <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-2">
                                                                  <Globe className="size-5 text-blue-600" />
                                                                  <h4 className="font-medium text-gray-700">Countries</h4>
                                                            </div>
                                                            <Button
                                                                  type="button"
                                                                  variant="outline"
                                                                  size="sm"
                                                                  className="flex items-center gap-1"
                                                                  onClick={() => addCountry(pkgIndex)}
                                                            >
                                                                  <Plus className="size-3" /> Add Country
                                                            </Button>
                                                      </div>

                                                      {pkg.server.map((country, countryIndex) => (
                                                            <div key={countryIndex} className="border border-gray-200 rounded-lg p-4 bg-white mb-6">
                                                                  <div className="flex justify-between items-center mb-4">
                                                                        <h5 className="font-medium text-gray-700 flex items-center gap-1">
                                                                              <Globe className="size-4" /> Country #{countryIndex + 1}
                                                                        </h5>
                                                                        <Button
                                                                              variant="ghost"
                                                                              size="icon"
                                                                              className="text-red-500 hover:bg-red-50 size-8"
                                                                              onClick={() => removeCountry(pkgIndex, countryIndex)}
                                                                              disabled={pkg.server.length <= 1}
                                                                        >
                                                                              <Trash2 className="size-3" />
                                                                        </Button>
                                                                  </div>

                                                                  <div className="mb-4">
                                                                        <Label className="text-gray-700 font-medium">Country Name <span className="text-red-500">*</span></Label>
                                                                        <Input
                                                                              value={country.country}
                                                                              onChange={(e) => handleCountryChange(pkgIndex, countryIndex, e.target.value)}
                                                                              placeholder="Enter country name"
                                                                              className="py-3 px-4 rounded-lg border-gray-300"
                                                                              required
                                                                        />
                                                                  </div>

                                                                  {/* Regions Section */}
                                                                  <div className="mt-6">
                                                                        <div className="flex items-center justify-between mb-4">
                                                                              <div className="flex items-center gap-2">
                                                                                    <MapPin className="size-4 text-blue-600" />
                                                                                    <h6 className="font-medium text-gray-700">Regions</h6>
                                                                              </div>
                                                                              <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="flex items-center gap-1"
                                                                                    onClick={() => addRegion(pkgIndex, countryIndex)}
                                                                              >
                                                                                    <Plus className="size-3" /> Add Region
                                                                              </Button>
                                                                        </div>

                                                                        {country.region.map((region, regionIndex) => (
                                                                              <div key={regionIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                                                                                    <div className="flex justify-between items-center mb-4">
                                                                                          <h6 className="font-medium text-gray-700">Region #{regionIndex + 1}</h6>
                                                                                          <Button
                                                                                                variant="ghost"
                                                                                                size="icon"
                                                                                                className="text-red-500 hover:bg-red-50 size-7"
                                                                                                onClick={() => removeRegion(pkgIndex, countryIndex, regionIndex)}
                                                                                                disabled={country.region.length <= 1}
                                                                                          >
                                                                                                <Trash2 className="size-3" />
                                                                                          </Button>
                                                                                    </div>

                                                                                    <div className="mb-4">
                                                                                          <Label className="text-gray-700 font-medium">Region Name <span className="text-red-500">*</span></Label>
                                                                                          <Input
                                                                                                value={region.name}
                                                                                                onChange={(e) => handleRegionChange(pkgIndex, countryIndex, regionIndex, e.target.value)}
                                                                                                placeholder="Enter region name"
                                                                                                className="py-3 px-4 rounded-lg border-gray-300"
                                                                                                required
                                                                                          />
                                                                                    </div>

                                                                                    {/* Subregions Section */}
                                                                                    <div className="mt-4">
                                                                                          <div className="flex items-center justify-between mb-4">
                                                                                                <div className="flex items-center gap-2">
                                                                                                      <MapPin className="size-4 text-blue-600" />
                                                                                                      <h6 className="font-medium text-gray-700">Subregions</h6>
                                                                                                </div>
                                                                                                <Button
                                                                                                      type="button"
                                                                                                      variant="outline"
                                                                                                      size="sm"
                                                                                                      className="flex items-center gap-1"
                                                                                                      onClick={() => addSubregion(pkgIndex, countryIndex, regionIndex)}
                                                                                                >
                                                                                                      <Plus className="size-3" /> Add Subregion
                                                                                                </Button>
                                                                                          </div>

                                                                                          {region.subregion.map((subregion, subregionIndex) => (
                                                                                                <div key={subregionIndex} className="border border-gray-200 rounded-lg p-4 bg-white mb-4">
                                                                                                      <div className="flex justify-between items-center mb-4">
                                                                                                            <h6 className="font-medium text-gray-700">Subregion #{subregionIndex + 1}</h6>
                                                                                                            <Button
                                                                                                                  variant="ghost"
                                                                                                                  size="icon"
                                                                                                                  className="text-red-500 hover:bg-red-50 size-7"
                                                                                                                  onClick={() => removeSubregion(pkgIndex, countryIndex, regionIndex, subregionIndex)}
                                                                                                                  disabled={region.subregion.length <= 1}
                                                                                                            >
                                                                                                                  <Trash2 className="size-3" />
                                                                                                            </Button>
                                                                                                      </div>

                                                                                                      <div className="mb-4">
                                                                                                            <Label className="text-gray-700 font-medium">Subregion Name <span className="text-red-500">*</span></Label>
                                                                                                            <Input
                                                                                                                  value={subregion.name}
                                                                                                                  onChange={(e) => handleSubregionChange(pkgIndex, countryIndex, regionIndex, subregionIndex, e.target.value)}
                                                                                                                  placeholder="Enter subregion name"
                                                                                                                  className="py-3 px-4 rounded-lg border-gray-300"
                                                                                                                  required
                                                                                                            />
                                                                                                      </div>

                                                                                                      {/* Prices Section */}
                                                                                                      <div className="mt-4">
                                                                                                            <div className="flex items-center justify-between mb-4">
                                                                                                                  <div className="flex items-center gap-2">
                                                                                                                        <DollarSign className="size-4 text-blue-600" />
                                                                                                                        <h6 className="font-medium text-gray-700">Prices</h6>
                                                                                                                  </div>
                                                                                                                  <Button
                                                                                                                        type="button"
                                                                                                                        variant="outline"
                                                                                                                        size="sm"
                                                                                                                        className="flex items-center gap-1"
                                                                                                                        onClick={() => addPrice(pkgIndex, countryIndex, regionIndex, subregionIndex)}
                                                                                                                  >
                                                                                                                        <Plus className="size-3" /> Add Price
                                                                                                                  </Button>
                                                                                                            </div>

                                                                                                            {subregion.price.map((price, priceIndex) => (
                                                                                                                  <div key={priceIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                                                                        <div>
                                                                                                                              <Label className="text-gray-700 font-medium">Price <span className="text-red-500">*</span></Label>
                                                                                                                              <Input
                                                                                                                                    type="number"
                                                                                                                                    value={price.price}
                                                                                                                                    onChange={(e) => handlePriceChange(pkgIndex, countryIndex, regionIndex, subregionIndex, priceIndex, 'price', parseFloat(e.target.value) || 0)}
                                                                                                                                    placeholder="Enter price"
                                                                                                                                    className="py-3 px-4 rounded-lg border-gray-300"
                                                                                                                                    min={0}
                                                                                                                                    step="0.01"
                                                                                                                                    required
                                                                                                                              />
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                              <Label className="text-gray-700 font-medium">Currency <span className="text-red-500">*</span></Label>
                                                                                                                              <Input
                                                                                                                                    value={price.currency}
                                                                                                                                    onChange={(e) => handlePriceChange(pkgIndex, countryIndex, regionIndex, subregionIndex, priceIndex, 'currency', e.target.value)}
                                                                                                                                    placeholder="Enter currency (e.g., USD, CAD)"
                                                                                                                                    className="py-3 px-4 rounded-lg border-gray-300"
                                                                                                                                    required
                                                                                                                              />
                                                                                                                        </div>
                                                                                                                        <div className="md:col-span-2 flex justify-end">
                                                                                                                              <Button
                                                                                                                                    variant="ghost"
                                                                                                                                    size="sm"
                                                                                                                                    className="text-red-500 hover:bg-red-50"
                                                                                                                                    onClick={() => removePrice(pkgIndex, countryIndex, regionIndex, subregionIndex, priceIndex)}
                                                                                                                                    disabled={subregion.price.length <= 1}
                                                                                                                              >
                                                                                                                                    <Trash2 className="size-4 mr-1" /> Remove
                                                                                                                              </Button>
                                                                                                                        </div>
                                                                                                                  </div>
                                                                                                            ))}
                                                                                                      </div>
                                                                                                </div>
                                                                                          ))}
                                                                                    </div>
                                                                              </div>
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-4 pt-8 border-t border-gray-200 flex-col sm:flex-row">
                                    <Button variant="outline" className="py-5 sm:py-6 text-base rounded-xl border-gray-300 hover:bg-gray-50 flex-1" onClick={() => router.push('/currency-services')}>
                                          Cancel
                                    </Button>
                                    <Button
                                          type="submit"
                                          className="py-5 sm:py-6 text-base rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md flex-1"
                                    >
                                          {
                                                isPending
                                                      ? <span className="flex items-center gap-2">
                                                            <Loader2 className="animate-spin" />
                                                            Submitting...
                                                      </span>
                                                      : 'Create Currency Service'
                                          }
                                    </Button>
                              </div>
                        </div>
                  </form>
            </div>
      );
}