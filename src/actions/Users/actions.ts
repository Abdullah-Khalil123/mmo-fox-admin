import { axiosInstance } from '@/lib/axios';
import axios from 'axios';
export const getUsers = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axiosInstance.get('/user/all', {
      params: {
        page,
        limit,
        search,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
};
