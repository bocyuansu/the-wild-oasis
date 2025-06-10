import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isPending } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow id="fullName" label="用戶名稱" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register('fullName', { required: '必填' })}
        />
      </FormRow>

      <FormRow id="email" label="帳號 (信箱)" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register('email', {
            required: '必填',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '請提供有效的電子信箱',
            },
          })}
        />
      </FormRow>

      <FormRow id="password" label="密碼" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register('password', {
            required: '必填',
            minLength: {
              value: 8,
              message: '密碼至少8個字',
            },
            maxLength: {
              value: 20,
              message: '密碼不能超過20個字',
            },
            validate: (value) => {
              if (!/^[A-Za-z0-9_]+$/.test(value)) {
                return '不能有空格和特殊字元';
              }

              if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/.test(value)) {
                return '密碼必須包含大小寫字母與數字';
              }
            },
          })}
        />
        <div className="col-span-full text-sm flex flex-col">
          <span className="text-green-500">
            ✅長度 8-20 字元、大寫與小寫字母、至少一個數字
          </span>
          <span className="text-red-500">❌不能有空格和特殊字元</span>
        </div>
      </FormRow>

      <FormRow
        id="passwordConfirm"
        label="確認密碼"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register('passwordConfirm', {
            required: '必填',
            validate: (value) =>
              value === getValues().password || '密碼必須相同',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          取消
        </Button>
        <Button>新增</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
