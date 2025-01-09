// 상수 파일은 변형될 가능성이 크므로 default export 를 사용하지 않음

export const TYPOGRAPHY = {
  title: {
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '24px',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '28px',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
  },
  caption: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
  },
} as const;
