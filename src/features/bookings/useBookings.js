import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // filter on Server
  const statusValue = searchParams.get('status') || 'all';
  const totalPriceStartValue = searchParams.get('totalPriceStart') || 0;
  const totalPriceEndValue = searchParams.get('totalPriceEnd') || 99999;

  const filterOptions = [
    {
      method: 'eq',
      field: 'status',
      value: statusValue === 'all' ? null : statusValue,
    },
    {
      method: 'gte',
      field: 'totalPrice',
      value: Number(totalPriceStartValue),
    },
    {
      method: 'lte',
      field: 'totalPrice',
      value: Number(totalPriceEndValue),
    },
  ];

  // Sort
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const {
    isPending,
    isError,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filterOptions, sortBy, page],
    queryFn: () => getBookings(filterOptions, sortBy, page),
  });

  // Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const nextPage = page + 1;
  const prevPage = page - 1;

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterOptions, sortBy, nextPage],
      queryFn: () => getBookings(filterOptions, sortBy, nextPage),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterOptions, sortBy, prevPage],
      queryFn: () => getBookings(filterOptions, sortBy, prevPage),
    });
  }

  return { isPending, isError, bookings, count, error };
}
