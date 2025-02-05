import { css } from '@emotion/react';
import { Restaurant } from '../types/serviceType';
import Icon from './Icon';
import Text from './Text';
import useRestaurantDetailBottomSheet from '../hooks/bottomSheets/useRestaurantDetailBottomSheet';
import Toggle from './Toggle';
import { usePatchFavoriteRestaurant } from '../hooks/queries/usePatchFavoriteRestaurant';
import Spacing from './Spacing';

type RestaurantItemProps = {
  restaurant: Restaurant;
};

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  const { name, category, timeToMove, description, id, favorite } = restaurant;
  const { open } = useRestaurantDetailBottomSheet();

  const { changeFavorite } = usePatchFavoriteRestaurant(id);
  const onToggle = () => {
    changeFavorite({ id, favorite: !favorite });
  };

  return (
    <div
      css={css`
        position: relative;
        padding: 16px 8px;
      `}>
      <div
        onClick={() => open(id)}
        css={css`
          width: 100%;

          display: flex;

          gap: 16px;
        `}>
        <Icon backgroundColor='primaryLighten' src={`assets/category-${category}.png`} />
        <div>
          <Text type='subtitle' color='gray5'>
            {name}
          </Text>
          <Text type='body' color='primary'>
            캠퍼스부터 {timeToMove}분 내
          </Text>
          <Spacing height={8} />
          <Text type='body' color='gray5' lineLimit={2}>
            {description}
          </Text>
        </div>
      </div>
      <Toggle
        value={favorite}
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
