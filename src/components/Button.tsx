import { ComponentProps } from 'react';
import { css, useTheme } from '@emotion/react';
import { TYPOGRAPHY } from '../constants/typography';
import WithTheme from '../types/WithTheme';
import { WithChildren } from '../types/WithChildren';

type ButtonType = 'primary' | 'secondary';

type ButtonStyleProps = {
  variant?: ButtonType;
  fullWidth?: boolean;
};

// TODO: 복붙 리펙
type Props = ComponentProps<'button'> & ButtonStyleProps & WithChildren;

const buttonStyle = ({ variant, fullWidth, theme }: WithTheme<ButtonStyleProps>) =>
  css({
    borderRadius: '4px',

    ...getButtonTypeStyle({ variant: variant ?? 'primary', theme }),
    padding: '8px 14px',

    ...TYPOGRAPHY.caption,

    height: '36px',
    width: fullWidth ? '100%' : 'auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    wordBreak: 'keep-all',
  });

const getButtonTypeStyle = ({ variant, theme }: WithTheme<{ variant: ButtonType }>) => {
  const buttonTypeStyle = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.gray1,
    },
    secondary: {
      backgroundColor: theme.colors.gray1,
      color: theme.colors.gray4,
      border: `1px solid ${theme.colors.gray4}`,
    },
  };

  return buttonTypeStyle[variant];
};

const Button = ({ children, variant, fullWidth, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <button
      {...rest}
      css={css`
        ${buttonStyle({ variant, fullWidth, theme })}
      `}>
      {children}
    </button>
  );
};

export default Button;
