import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Restaurant } from '../../types/serviceType';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';

const requestPostRestaurant = async (restaurant: Omit<Restaurant, 'id'>) => {
  console.log(restaurant);
  await fetchUtil.post<Omit<Restaurant, 'id'>>('https://example.com/restaurants', restaurant);
};

const usePostRestaurant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationKey: [QUERY_KEY.RESTAURANTS],
    mutationFn: (restaurant: Omit<Restaurant, 'id'>) => requestPostRestaurant(restaurant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RESTAURANTS] });
    },
  });

  return {
    addRestaurant: mutateAsync,
    ...rest,
  };
};

export default usePostRestaurant;
