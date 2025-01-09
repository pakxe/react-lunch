import { useSuspenseQuery } from '@tanstack/react-query';
import { Restaurant } from '../../types/serviceType';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';

const requestGetRestaurantDetail = async (id: number) => {
  const data = await fetchUtil.get<Restaurant>(`https://example.com/restaurants/${id}`);

  return data;
};

const useGetRestaurantDetail = (id: number) => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: [QUERY_KEY.RESTAURANTS, id],
    queryFn: () => requestGetRestaurantDetail(id),
  });

  return {
    restaurant: data,
    ...rest,
  };
};

export default useGetRestaurantDetail;
