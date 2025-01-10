import { CATEGORY } from '../constants/category';

export type Category = (typeof CATEGORY)[number];

export type TimeToMove = 5 | 10 | 15 | 20;

export type Restaurant = {
  id: number;
  name: string;
  category: Category;
  timeToMove: number;
  description: string;
  favorite: boolean;
  link?: string;
};
