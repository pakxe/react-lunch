import { useEffect, useState } from 'react';
import { Category, Restaurant } from '../types/serviceType';
import useGetRestaurants from './queries/useGetRestaurants';

type Filter = 'all' | Category;
type Sort = 'latest' | 'name';
type Tab = 'total' | 'favorite';

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
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('latest');
  const [tab, setTab] = useState<Tab>('total');

  const [processedRestaurants, setProcessedRestaurant] = useState<Restaurant[]>(
    processRestaurants(data, filter, sort, tab),
  );

  const handleFilter = (filter: string) => {
    // 유효성 검사
    setFilter(filter);
  };

  const handleSort = (sort: string) => {
    setSort(sort);
  };

  const handleTab = (tab: string) => {
    setTab(tab);
  };

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
