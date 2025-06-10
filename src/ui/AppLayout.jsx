import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Main({ children }) {
  return (
    <main className="bg-grey-50 pt-10 px-12 pb-16 overflow-y-scroll">
      {children}
    </main>
  );
}

function Container({ children }) {
  return (
    <div className="max-w-300 mx-auto my-0 flex flex-col gap-8">{children}</div>
  );
}

function AppLayout() {
  return (
    <div className="grid grid-cols-[16.25rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </div>
  );
}

export default AppLayout;
