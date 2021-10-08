import BaseReactSelect, { BaseAsyncReactSelect } from './BaseReactSelect';

export function AsyncSearchSelect() {
  return <BaseAsyncReactSelect cacheOptions defaultOptions loadOptions={() => {}} onInputChange={() => {}} />;
}

export default function SearchSelect({ options = [], value = {}, label = '', onChange = () => {}, onBlur = () => {} }) {
  return <BaseReactSelect options={options} value={value} label={label} onChange={onChange} onBlur={onBlur} />;
}
