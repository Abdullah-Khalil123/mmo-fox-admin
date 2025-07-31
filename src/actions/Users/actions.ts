import { axiosInstance } from '@/lib/axios';
import { User } from '@/types/user.schema';
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

export const createUser = async (userData: User) => {
  try {
    const response = await axiosInstance.post('/user/create', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to create user'
      );
    }
  }
};

export const getUser = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to fetch user details'
      );
    }
  }
};

export const updateUser = async (userData: User) => {
  try {
    const response = await axiosInstance.put(`/user/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to update user'
      );
    }
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to delete user'
      );
    }
  }
};
