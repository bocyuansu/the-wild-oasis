import MainNav from './MainNav';
import Logo from './Logo';

function Sidebar() {
  return (
    <aside className="bg-grey-0 px-6 py-8 border-r border-solid border-grey-100 row-span-full flex flex-col gap-8">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
