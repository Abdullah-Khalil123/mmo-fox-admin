import {
  updateCurrencyConfig,
  getCurrencyConfig,
} from '@/actions/Currency/action';
import queryClient from '@/lib/queryClient';
import { CurrencyConfigFormData } from '@/types/currency.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCurrencyConfig = () => {};

export const useCreateCurrencyConfig = (id: string) => {
  return useMutation({
    mutationFn: async (data: CurrencyConfigFormData) =>
      updateCurrencyConfig(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['currencyConfig'],
      });
    },
  });
};

export const useGetCurrencyConfig = (id: string) => {
  return useQuery({
    queryKey: ['currencyConfig', id],
    queryFn: () => getCurrencyConfig(id),
  });
};
