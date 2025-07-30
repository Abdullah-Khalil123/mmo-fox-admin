import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from '@/actions/Users/actions';
import queryClient from '@/lib/queryClient';
import { User } from '@/types/user.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUsers = ({ page = 1, limit = 10, search = '' }) => {
  return useQuery({
    queryKey: ['users', page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: User) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUser = (id: string | number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
};

export const useEditUser = (id: string | number) => {
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
