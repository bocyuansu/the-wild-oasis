import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`#${data.id} 房號:${data.cabins.name} 退房成功`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('退房失敗，請稍後再試'),
  });

  return { checkout, isCheckingOut };
}
