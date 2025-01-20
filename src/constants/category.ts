import { Category } from '../types/serviceType';

export const CATEGORY = ['korean', 'chinese', 'japanese', 'western', 'asian', 'etc'] as const;

export const CATEGORY_LIST: { value: Category; name: string }[] = [
  { value: 'korean', name: '한식' },
  { value: 'chinese', name: '중식' },
  { value: 'japanese', name: '일식' },
  { value: 'western', name: '양식' },
  { value: 'asian', name: '아시안' },
  { value: 'etc', name: '기타' },
];
