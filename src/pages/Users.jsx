import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers() {
  return (
    <>
      <Heading level={1}>新增用戶</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
