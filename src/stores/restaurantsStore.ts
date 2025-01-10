import { create } from 'zustand';
import { Restaurant } from '../types/serviceType';

type State = {
  restaurants: Map<number, Restaurant>;
};

type Action = {
  setRestaurants: (restaurants: Restaurant[]) => void;
  toggleFavorite: (id: number) => void;
  getFavoriteStateOfRestaurant: (id: number) => boolean;
};

const useRestaurantsStore = create<State & Action>((set, get) => ({
  restaurants: new Map<number, Restaurant>(),
  toggleFavorite: (id: number) => {
    const restaurants = get().restaurants;
    const restaurant = restaurants.get(id);

    if (restaurant === undefined) return;

    const newRestaurant = { ...restaurant, favorite: !restaurant.favorite };
    restaurants.set(id, newRestaurant);
  },
  setRestaurants: (restaurants) => {
    const favoriteRestaurants = new Map<number, Restaurant>();

    for (const restaurant of restaurants) {
      favoriteRestaurants.set(restaurant.id, restaurant);
    }

    set({ restaurants: favoriteRestaurants });
  },
  getFavoriteStateOfRestaurant: (id: number) => {
    const restaurant = get().restaurants.get(id);

    if (restaurant === undefined) return false;

    return restaurant.favorite;
  },
}));

export default useRestaurantsStore;
