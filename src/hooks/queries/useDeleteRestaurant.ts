import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';

const requestDeleteRestaurant = async (id: number) => {
  await fetchUtil.delete(`https://example.com/restaurants/${id}`);
};

const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: requestDeleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RESTAURANTS] });
    },
  });

  return {
    deleteRestaurant: mutateAsync,
    ...rest,
  };
};

export { useDeleteRestaurant };
