import { css } from '@emotion/react';
import useGetRestaurantDetail from '../hooks/queries/useGetRestaurantDetail';
import { BottomSheetProps } from '../types/bottomSheet';
import BottomSheet from './BottomSheet';
import Button from './Button';
import Icon from './Icon';
import Text from './Text';
import { useDeleteRestaurant } from '../hooks/queries/useDeleteRestaurant';
import Toggle from './Toggle';
import useRestaurantStore from '../stores/restaurantsStore';
import { usePatchFavoriteRestaurant } from '../hooks/queries/usePatchFavoriteRestaurant';

type Props = BottomSheetProps & {
  id: number;
};

const RestaurantDetailBottomSheet = ({ isOpen, onClose, id }: Props) => {
  const { restaurant } = useGetRestaurantDetail(id);
  const { name, category, timeToMove, description, link } = restaurant;

  const { deleteRestaurant } = useDeleteRestaurant();

  const toggleFavorite = useRestaurantStore((state) => state.toggleFavorite);
  const restaurants = useRestaurantStore((state) => state.restaurants);

  const { changeFavorite } = usePatchFavoriteRestaurant();

  const onDelete = async () => {
    onClose();
    deleteRestaurant(id);
  };

  const onToggle = () => {
    const target = restaurants.find((restaurant) => restaurant.id === id)?.favorite;

    if (target === undefined) return;
    changeFavorite({ id, favorite: !target });
    toggleFavorite(id);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} size='medium'>
      <Toggle
        value={restaurants.find((restaurant) => restaurant.id === id)?.favorite}
        onClick={onToggle}
        cssProp={css`
          position: absolute;
          right: 8px;
          top: 8px;
        `}
      />
      <Icon backgroundColor='primaryLighten' category={category} />
      <Text type='subtitle' color='gray5'>
        {name}
      </Text>
      <Text type='body' color='primary'>
        캠퍼스부터 {timeToMove}분 내
      </Text>
      <Text type='body' color='gray5'>
        {description}
      </Text>

      <a
        css={css`
          text-decoration: underline;
        `}
        href={link}
        target='_blank'
        rel='noopener noreferrer'>
        <Text type='body'>{link}</Text>
      </a>
      <div
        css={css`
          width: 100%;

          display: flex;

          bottom: 0;
        `}>
        <Button onClick={onDelete} variant='secondary' fullWidth>
          삭제하기
        </Button>
        <Button onClick={onClose} variant='primary' fullWidth>
          닫기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default RestaurantDetailBottomSheet;
