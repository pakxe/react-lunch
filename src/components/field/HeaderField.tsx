import useAddRestaurantBottomSheet from '../../hooks/bottomSheets/useAddRestaurantBottomSheet';
import Button from '../Button';
import Header from '../Header';
import Text from '../Text';

const HeaderField = () => {
  const { open } = useAddRestaurantBottomSheet();

  return (
    <Header
      left={
        <Text color='gray1' type='title'>
          점심 뭐 먹지
        </Text>
      }
      right={<Button onClick={open}>추가</Button>}
    />
  );
};

export default HeaderField;
