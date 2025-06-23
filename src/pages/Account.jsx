import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';

import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Heading level={1}>會員資料</Heading>

      <Row>
        <Heading level={1}>變更姓名或大頭貼</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading level={1}>變更密碼</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
