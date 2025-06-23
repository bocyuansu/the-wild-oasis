import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Settings() {
  return (
    <Row>
      <Heading level={1}>更新旅館設定</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
