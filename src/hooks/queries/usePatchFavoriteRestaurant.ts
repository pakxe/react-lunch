import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';
import { Restaurant } from '../../types/serviceType';

const requestPatchRestaurant = async ({ id, favorite }: { id: number; favorite: boolean }) => {
  await fetchUtil.patch(`https://example.com/restaurants/${id}`, {
    favorite,
  });
};

const usePatchFavoriteRestaurant = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: requestPatchRestaurant,
    mutationKey: [QUERY_KEY.RESTAURANTS],
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.RESTAURANTS], (prevData: Restaurant[]) => {
        const target = prevData.find((restaurant) => restaurant.id === id);

        if (!target) return prevData;

        target.favorite = !target.favorite;

        return [...prevData];
      });
    },
  });

  return {
    changeFavorite: mutateAsync,
    ...rest,
  };
};

export { usePatchFavoriteRestaurant };
