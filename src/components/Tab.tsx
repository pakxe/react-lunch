import { cloneElement, ComponentProps, ReactElement, ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import Text from './Text';
import Line from './Line';
import Spacing from './Spacing';
import makeChildrenArray from '../utils/makeChildrenArray';

type OptionType = ReactElement<ComponentProps<typeof Option>>;

type TabProps = {
  defaultTabValue: string;
  onSelectTab: (tab: string) => void;
  children: OptionType | OptionType[];
};

const Tab = ({ defaultTabValue, onSelectTab, children }: TabProps) => {
  const childrenArray = makeChildrenArray(children);
  const selectedTabValue =
    childrenArray.find((child) => child.props.value === defaultTabValue)?.props.value ?? childrenArray[0].props.value;

  const [selectedTab, setSelectedTab] = useState(selectedTabValue);

  const onSelect = (value: string) => {
    onSelectTab(value);
    setSelectedTab(value);
  };

  return (
    <ul
      css={css`
        width: 100%;
        padding: 16px 0;

        display: flex;
      `}>
      {childrenArray.map((child) => {
        const isSelected = child.props.value === selectedTab;

        return cloneElement(child, { isSelected, onSelect });
      })}
    </ul>
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
    <li
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
    </li>
  );
};

Tab.Option = Option;

export default Tab;
