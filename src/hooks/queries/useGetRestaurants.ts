import { useSuspenseQuery } from '@tanstack/react-query';
import { Restaurant } from '../../types/serviceType';
import fetchUtil from '../../utils/fetch';
import { QUERY_KEY } from '../../constants/queryKey';
import { useEffect } from 'react';
import useRestaurantStore from '../../stores/restaurantsStore';

const requestGetRestaurants = async () => {
  const data = await fetchUtil.get<Restaurant[]>('https://example.com/restaurants');

  return data;
};

const useGetRestaurants = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: [QUERY_KEY.RESTAURANTS],
    queryFn: requestGetRestaurants,
  });

  const setRestaurants = useRestaurantStore((state) => state.setRestaurants);

  useEffect(() => {
    setRestaurants(data || []);
  }, []);

  return {
    restaurants: data,
    ...rest,
  };
};

export default useGetRestaurants;