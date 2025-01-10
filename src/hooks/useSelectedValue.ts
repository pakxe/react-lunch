import { useState } from 'react';

/**
 * 한정된 타입의 값을 선택할 수 있는 훅
 * @param defaultValue 초기값
 * @param validValueList 들어올 수 있는 값 배열
 * @returns 현재 선택된 값, 선택된 값 변경 함수
 */
const useSelectedValue = <T>(defaultValue: T, validValueList: readonly T[]): [T, (value: any) => void] => {
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue);

  const isValidValue = (value: any): value is T => {
    return validValueList.includes(value as T);
  };

  const handleSelectedValue = (value: any) => {
    if (!isValidValue(value)) return;

    setSelectedValue(value);
  };

  return [selectedValue, handleSelectedValue];
};

export default useSelectedValue;
