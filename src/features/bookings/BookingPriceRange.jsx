import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Input(props) {
  return (
    <input
      className="border border-solid border-grey-300 bg-grey-50 rounded-sm px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm w-20"
      {...props}
    />
  );
}

function BookingPriceRange() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPrice, setTotalPrice] = useState({
    totalPriceStart: searchParams.get('totalPriceStart') || '',
    totalPriceEnd: searchParams.get('totalPriceEnd') || '',
  });

  // debounce
  const timeoutIdRef = useRef(null);

  // 組件移除時，清除 timeout
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  function handleChange(e, field) {
    const value = e.target.value;

    setTotalPrice({ ...totalPrice, [field]: value });

    // 檢查是否為數字且不為負數
    if (!/^(\d+)?$/.test(value)) return;

    const newSearchParams = new URLSearchParams(searchParams);

    if (searchParams.get('page')) {
      newSearchParams.set('page', 1);
    }

    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      newSearchParams.set(field, e.target.value);
      setSearchParams(newSearchParams);
    }, 500);
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <Input
        type="text"
        placeholder="最低價"
        value={totalPrice.totalPriceStart}
        onChange={(e) => handleChange(e, 'totalPriceStart')}
      />
      <span>至</span>
      <Input
        type="text"
        placeholder="最高價"
        value={totalPrice.totalPriceEnd}
        onChange={(e) => handleChange(e, 'totalPriceEnd')}
      />
    </div>
  );
}

export default BookingPriceRange;
