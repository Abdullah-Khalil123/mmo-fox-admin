import { getGames, getGameByID, createGame } from '@/actions/Games/actions';
import queryClient from '@/lib/queryClient';
import { Game } from '@/types/game';
import { GameFormData } from '@/types/game.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGames = (page: number = 1, limit: number = 1) => {
  return useQuery({
    queryKey: ['games', page, limit],
    queryFn: () => getGames(page, limit),
  });
};

export const useGameByID = (id: string | number) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => getGameByID(id),
    enabled: !!id, // Only fetch if id is provided
  });
};

export const useCreateGame = () => {
  return useMutation({
    mutationFn: (gameData: GameFormData) => createGame(gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
