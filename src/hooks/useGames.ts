import { getGames, getGameByID } from '@/actions/Games/actions';
import { useQuery } from '@tanstack/react-query';

export const useGames = (page: number = 1, limit: number = 1) => {
  return useQuery({
    queryKey: ['games', page, limit],
    queryFn: () => getGames(page, limit),
  });
};

export const useGameByID = ({ id }: { id: string | number }) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => getGameByID,
  });
};
