import { css, useTheme } from '@emotion/react';
import { useState, ComponentProps, ReactElement, cloneElement } from 'react';
import makeChildrenArray from '../../utils/makeChildrenArray';

type OptionType = ReactElement<ComponentProps<typeof Option>>;

interface DropdownProps {
  children: OptionType | OptionType[];
  defaultValue?: string;
  fullWidth?: boolean;
  onClick?: (value: string) => void;
}

interface DropdownOptionProps {
  value: string;
  children: string;
  onClick?: (value: string, name: string) => void;
}

const Dropdown = ({ children, defaultValue, fullWidth, onClick }: DropdownProps) => {
  const childrenArray = makeChildrenArray(children);
  const selectedOption =
    childrenArray.find((child) => child.props.value === defaultValue)?.props.children ||
    childrenArray[0].props.children;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(String(selectedOption));

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string, name: string) => {
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
        border: 1px solid ${theme.colors.gray2};
        width: ${fullWidth ? '100%' : 'auto'};
      `}>
      <button onClick={toggleDropdown} style={{ padding: '8px 16px', cursor: 'pointer', width: '100%' }}>
        {selectedValue}
      </button>
      {isOpen && (
        <ul
          css={css`
            position: fixed;
            background-color: ${theme.colors.gray1};
            border: 1px solid ${theme.colors.gray2};
            border-top: none;
            z-index: 1;
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
      {children}
    </li>
  );
};

Dropdown.Option = Option;

export default Dropdown;
