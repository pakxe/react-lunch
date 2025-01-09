import { css, useTheme } from '@emotion/react';

const Line = () => {
  const theme = useTheme();

  return (
    <hr
      css={css`
        border: 1px solid ${theme.colors.gray2};
        width: 100%;
      `}
    />
  );
};

export default Line;
