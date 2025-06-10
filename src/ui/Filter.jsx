import { useSearchParams } from 'react-router-dom';

function FilterButton({ children, onClick, active, disabled }) {
  return (
    <button
      className={`border-none rounded-sm font-medium text-base px-2 py-1 tracking-wide transition-all duration-300 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 ${
        active ? 'bg-brand-600 text-brand-50' : 'bg-grey-0'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Filter({ filterField, options }) {
  // 設定 url 變數
  const [searchParams, setSearchParams] = useSearchParams();
  // 從 url 取得 filter value
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-solid border-grey-100 bg-grey-0 shadow-sm rounded-sm p-1 flex gap-1">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
