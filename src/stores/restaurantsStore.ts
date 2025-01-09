import { create } from 'zustand';
import { Restaurant } from '../types/serviceType';

type State = {
  restaurants: Restaurant[];
};

type Action = {
  setRestaurants: (restaurants: Restaurant[]) => void;
  toggleFavorite: (id: number) => void;
  getFavoriteStateById: (id: number) => boolean;
};

const useRestaurantStore = create<State & Action>((set, get) => ({
  restaurants: [],
  toggleFavorite: (id: number) => {
    set((state) => ({
      restaurants: state.restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, favorite: !restaurant.favorite } : restaurant,
      ),
    }));
  },
  setRestaurants: (restaurants) => set({ restaurants }),
  getFavoriteStateById: (id: number) => {
    const restaurant = get().restaurants.find((restaurant) => restaurant.id === id);

    return restaurant?.favorite || false;
  },
}));

export default useRestaurantStore;
