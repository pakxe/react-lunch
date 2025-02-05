import { css, useTheme } from '@emotion/react';
import useGetRestaurantDetail from '../hooks/queries/useGetRestaurantDetail';
import { BottomSheetProps } from '../types/bottomSheet';
import BottomSheet from './BottomSheet';
import Button from './Button';
import Icon from './Icon';
import Text from './Text';
import { useDeleteRestaurant } from '../hooks/queries/useDeleteRestaurant';
import Toggle from './Toggle';
import { usePatchFavoriteRestaurant } from '../hooks/queries/usePatchFavoriteRestaurant';
import Spacing from './Spacing';
import BottomSheetSkeleton from './BottomSheetSkeleton';

type Props = BottomSheetProps & {
  id: number;
};

const RestaurantDetailBottomSheet = ({ isOpen, onClose, id }: Props) => {
  const { restaurant, isFetching } = useGetRestaurantDetail(id);

  const { deleteRestaurant } = useDeleteRestaurant();
  const { changeFavorite } = usePatchFavoriteRestaurant(id);

  const theme = useTheme();

  if (!restaurant || isFetching) {
    return <BottomSheetSkeleton size='medium' />;
  }

  const { name, category, timeToMove, description, link, favorite } = restaurant;

  const onDelete = async () => {
    onClose();
    deleteRestaurant(id);
  };

  const onToggle = () => {
    changeFavorite({ id, favorite: !favorite });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} size='medium'>
      <Toggle
        value={favorite}
        onClick={onToggle}
        cssProp={css`
          position: absolute;
          right: 8px;
          top: 8px;
        `}
      />
      <Icon backgroundColor='primaryLighten' src={`assets/category-${category}.png`} />

      <Spacing height={8} />

      <Text type='subtitle' color='gray5'>
        {name}
      </Text>

      <Spacing height={8} />

      <Text type='body' color='primary'>
        캠퍼스부터 {timeToMove}분 내
      </Text>

      <Spacing height={8} />

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
          background-color: ${theme.colors.gray1};

          display: flex;
          gap: 16px;

          width: 100%;

          padding: 32px 16px;

          position: absolute;
          left: 0;
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
