import { cloneElement, ComponentProps, ReactElement, ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import Text from './Text';
import Line from './Line';
import Spacing from './Spacing';

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
        padding: 16px 0;
      `}>
      <div
        css={css`
          display: flex;
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
  return (
    <div
      key={value}
      css={css`
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
      `}
      onClick={() => {
        if (onSelect) onSelect(value);
      }}>
      <Text color={isSelected ? 'primary' : 'gray2'}>{children}</Text>
      <Spacing height={8} />
      <Line height={2} color={isSelected ? 'primary' : 'gray2'} />
    </div>
  );
};

Tab.Option = Option;

export default Tab;
