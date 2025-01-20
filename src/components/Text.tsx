import { css, useTheme } from '@emotion/react';
import { ComponentProps } from 'react';
import { TYPOGRAPHY } from '../constants/typography';
import theme from '../theme';
import { WithChildren } from '../types/with';

type Props = WithChildren &
  ComponentProps<'p'> & {
    type?: keyof typeof TYPOGRAPHY;
    textAlign?: 'left' | 'center' | 'right';
    color?: keyof typeof theme.colors;
    required?: boolean;
    lineLimit?: number;
  };

const Text = ({ type = 'body', color, textAlign, required, lineLimit, children }: Props) => {
  const theme = useTheme();

  return (
    <p
      css={css`
        ${TYPOGRAPHY[type]}
        color: ${color ? theme.colors[color] : theme.colors.gray5};
        text-align: ${textAlign || 'left'};

        display: flex;

        ${lineLimit &&
        css`
          overflow: hidden; /* 줄임표 사용하려면 모든 속성이 필요하다. */
          -webkit-line-clamp: ${lineLimit};
          -webkit-box-orient: vertical;
          display: -webkit-box;
        `}
      `}>
      {children}
      {required && (
        <div
          css={css`
            color: ${theme.colors.primary};
          `}>
          *
        </div>
      )}
    </p>
  );
};

export default Text;
