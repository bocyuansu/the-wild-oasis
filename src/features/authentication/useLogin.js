import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('登入成功');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.log('ERROR', error);
      toast.error('帳號或密碼錯誤!');
    },
  });

  return { login, isPending };
}
