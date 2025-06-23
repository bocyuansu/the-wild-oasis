import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isPending, isError, error };
}
