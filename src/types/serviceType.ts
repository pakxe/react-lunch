export type Category = 'korean' | 'chinese' | 'japanese' | 'western' | 'asian' | 'etc';

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
