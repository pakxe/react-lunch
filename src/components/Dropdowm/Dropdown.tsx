import { css, useTheme } from '@emotion/react';
import { useState, Children, ComponentProps, ReactElement } from 'react';

type OptionType = ReactElement<ComponentProps<typeof Option>>;

interface DropdownProps {
  children: OptionType | OptionType[];
  defaultValue?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

interface DropdownOptionProps {
  value: string;
  children: string;
}

const Dropdown = ({ children, defaultValue, fullWidth, onChange }: DropdownProps) => {
  const validatedChildren = Children.toArray(children) as OptionType[];
  const selectedLabel =
    validatedChildren.find((child) => child.props.value === defaultValue)?.props.children ||
    validatedChildren[0]?.props.children;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(String(selectedLabel));

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string, name: string) => {
    if (onChange) {
      onChange(value);
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
            width: 100%;
            z-index: 1;
          `}>
          {validatedChildren.map((child) => (
            <li
              key={child.props.value}
              css={css`
                width: 100%;

                cursor: pointer;
                padding: 8px 16px;
              `}
              onClick={() => handleOptionClick(child.props.value, String(child.props.children))}>
              {child.props.children}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Option = ({ value, children }: DropdownOptionProps) => {
  return <>{children}</>;
};

Dropdown.Option = Option;

export default Dropdown;
