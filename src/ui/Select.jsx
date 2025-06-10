function Select({ options, value, onChange, type }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-sm px-3 py-2 border border-solid ${
        type === 'white' ? 'border-grey-100' : 'border-grey-300'
      } rounded-sm bg-grey-0 font-medium shadow-sm appearance-none hover:border-violet-500 focus:outline-violet-500`}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
