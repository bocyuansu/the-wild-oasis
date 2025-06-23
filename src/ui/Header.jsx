import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <header className="bg-grey-0 px-12 py-3 border-b border-solid border-grey-100 flex gap-6 items-center justify-end">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
