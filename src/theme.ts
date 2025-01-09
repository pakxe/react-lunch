// 라이트, 다크와 같은 특성의 테마에 따라 쉽게 바뀔 수 있는 값들을 위해 모아놓은 것

const colors = {
  primary: '#EC4A0A',
  primaryLighten: '#F6A88A',
  gray5: '#000000',
  gray4: '#344054',
  gray3: '#667085',
  gray2: '#D0D5DD',
  gray1: '#FFFFFF',
} as const;

const theme = {
  colors,
} as const;

export default theme;
