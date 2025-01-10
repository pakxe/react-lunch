import { cloneElement, ComponentProps, ReactElement, ReactNode, useState } from 'react';
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

  const onSelect = (value: string) => {
    onSelectTab(value);
    setSelectedTab(value);
  };

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

          return cloneElement(child, { isSelected, onSelect });
        })}
      </div>
    </div>
  );
};

type OptionProps = {
  value: string;
  children: ReactNode;
  isSelected?: boolean;
  onSelect?: (value: string) => void;
};

const Option = ({ value, children, isSelected, onSelect }: OptionProps) => {
  const theme = useTheme();

  return (
    <div
      key={value}
      css={css`
        flex-grow: 1;
        padding: 8px 16px;
        cursor: pointer;
        border-bottom: 2px solid ${isSelected ? theme.colors.primary : 'transparent'};
      `}
      onClick={() => {
        if (onSelect) onSelect(value);
      }}>
      <Text textAlign='center' color={isSelected ? 'primary' : 'gray2'}>
        {children}
      </Text>
    </div>
  );
};

Tab.Option = Option;

export default Tab;
