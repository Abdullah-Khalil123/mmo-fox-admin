import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
} from '@/actions/News/actions';
import queryClient from '@/lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useNews = (page = 1, limit = 10, search = '') => {
  return useQuery({
    queryKey: ['news', page, limit, search],
    queryFn: () => getNews(page, limit, search),
  });
};

export const useNewsById = (id: string | number) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => getNewsById(id),
    enabled: !!id, // Only fetch if id is provided
  });
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (newsData: FormData) => createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useUpdateNews = (id: string | number) => {
  return useMutation({
    mutationFn: (newsData: FormData) => updateNews(id, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news', id] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: (id: string | number) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};
