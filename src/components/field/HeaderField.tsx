import useAddRestaurantBottomSheet from '../../hooks/bottomSheets/useAddRestaurantBottomSheet';
import Header from '../Header';
import Text from '../Text';
import addIcon from '../../../templates/add-button.png';

const HeaderField = () => {
  const { open } = useAddRestaurantBottomSheet();

  return (
    <Header
      left={
        <Text color='gray1' type='title'>
          점심 뭐 먹지
        </Text>
      }
      right={
        <button onClick={open}>
          <img src={addIcon} />
        </button>
      }
    />
  );
};

export default HeaderField;
