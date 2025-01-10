import { css, useTheme } from '@emotion/react';

type HeaderProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const Header = ({ left, right }: HeaderProps) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        max-width: 768px;
        width: 100%;
        height: 64px;
        inset: 0;
        z-index: 2;
        background-color: ${theme.colors.primary};
        margin: 0 auto;

        display: flex;
        justify-content: space-between;
        align-items: center;

        color: ${theme.colors.gray1};

        padding: 20px 16px;

        position: fixed;
      `}>
      {left}
      {right}
    </div>
  );
};

export default Header;
