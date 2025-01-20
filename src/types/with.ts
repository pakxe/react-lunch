import { Theme } from '@emotion/react/dist/declarations/src';

export type WithChildren<P = unknown> = P & {
  children: React.ReactNode;
};

export type WithTheme<P = unknown> = P & {
  theme: Theme;
};
