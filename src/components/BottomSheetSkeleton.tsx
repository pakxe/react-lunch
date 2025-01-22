import BottomSheet from './BottomSheet';
import Spinner from './Spinner';

type Props = {
  size: 'small' | 'medium' | 'large';
};

const BottomSheetSkeleton = ({ size }: Props) => {
  return (
    <BottomSheet isOpen={true} onClose={() => {}} size={size}>
      <Spinner />
    </BottomSheet>
  );
};

export default BottomSheetSkeleton;
