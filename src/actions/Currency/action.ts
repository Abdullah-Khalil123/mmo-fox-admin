import { CurrencyConfigFormData } from '@/types/currency.schema';
import axios from 'axios';
import { axiosInstance } from '@/lib/axios';

export const getCurrencyConfig = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/service/currency/${id}/config`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch currency config'
      );
    }
  }
};

export const updateCurrencyConfig = async (
  id: string,
  data: CurrencyConfigFormData
) => {
  try {
    const response = await axiosInstance.patch(
      `/service/currency/${id}/config`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to create currency config'
      );
    }
  }
};
