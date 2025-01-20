import RestaurantDetailBottomSheet from '../../components/RestaurantDetailBottomSheet';
import { BOTTOM_SHEET_KEY } from '../../constants/bottomSheetKey';
import { useBottomSheetContext } from './useBottomSheet';

const useRestaurantDetailBottomSheet = () => {
  const { open } = useBottomSheetContext();

  return {
    open: (id: number) =>
      open(BOTTOM_SHEET_KEY.RESTAURANT_DETAIL, (isOpen, onClose) => (
        <RestaurantDetailBottomSheet isOpen={isOpen} onClose={onClose} id={id} />
      )),
  };
};

export default useRestaurantDetailBottomSheet;
