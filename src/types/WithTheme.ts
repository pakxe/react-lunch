import { Theme } from '@emotion/react/dist/declarations/src';

type WithTheme<P = unknown> = P & {
  theme: Theme;
};

export default WithTheme;
