import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // Mutation 通常用於建立/更新/刪除資料或執行伺服器副作用
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('成功刪除客房');

      // 使 cabins 資料無效，觸發 Refetch
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
