import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function PaginationButton({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        active ? 'bg-brand-600 text-brand-50' : 'bg-grey-50 text-inherit'
      } border-none rounded-sm font-medium text-sm flex items-center justify-center gap-1 px-3 py-1.5 transition-all duration-300 has-[span:last-child]:pl-1 has-[span:first-child]:pr-1 [&_svg]:h-4.5 [&_svg]:w-4.5 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50`}
    >
      {children}
    </button>
  );
}

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // 計算頁數
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      {/* LEFT */}
      <p className="text-sm ml-2 [&_span]:font-semibold">
        第 <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> 筆 至 第{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        筆 / 共 <span>{count}</span> 筆
      </p>
      {/* RIGHT */}
      <div className="flex gap-1.5">
        {currentPage > 1 && (
          <PaginationButton onClick={prevPage}>
            <HiChevronLeft /> <span>上一頁</span>
          </PaginationButton>
        )}
        {currentPage < pageCount && (
          <PaginationButton onClick={nextPage}>
            <span>下一頁</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </div>
    </div>
  );
}

export default Pagination;
