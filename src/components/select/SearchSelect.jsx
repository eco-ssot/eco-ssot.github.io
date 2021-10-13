import BaseReactSelect, { BaseAsyncReactSelect } from './BaseReactSelect';

export function AsyncSearchSelect({ defaultOptions = [], loadOptions = () => {}, ...props }) {
  return <BaseAsyncReactSelect cacheOptions defaultOptions={defaultOptions} loadOptions={loadOptions} {...props} />;
}

export default function SearchSelect({
  options = [],
  value = {},
  label = '',
  onChange = () => {},
  onBlur = () => {},
  ...props
}) {
  return (
    <BaseReactSelect options={options} value={value} label={label} onChange={onChange} onBlur={onBlur} {...props} />
  );
}
