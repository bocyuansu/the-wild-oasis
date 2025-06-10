import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  // queryKey 用來辨別資料，類似一組資料的id
  // queryFn 必須返回一個 Promise
  const {
    isPending,
    isError,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isPending, isError, cabins, error };
}
