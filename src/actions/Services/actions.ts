import { axiosInstance } from '@/lib/axios';
// import { ServiceFormData } from '@/types/game.schema';
import axios from 'axios';

const getServiceById = async (serviceId: string | number) => {
  try {
    const response = await axiosInstance.get(`/service/${serviceId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch service by ID'
      );
    }
  }
};

const getServicesByGameId = async (gameId: number | string) => {
  try {
    const response = await axiosInstance.get(`/service/game/${gameId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { data: [] };
      }
      throw new Error(
        error.response?.data?.message || 'Failed to fetch services by game ID'
      );
    }
  }
};

const createServiceByGameId = async (
  gameId: string | number,
  serviceData: FormData
) => {
  try {
    const response = await axiosInstance.post(
      `/service/${gameId}`,
      serviceData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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

const deleteServiceById = async (serviceId: string | number) => {
  try {
    const response = await axiosInstance.delete(`/service/${serviceId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete service by ID'
      );
    }
  }
};

const updateServiceById = async (
  serviceId: string | number,
  serviceData: FormData
) => {
  try {
    const response = await axiosInstance.put(
      `/service/${serviceId}`,
      serviceData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to update service by ID'
      );
    }
  }
};

export {
  getServicesByGameId,
  createServiceByGameId,
  deleteServiceById,
  updateServiceById,
  getServiceById,
};
