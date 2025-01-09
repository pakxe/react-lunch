import { ComponentProps, ReactElement, ReactNode, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import Text from './Text';

type OptionType = ReactElement<ComponentProps<typeof Option>>;

type TabProps = {
  defaultTab: string;
  onSelectTab: (tab: string) => void;
  children: OptionType | OptionType[];
};

// TODO: 언더라인
const Tab = ({ defaultTab, onSelectTab, children }: TabProps) => {
  const validatedChildren = Array.isArray(children) ? children : [children];
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 100%;
      `}>
      <div
        css={css`
          display: flex;
          border-bottom: 2px solid #ccc;
        `}>
        {validatedChildren.map((child) => {
          const isSelected = child.props.value === selectedTab;

          return (
            <div
              key={child.props.value}
              css={css`
                flex-grow: 1;
                padding: 8px 16px;
                cursor: pointer;
                border-bottom: 2px solid ${isSelected ? theme.colors.primary : 'transparent'};
              `}
              onClick={() => {
                onSelectTab(child.props.value);
                setSelectedTab(child.props.value);
              }}>
              <Text textAlign='center' color={isSelected ? 'primary' : 'gray2'}>
                {child.props.children}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type OptionProps = {
  value: string;
  children: ReactNode;
};

const Option = ({ value, children }: OptionProps) => {
  return <>{children}</>;
};

Tab.Option = Option;

export default Tab;
