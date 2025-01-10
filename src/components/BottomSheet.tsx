import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Text from './Text';

const getHeight = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return '30%';
    case 'medium':
      return '50%';
    case 'large':
      return '80%';
    default:
      return '50%';
  }
};

const container = css({
  zIndex: 1,
  position: 'fixed',
  inset: 0,

  width: '100%',
  height: '100%',

  margin: '0',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

const dimmer = css({
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',

  backgroundColor: 'rgba(0, 0, 0, 0.5)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
});

const content = (size: 'small' | 'medium' | 'large') =>
  css({
    position: 'relative',

    width: '100%',
    height: getHeight(size),

    backgroundColor: 'white',
    borderRadius: '8px 8px 0 0',

    padding: '1rem',
  });

const bottomSheetStyle = {
  dimmer,
  container,
};

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: 'small' | 'medium' | 'large';
  title?: string;
};

const BottomSheet = ({ children, isOpen, onClose, size, title }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div css={bottomSheetStyle.container}>
      <Dimmer onClose={onClose} />
      <BottomSheetContent size={size} title={title}>
        {children}
      </BottomSheetContent>
    </div>
  );
};

const Dimmer = ({ onClose }: Pick<Props, 'onClose'>) => {
  return <div onClick={onClose} css={bottomSheetStyle.dimmer} />;
};

const BottomSheetContent = ({ children, title, size = 'small' }: Pick<Props, 'children' | 'size' | 'title'>) => {
  return (
    <div css={content(size)}>
      <Text type='title'>{title}</Text>
      {children}
    </div>
  );
};

export default BottomSheet;
