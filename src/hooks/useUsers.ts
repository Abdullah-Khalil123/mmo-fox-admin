import { getUsers } from '@/actions/Users/actions';
import { useQuery } from '@tanstack/react-query';

export const useUsers = ({ page = 1, limit = 10, search = '' }) => {
  return useQuery({
    queryKey: ['users', page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });
};
