import { ComponentProps } from 'react';
import { css, useTheme } from '@emotion/react';

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

        border: 1px solid ${theme.colors.gray3};
        border-radius: 4px;

        padding: 0.5rem;
      `}
    />
  );
};

export default Input;
