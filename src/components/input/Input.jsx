import { isNil } from 'lodash';

export default function Input({
  onChange,
  onBlur,
  value = '',
  placeholder = '',
  suffix = '',
  prefix = '',
  type = 'text',
}) {
  return (
    <div className="flex justify-center">
      <div className="w-auto mx-auto relative">
        <input
          value={isNil(value) ? '' : value}
          type={type}
          className="bg-gray-50 bg-opacity-20 text-center shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-20 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50"
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {prefix && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{prefix}</div>}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{suffix}</div>
        )}
      </div>
    </div>
  );
}
