import { css, useTheme } from '@emotion/react';
import theme from '../theme';

type IconProps = {
  backgroundColor: keyof typeof theme.colors;
  src: string;
};

// TODO: 이미지 보이게 해야한다.
const Icon = ({ backgroundColor, src }: IconProps) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 64px;
        height: 64px;

        flex-shrink: 0; // 짜부되는걸 막는다.

        border-radius: 50%;

        background-color: ${theme.colors[backgroundColor]};

        display: flex;
        align-items: center;
        justify-content: center;
      `}>
      <img src={src} />
    </div>
  );
};

export default Icon;
