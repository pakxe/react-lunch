import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';

const requestPatchRestaurant = async ({ id, favorite }: { id: number; favorite: boolean }) => {
  await fetchUtil.patch(`https://example.com/restaurants/${id}`, {
    favorite,
  });
};

const usePatchFavoriteRestaurant = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: requestPatchRestaurant,
    mutationKey: [QUERY_KEY.RESTAURANTS],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.RESTAURANTS] });
    },
  });

  return {
    changeFavorite: mutateAsync,
    ...rest,
  };
};

export { usePatchFavoriteRestaurant };
