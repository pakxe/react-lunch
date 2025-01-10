import { css, SerializedStyles } from '@emotion/react';
import { useEffect, useState } from 'react';
import Text from './Text';

type Props = {
  cssProp?: SerializedStyles;
  onClick?: () => void;
  value?: boolean;
};

// 완전 컨트롤드
const Toggle = ({ cssProp, onClick, value }: Props) => {
  const [isToggled, setIsToggled] = useState(value ?? false);

  useEffect(() => {
    setIsToggled(value ?? false);
  }, [value]);

  const handleToggle = () => {
    if (onClick) onClick();

    setIsToggled((prev) => !prev);
  };

  return (
    <button
      onClick={handleToggle}
      css={css`
        width: 16px;
        height: 16px;
        cursor: pointer;
        padding: 16px;

        ${cssProp};
      `}>
      <Text type='title' color='primary'>
        {isToggled ? '★' : '☆'}
      </Text>
    </button>
  );
};

export default Toggle;
