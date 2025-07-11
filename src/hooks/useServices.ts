import {
  getServicesByGameId,
  createServiceByGameId,
} from '@/actions/Services/actions';
import queryClient from '@/lib/queryClient';
import { ServiceFormData } from '@/types/game.schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useServicesByGameId = (gameId: string | number) => {
  return useQuery({
    queryKey: ['service', gameId],
    queryFn: () => getServicesByGameId(gameId),
  });
};

export const useCreateServiceByGameId = (gameId: string | number) => {
  return useMutation({
    mutationFn: (serviceData: ServiceFormData) =>
      createServiceByGameId(gameId, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service', gameId],
      });
    },
  });
};
