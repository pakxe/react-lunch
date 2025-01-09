import { css, SerializedStyles, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

type Props = {
  cssProp?: SerializedStyles;
  onClick?: () => void;
  value?: boolean;
};

// 완전 컨트롤드
const Toggle = ({ cssProp, onClick, value }: Props) => {
  const [isToggled, setIsToggled] = useState(value ?? false);

  // TODO: 뭔가 이상한거같다 로직이
  useEffect(() => {
    setIsToggled(value ?? false);
  }, [value]);

  const handleToggle = () => {
    if (onClick) onClick();

    setIsToggled((prev) => !prev);
  };

  const theme = useTheme();

  return (
    <button
      onClick={handleToggle}
      css={css`
        width: 16px;
        height: 16px;
        background-color: ${isToggled ? theme.colors.primary : theme.colors.gray2};
        color: white;
        cursor: pointer;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        ${cssProp}
      `}>
      {isToggled ? 'On' : 'Off'}
    </button>
  );
};

export default Toggle;
