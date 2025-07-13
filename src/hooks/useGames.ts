import {
  getGames,
  getGameByID,
  createGame,
  updateGame,
} from '@/actions/Games/actions';
import queryClient from '@/lib/queryClient';
import { GameFormData } from '@/types/game.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGames = (page: number = 1, limit: number = 1) => {
  return useQuery({
    queryKey: ['games', page, limit],
    queryFn: () => getGames(page, limit),
  });
};

export const useGameByID = (gameId: string | number) => {
  return useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameByID(gameId),
    enabled: !!gameId, // Only fetch if id is provided
  });
};

export const useCreateGame = () => {
  return useMutation({
    mutationFn: (gameData: FormData) => createGame(gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useUpdateGame = (gameId: string | number) => {
  return useMutation({
    mutationFn: (gameData: GameFormData) => updateGame(gameId, gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['game', gameId],
      });
    },
  });
};
