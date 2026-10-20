import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dreamsApi } from '../services/dreamsApi';
import { Dream } from '../types';

export const DREAM_KEYS = {
  all: ['dreams'] as const,
  byDate: (date: string) => ['dreams', 'byDate', date] as const,
  byId: (id: string) => ['dreams', 'byId', id] as const,
  user: ['userProfile'] as const,
  categories: ['categories'] as const,
};

export function useDreams() {
  return useQuery({
    queryKey: DREAM_KEYS.all,
    queryFn: () => dreamsApi.getDreams(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDreamByDate(dateStr: string) {
  return useQuery({
    queryKey: DREAM_KEYS.byDate(dateStr),
    queryFn: () => dreamsApi.getDreamByDate(dateStr),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDreamById(id: string | null) {
  return useQuery({
    queryKey: DREAM_KEYS.byId(id || ''),
    queryFn: () => (id ? dreamsApi.getDreamById(id) : null),
    enabled: !!id,
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: DREAM_KEYS.user,
    queryFn: () => dreamsApi.getUserProfile(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: DREAM_KEYS.categories,
    queryFn: () => dreamsApi.getCategories(),
    staleTime: Infinity,
  });
}

export function useSaveDream() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dream: Partial<Dream> & { title: string; date: string }) =>
      dreamsApi.saveDream(dream),
    onSuccess: (savedDream) => {
      // Invalidate and update react query cache seamlessly
      queryClient.invalidateQueries({ queryKey: DREAM_KEYS.all });
      queryClient.setQueryData(DREAM_KEYS.byDate(savedDream.date), savedDream);
      queryClient.setQueryData(DREAM_KEYS.byId(savedDream.id), savedDream);
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dreamsApi.toggleFavorite(id),
    onSuccess: (updatedDream) => {
      queryClient.invalidateQueries({ queryKey: DREAM_KEYS.all });
      queryClient.setQueryData(DREAM_KEYS.byDate(updatedDream.date), updatedDream);
      queryClient.setQueryData(DREAM_KEYS.byId(updatedDream.id), updatedDream);
    },
  });
}
