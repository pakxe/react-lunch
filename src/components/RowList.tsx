import { css } from '@emotion/react';
import { WithChildren } from '../types/withChildren';
import Line from './Line';
import { Children } from 'react';

const RowList = ({ children }: WithChildren) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}>
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < Children.count(children) - 1 && <Line />}
        </>
      ))}
    </div>
  );
};

export default RowList;
