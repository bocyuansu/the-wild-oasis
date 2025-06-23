import LoginForm from '../features/authentication/LoginForm';
import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

function LoginLayout({ children }) {
  return (
    <main className="min-h-screen grid grid-cols-[30rem] content-center justify-center gap-8 bg-grey-50">
      {children}
    </main>
  );
}

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading level={4}>會員登入</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
