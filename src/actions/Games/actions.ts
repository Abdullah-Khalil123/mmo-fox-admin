/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/lib/axios';
import { CategoryFormData, GameFormData } from '@/types/game.schema';
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

export const getGameAllDataByID = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`/game/translate/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch game by ID'
      );
    }
  }
};

export const createGame = async (gameData: FormData) => {
  try {
    const response = await axiosInstance.post('/game', gameData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create game');
    }
  }
};

export const updateGame = async (
  id: string | number,
  gameData: GameFormData
) => {
  try {
    const response = await axiosInstance.patch(`/game/${id}`, gameData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update game');
    }
  }
};

export const deleteGame = async (id: string | number) => {
  try {
    const response = await axiosInstance.delete(`/game/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete game');
    }
  }
};

export const createGameCategory = async (
  id: number | string,
  categoryData: CategoryFormData
) => {
  try {
    const response = await axiosInstance.post(
      `/game/${id}/category`,
      categoryData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to add game category'
      );
    }
  }
};

export const deleteGameCategory = async (id: string | number) => {
  try {
    const response = await axiosInstance.delete(`/game/${id}/category`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete game category'
      );
    }
  }
};
