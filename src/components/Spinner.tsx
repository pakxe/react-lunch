import { css } from '@emotion/react';

const Spinner = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
      `}>
      <div
        css={css`
          width: 40px;
          height: 40px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        `}
      />
    </div>
  );
};

export default Spinner;
