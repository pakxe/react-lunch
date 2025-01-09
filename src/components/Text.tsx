import { css, useTheme } from '@emotion/react';
import { ComponentProps } from 'react';
import { WithChildren } from '../types/WithChildren';
import { TYPOGRAPHY } from '../constants/typography';
import theme from '../theme';

type Props = WithChildren &
  ComponentProps<'p'> & {
    type?: keyof typeof TYPOGRAPHY;
    textAlign?: 'left' | 'center' | 'right';
    color?: keyof typeof theme.colors;
    required?: boolean;
  };

const Text = ({ type = 'body', color, textAlign, required, children }: Props) => {
  const theme = useTheme();

  return (
    <p
      css={css`
        ${TYPOGRAPHY[type]}
        color: ${color ? theme.colors[color] : theme.colors.gray5};
        text-align: ${textAlign || 'left'};

        display: flex;
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
