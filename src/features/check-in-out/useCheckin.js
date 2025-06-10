import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`#${data.id} 房號:${data.cabins.name} 登記入住成功`);
      queryClient.invalidateQueries({ active: true });
      navigate('/bookings');
    },

    onError: () => toast.error('登記入住失敗，請稍後再試'),
  });

  return { checkin, isCheckingIn };
}
