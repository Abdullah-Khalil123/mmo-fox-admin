import { axiosInstance } from '@/lib/axios';
import { ServiceFormData } from '@/types/game.schema';
import axios from 'axios';

const getServicesByGameId = async (gameId: number | string) => {
  try {
    const response = await axiosInstance.get(`/service/${gameId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch services by game ID'
      );
    }
  }
};

const createServiceByGameId = async (
  gameId: string | number,
  serviceData: ServiceFormData
) => {
  try {
    const response = await axiosInstance.post(
      `/service/${gameId}`,
      serviceData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to create service by game ID'
      );
    }
  }
};

export { getServicesByGameId, createServiceByGameId };
