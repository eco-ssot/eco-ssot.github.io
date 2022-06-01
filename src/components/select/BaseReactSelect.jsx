import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import tw from 'twin.macro';

import { colors } from '../../styles';

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    'input:focus': {
      boxShadow: 'none',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    ...tw`text-left text-sm`,
    ...(state.isSelected && {
      ...tw`text-gray-50 font-medium bg-transparent`,
    }),
    ...(state.isFocused && {
      ...tw`bg-primary-600`,
    }),
  }),
  control: (provided, state) => ({
    ...provided,
    ...tw`bg-transparent border border-divider bg-gray-50 bg-opacity-10 border-opacity-50 cursor-text min-h-0 hover:border-primary-600`,
    ...(state.isFocused && {
      ...tw`border-primary-600`,
    }),
    ...(state.menuIsOpen && {
      ...tw`border-primary-800`,
    }),
  }),
  menu: (provided, state) => ({
    ...provided,
    ...tw`mt-1`,
  }),
  menuList: (provided, state) => ({
    ...provided,
    ...tw`bg-primary-900 border border-divider rounded-md max-h-60 shadow-lg`,
  }),
  input: (provided, state) => ({
    ...provided,
    ...tw`w-auto text-left text-base py-0 h-full`,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    ...tw`text-base`,
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    ...tw`text-gray-300 hover:text-gray-50 cursor-pointer`,
  }),
};

export function CustomOption(props) {
  return (
    <div className="flex items-center">
      <components.Option {...props} />
      {props.isSelected && (
        <CheckIcon className={clsx('absolute right-2 h-5 w-5 text-gray-50', !props.isFocused && 'text-primary-600')} />
      )}
    </div>
  );
}

export function customTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: colors.primary['600'],
      primary25: colors.primary['600'],
      primary50: colors.primary['600'],
      primary75: colors.primary['600'],
      neutral0: colors.gray['900'],
      neutral5: colors.gray['800'],
      neutral10: colors.gray['700'],
      neutral20: colors.gray['600'],
      neutral30: colors.gray['500'],
      neutral40: colors.gray['400'],
      neutral50: colors.gray['300'],
      neutral60: colors.gray['200'],
      neutral70: colors.gray['100'],
      neutral80: colors.gray['50'],
      neutral90: colors.gray['50'],
    },
  };
}

export function BaseAsyncReactSelect({ className, strategy = 'absolute', ...props }) {
  return (
    <AsyncSelect
      className={clsx(className)}
      theme={customTheme}
      styles={customStyles}
      components={{
        DropdownIndicator: (props) => <ChevronDownIcon className="mr-2 h-5 w-5" />,
        IndicatorSeparator: (props) => null,
        Option: CustomOption,
      }}
      menuPlacement="auto"
      menuPosition={strategy}
      {...props}
    />
  );
}

export default function BaseReactSelect({ className, strategy = 'absolute', ...props }) {
  return (
    <Select
      className={clsx(className)}
      theme={customTheme}
      styles={customStyles}
      components={{
        DropdownIndicator: (props) => <ChevronDownIcon className="mr-2 h-5 w-5" />,
        IndicatorSeparator: (props) => null,
        Option: CustomOption,
      }}
      menuPlacement="auto"
      menuPosition={strategy}
      {...props}
    />
  );
}
