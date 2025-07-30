import { axiosInstance } from '@/lib/axios';
import { NewsForm } from '@/types/news.schema';
import axios from 'axios';

export const getNews = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axiosInstance.get('/news', {
      params: {
        page,
        limit,
        search,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.response?.data?.message || 'Failed to fetch news');
    }
  }
};

export const getNewsById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to fetch news details'
      );
    }
  }
};

export const createNews = async (newsData: NewsForm) => {
  try {
    const response = await axiosInstance.post('/news/create', newsData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to create news'
      );
    }
  }
};

export const updateNews = async (id: string | number, newsData: NewsForm) => {
  try {
    const response = await axiosInstance.put(`/news/${id}`, newsData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to update news'
      );
    }
  }
};

export const deleteNews = async (id: string | number) => {
  try {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Failed to delete news'
      );
    }
  }
};
