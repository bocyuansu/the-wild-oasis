import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="密碼" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
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

      <FormRow label="確認密碼" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: '必填',
            validate: (value) =>
              getValues().password === value || '密碼必須相同',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          取消
        </Button>
        <Button disabled={isUpdating}>儲存</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
