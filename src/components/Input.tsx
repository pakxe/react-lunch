import { ComponentProps } from 'react';
import { css, useTheme } from '@emotion/react';
import { TYPOGRAPHY } from '../constants/typography';

type Props = ComponentProps<'input'> & {
  fullWidth?: boolean;
};

const Input = ({ fullWidth, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <input
      {...rest}
      css={css`
        height: 36px;
        width: ${fullWidth ? '100%' : 'auto'};

        border: 1px solid ${theme.colors.gray2};
        border-radius: 8px;

        padding: 8px 16px;

        ${TYPOGRAPHY.body}
      `}
    />
  );
};

export default Input;
