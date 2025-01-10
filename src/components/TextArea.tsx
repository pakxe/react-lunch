import { css, useTheme } from '@emotion/react';
import { ComponentProps } from 'react';
import { TYPOGRAPHY } from '../constants/typography';

type TextAreaProps = ComponentProps<'textarea'> & {
  fullWidth?: boolean;
};

const TextArea = ({ fullWidth, ...rest }: TextAreaProps) => {
  const theme = useTheme();

  return (
    <textarea
      {...rest}
      css={css`
        width: ${fullWidth ? '100%' : 'auto'};

        border: 1px solid ${theme.colors.gray2};
        border-radius: 8px;

        padding: 8px 16px;

        resize: vertical;

        ${TYPOGRAPHY.body};

        ::-webkit-resizer {
          border-width: 8px;
          border-style: solid;
          border-color: transparent gray gray transparent;
        }
      `}
    />
  );
};

export default TextArea;
