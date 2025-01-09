import { css } from '@emotion/react';
import { Restaurant } from '../types/serviceType';
import Icon from './Icon';
import Text from './Text';
import useRestaurantDetailBottomSheet from '../hooks/bottomSheets/useRestaurantDetailBottomSheet';
import Toggle from './Toggle';
import useRestaurantStore from '../stores/restaurantsStore';
import { useEffect } from 'react';
import { usePatchFavoriteRestaurant } from '../hooks/queries/usePatchFavoriteRestaurant';

type RestaurantItemProps = {
  restaurant: Restaurant;
};

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  const { name, category, timeToMove, description, id } = restaurant;
  const { open } = useRestaurantDetailBottomSheet();

  const restaurants = useRestaurantStore((state) => state.restaurants);
  const toggleFavorite = useRestaurantStore((state) => state.toggleFavorite);

  const { changeFavorite } = usePatchFavoriteRestaurant();
  const onToggle = () => {
    // TODO: 정말 이방법말곤 없나?
    const target = restaurants.find((restaurant) => restaurant.id === id)?.favorite;

    if (target === undefined) return;
    changeFavorite({ id, favorite: !target });
    toggleFavorite(id);
  };

  return (
    <div
      css={css`
        position: relative;
      `}>
      <div
        onClick={() => open(id)}
        css={css`
          width: 100%;
          height: 137px;

          display: flex;

          gap: 16px;
        `}>
        <Icon backgroundColor='primaryLighten' category={category} />
        <div>
          <Text type='subtitle' color='gray5'>
            {name}
          </Text>
          <Text type='body' color='primary'>
            캠퍼스부터 {timeToMove}분 내
          </Text>
          <Text type='body' color='gray5'>
            {description}
          </Text>
        </div>
      </div>
      <Toggle
        value={restaurants.find((restaurant) => restaurant.id === id)?.favorite}
        onClick={onToggle}
        cssProp={css`
          position: absolute;
          right: 8px;
          top: 8px;
        `}
      />
    </div>
  );
};

export default RestaurantItem;
