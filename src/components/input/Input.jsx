export default function Input({ value, onChange, onBlur }) {
  return (
    <div className="flex justify-center">
      <div className="w-auto mx-auto">
        <input
          value={value}
          type="text"
          className="bg-gray-50 bg-opacity-20 text-center shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-20 rounded py-1 px-2"
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
