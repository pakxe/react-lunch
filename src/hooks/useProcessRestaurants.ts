import { useEffect, useState } from 'react';
import { Restaurant } from '../types/serviceType';
import useGetRestaurants from './queries/useGetRestaurants';
import { CATEGORY } from '../constants/category';
import useSelectedValue from './useSelectedValue';

const filterList = [...CATEGORY, 'all'] as const;
type Filter = (typeof filterList)[number];

const sortList = ['latest', 'name'] as const;
type Sort = (typeof sortList)[number];

const tabList = ['total', 'favorite'] as const;
type Tab = (typeof tabList)[number];

const filterTabRestaurants = (restaurants: Restaurant[], tab: Tab) => {
  if (tab === 'total') return restaurants;

  return restaurants.filter((restaurant) => restaurant.favorite);
};

const filterRestaurants = (restaurants: Restaurant[], filter: Filter) => {
  if (filter === 'all') return restaurants;

  return restaurants.filter((restaurant) => restaurant.category === filter);
};

const sortRestaurants = (restaurants: Restaurant[], sort: Sort) => {
  return restaurants.sort((a, b) => {
    if (sort === 'latest') {
      return a.id - b.id;
    }
    return a.name.localeCompare(b.name);
  });
};

// 필터링과 정렬이 완료된 목록 반환
const processRestaurants = (restaurants: Restaurant[], filter: Filter, sort: Sort, tab: Tab) => {
  const tabFiltered = filterTabRestaurants(restaurants, tab);
  const filtered = filterRestaurants(tabFiltered, filter);
  return sortRestaurants(filtered, sort);
};

const useProcessRestaurants = () => {
  const { restaurants: data } = useGetRestaurants();
  const [tab, handleTab] = useSelectedValue<Tab>('total', tabList);
  const [filter, handleFilter] = useSelectedValue<Filter>('all', filterList);
  const [sort, handleSort] = useSelectedValue<Sort>('latest', sortList);

  const [processedRestaurants, setProcessedRestaurant] = useState<Restaurant[]>(
    processRestaurants(data, filter, sort, tab),
  );

  useEffect(() => {
    setProcessedRestaurant(processRestaurants(data, filter, sort, tab));
  }, [filter, sort, data, tab]);

  return {
    restaurants: processedRestaurants,
    filter,
    sort,
    tab,
    handleTab,
    handleFilter,
    handleSort,
  };
};

export default useProcessRestaurants;
