import { css, useTheme } from '@emotion/react';
import { useState, ComponentProps, ReactElement, cloneElement } from 'react';
import makeChildrenArray from '../../utils/makeChildrenArray';
import Text from '../Text';

type OptionType = ReactElement<ComponentProps<typeof Option>>;

type Value = string | number;

interface DropdownProps {
  children: OptionType | OptionType[];
  defaultValue?: Value;
  fullWidth?: boolean;
  onClick?: (value: Value) => void;
}

interface DropdownOptionProps {
  value: Value;
  children: string;
  onClick?: (value: Value, name: string) => void;
}

const Dropdown = ({ children, defaultValue, fullWidth, onClick }: DropdownProps) => {
  const childrenArray = makeChildrenArray(children);
  const selectedOption =
    childrenArray.find((child) => child.props.value === defaultValue)?.props.children ||
    childrenArray[0].props.children;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(String(selectedOption));

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: Value, name: string) => {
    if (onClick) {
      onClick(value);
    }

    setSelectedValue(name);
    setIsOpen(false);
  };

  const theme = useTheme();

  return (
    <div
      css={css`
        position: relative;
      `}>
      <button
        onClick={toggleDropdown}
        css={css`
          border: 1px solid ${theme.colors.gray2};
          width: ${fullWidth ? '100%' : '125px'};
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
        `}>
        <Text>{selectedValue}</Text>
      </button>
      {isOpen && (
        <ul
          css={css`
            position: absolute;
            top: 0;

            background-color: ${theme.colors.gray1};
            border: 1px solid ${theme.colors.gray2};

            z-index: 1;

            width: ${fullWidth ? '100%' : '125px'};

            border-radius: 8px;
          `}>
          {childrenArray.map((child) => {
            return cloneElement(child, {
              value: child.props.value,
              onClick: handleOptionClick,
            });
          })}
        </ul>
      )}
    </div>
  );
};

const Option = ({ value, children, onClick }: DropdownOptionProps) => {
  return (
    <li
      key={value}
      css={css`
        width: 100%;

        cursor: pointer;
        padding: 8px 16px;
      `}
      onClick={() => {
        if (onClick) {
          onClick(value, children);
        }
      }}>
      <Text>{children}</Text>
    </li>
  );
};

Dropdown.Option = Option;

export default Dropdown;
