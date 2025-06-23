import { useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // 提取邏輯 Custom Hook
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  // 判斷使用者操作：Create or Edit
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId); // True: Edit ; False: Create

  // 使用 React-hook-form 簡化表單操作
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // 取得表單錯誤
  const { errors } = formState;

  // 表單驗證成功 -> 提交表單資料
  function onSubmit(data) {
    // console.log(data); 提交給 supabase 的資料 (request)
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      // onSuccess 可以在 useMutation 或 mutate 中使用
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // 表單驗證失敗 -> 顯示錯誤訊息
  function onError(errors) {
    console.log('表單資料錯誤', errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow id="name" label="房號" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: '必填' })}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        label="住房人數"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: '必填',
            min: {
              value: 1,
              message: '住房人數必須大於一',
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="定價"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: '必填',
            min: {
              value: 1,
              message: '定價必須大於零',
            },
          })}
        />
      </FormRow>

      <FormRow id="discount" label="折扣" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: '必填',
            min: {
              value: 0,
              message: '折扣至少為零',
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              '折扣必須小於定價',
          })}
        />
      </FormRow>

      <FormRow
        id="description"
        label="簡介"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: '必填' })}
        />
      </FormRow>

      <FormRow id="image" label="客房圖片">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : '必填',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          取消
        </Button>
        <Button disabled={isWorking}>{isEditSession ? '編輯' : '新增'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
