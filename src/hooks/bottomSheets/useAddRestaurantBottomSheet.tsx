import AddRestaurantBottomSheet from '../../components/AddRestaurantBottomSheet';
import { BOTTOM_SHEET_KEY } from '../../constants/bottomSheetKey';
import { useBottomSheetContext } from './useBottomSheet';

const useAddRestaurantBottomSheet = () => {
  const { open } = useBottomSheetContext();

  return {
    open: () =>
      open(BOTTOM_SHEET_KEY.ADD_RESTAURANT, (isOpen, onClose) => (
        <AddRestaurantBottomSheet isOpen={isOpen} onClose={onClose} />
      )),
  };
};

export default useAddRestaurantBottomSheet;
