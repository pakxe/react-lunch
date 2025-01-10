import { css, useTheme } from '@emotion/react';
import theme from '../theme';

type LineProps = {
  color?: keyof typeof theme.colors;
  height?: number;
};

const Line = ({ color, height }: LineProps) => {
  const theme = useTheme();

  return (
    <hr
      css={css`
        border-bottom: ${height ?? 1}px solid ${color ? theme.colors[color] : theme.colors.gray2};
        width: 100%;
      `}
    />
  );
};

export default Line;
