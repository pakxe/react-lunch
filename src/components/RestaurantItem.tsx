import { css } from '@emotion/react';
import { Restaurant } from '../types/serviceType';
import Icon from './Icon';
import Text from './Text';
import useRestaurantDetailBottomSheet from '../hooks/bottomSheets/useRestaurantDetailBottomSheet';
import Toggle from './Toggle';
import useRestaurantsStore from '../stores/restaurantsStore';
import { usePatchFavoriteRestaurant } from '../hooks/queries/usePatchFavoriteRestaurant';

type RestaurantItemProps = {
  restaurant: Restaurant;
};

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  const { name, category, timeToMove, description, id } = restaurant;
  const { open } = useRestaurantDetailBottomSheet();

  const restaurants = useRestaurantsStore((state) => state.restaurants);
  const toggleFavorite = useRestaurantsStore((state) => state.toggleFavorite);
  const getFavoriteStateOfRestaurant = useRestaurantsStore((state) => state.getFavoriteStateOfRestaurant);

  const { changeFavorite } = usePatchFavoriteRestaurant();
  const onToggle = () => {
    changeFavorite({ id, favorite: !getFavoriteStateOfRestaurant(id) });
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
        value={restaurants.get(id)?.favorite}
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
