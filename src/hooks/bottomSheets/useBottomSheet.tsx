import { createContext, ReactNode, useContext, useState } from 'react';
import { BOTTOM_SHEET_KEY } from '../../constants/bottomSheetKey';

const BottomSheetContext = createContext<ReturnType<typeof useBottomSheet> | null>(null);

type BottomSheetKey = keyof typeof BOTTOM_SHEET_KEY;
type BottomSheet = {
  id: BottomSheetKey;
  isOpen: boolean;
  cb: any;
};

const useBottomSheet = () => {
  const [bottomSheets, setBottomSheets] = useState<Map<BottomSheetKey, BottomSheet>>(new Map());

  const open = (key: BottomSheetKey, cb: (isOpen: boolean, onClose: () => void) => any) => {
    setBottomSheets((prev) => {
      const newBottomSheets = new Map(prev);
      newBottomSheets.set(key, { id: key, isOpen: true, cb });
      return newBottomSheets;
    });
  };

  const close = (key: BottomSheetKey) => {
    if (!bottomSheets.has(key)) return;

    setBottomSheets((prev) => {
      const newBottomSheets = new Map(prev);
      const bottomSheet = newBottomSheets.get(key);
      if (bottomSheet) {
        bottomSheet.isOpen = false;
        bottomSheet.cb(bottomSheet.isOpen, () => close(key));
      }
      return newBottomSheets;
    });
  };

  return {
    bottomSheets,
    open,
    close,
  };
};

const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheetContext must be used within a BottomSheetProvider');
  }

  return context;
};

const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const values = useBottomSheet();

  return (
    <BottomSheetContext.Provider value={{ ...values }}>
      {children}
      {Array.from(values.bottomSheets).map(
        ([key, value]) => value.isOpen && value.cb(value.isOpen, () => values.close(key)),
      )}
    </BottomSheetContext.Provider>
  );
};

export { BottomSheetProvider, useBottomSheetContext };
