import { css } from '@emotion/react';
import { WithChildren } from '../types/with';

const Layout = ({ children }: WithChildren) => {
  return (
    <div
      css={css`
        max-width: 768px;
        width: 100%;
        min-height: calc(100vh - 64px);

        overflow-y: scroll;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        border: 1px solid #f2f2f2;

        padding: 0 16px;

        margin: 64px 0 0 0;
      `}>
      {children}
    </div>
  );
};

export default Layout;
