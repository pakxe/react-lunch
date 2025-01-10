import { css, useTheme } from '@emotion/react';
import { BottomSheetProps } from '../types/bottomSheet';
import BottomSheet from './BottomSheet';
import Button from './Button';
import Dropdown from './Dropdowm/Dropdown';
import Input from './Input';
import Text from './Text';
import usePostRestaurant from '../hooks/queries/usePostRestaurant';
import { useState } from 'react';
import { Category, Restaurant, TimeToMove } from '../types/serviceType';
import TextArea from './TextArea';

type RestaurantInput = {
  category: Category | 'none';
  name: string;
  timeToMove: TimeToMove | 'none';
  description: string;
  link: string;
};

const AddRestaurantBottomSheet = ({ isOpen, onClose }: BottomSheetProps) => {
  const [restaurant, setRestaurant] = useState<RestaurantInput>({
    category: 'none',
    name: '',
    timeToMove: 'none',
    description: '',
    link: '',
  });
  const theme = useTheme();

  const { addRestaurant } = usePostRestaurant();

  const onSubmit = async () => {
    if (restaurant.category === 'none' || restaurant.name === '' || restaurant.timeToMove === 'none') {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const formattedRestaurant: Omit<Restaurant, 'id'> = {
      ...restaurant,
      category: restaurant.category,
      name: restaurant.name,
      timeToMove: Number(restaurant.timeToMove),
      favorite: false,
    };

    await addRestaurant(formattedRestaurant);
    onClose();
  };

  const onChange = (type: 'category' | 'name' | 'timeToMove' | 'description' | 'link', value: string) => {
    setRestaurant({ ...restaurant, [type]: value });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} size='large' title='새로운 음식점'>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 32px;
        `}>
        <div>
          <Text required type='caption'>
            카테고리
          </Text>
          <Dropdown onClick={(value) => onChange('category', value)}>
            <Dropdown.Option value='none'>선택해주세요.</Dropdown.Option>
            <Dropdown.Option value='korean'>한식</Dropdown.Option>
            <Dropdown.Option value='chinese'>중식</Dropdown.Option>
            <Dropdown.Option value='japanese'>일식</Dropdown.Option>
            <Dropdown.Option value='western'>양식</Dropdown.Option>
            <Dropdown.Option value='asian'>아시안</Dropdown.Option>
            <Dropdown.Option value='etc'>기타</Dropdown.Option>
          </Dropdown>
        </div>

        <div>
          <Text required type='caption'>
            이름
          </Text>
          <Input fullWidth onChange={(e) => onChange('name', e.target.value)} />
        </div>

        <div>
          <Text required type='caption'>
            거리(도보이동시간)
          </Text>
          <Dropdown onClick={(value) => onChange('timeToMove', value)}>
            <Dropdown.Option value='none'>선택해주세요.</Dropdown.Option>
            <Dropdown.Option value='5'>5분</Dropdown.Option>
            <Dropdown.Option value='10'>10분</Dropdown.Option>
            <Dropdown.Option value='15'>15분</Dropdown.Option>
            <Dropdown.Option value='20'>20분</Dropdown.Option>
          </Dropdown>
        </div>

        <div>
          <Text type='caption'>설명</Text>
          <TextArea fullWidth onChange={(e) => onChange('timeToMove', e.target.value)} />
          <Text type='caption' color='gray3'>
            메뉴 등 추가 정보를 입력해 주세요.
          </Text>
        </div>

        <div>
          <Text type='caption'>참고 링크</Text>
          <Input fullWidth onChange={(e) => onChange('link', e.target.value)} />
          <Text type='caption' color='gray3'>
            매장 정보를 확인할 수 있는 링크를 입력해 주세요.
          </Text>
        </div>
      </div>

      {/* TODO: 스타일 반복 */}
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
        <Button onClick={onClose} variant='secondary' fullWidth>
          취소하기
        </Button>
        <Button onClick={onSubmit} variant='primary' fullWidth>
          추가하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default AddRestaurantBottomSheet;
