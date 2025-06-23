import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value, defaultValue } = e.target;
    if (!value || Number(value) === Number(defaultValue)) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="每筆訂單入住天數下限">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="每筆訂單入住天數上限">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="每筆訂單入住客人上限">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="早餐價格">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
