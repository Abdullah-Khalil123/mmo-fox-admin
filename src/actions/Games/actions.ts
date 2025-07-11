import { axiosInstance } from '@/lib/axios';
import { Game } from '@/types/game';
import { GameFormData } from '@/types/game.schema';
import axios from 'axios';

export const getGames = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axiosInstance.get('/game', {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch games');
    }
  }
};

export const getGameByID = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/game/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch game by ID'
      );
    }
  }
};

export const createGame = async (gameData: GameFormData) => {
  try {
    const response = await axiosInstance.post('/game', gameData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create game');
    }
  }
};
