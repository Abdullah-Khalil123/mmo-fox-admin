import {
  getServicesByGameId,
  createServiceByGameId,
  deleteServiceById,
  updateServiceById,
  getServiceById,
} from '@/actions/Services/actions';
import queryClient from '@/lib/queryClient';
import { ServiceFormData } from '@/types/game.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useServiceById = (serviceId: string | number) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => getServiceById(serviceId),
  });
};

export const useServicesByGameId = (gameId: string | number) => {
  return useQuery({
    queryKey: ['services-by-game', gameId],
    queryFn: () => getServicesByGameId(gameId),
  });
};

export const useCreateServiceByGameId = (gameId: string | number) => {
  return useMutation({
    mutationFn: (serviceData: FormData) =>
      createServiceByGameId(gameId, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services-by-game', gameId],
      });
    },
  });
};

export const useDeleteServiceById = (gameId: string | number) => {
  return useMutation({
    mutationFn: (serviceId: string | number) => deleteServiceById(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services-by-game', gameId],
      });
    },
  });
};

export const useUpdateServiceById = (serviceId: string | number) => {
  return useMutation({
    mutationFn: (serviceData: ServiceFormData) =>
      updateServiceById(serviceId, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service', serviceId],
      });
    },
  });
};
