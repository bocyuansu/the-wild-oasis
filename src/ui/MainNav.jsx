import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

function StyleNavLink({ to, children }) {
  return (
    <NavLink
      className="flex items-center gap-3 text-grey-600 text-lg tracking-wider font-medium px-6 py-3 [&_svg]:w-6 [&_svg]:h-6 [&_svg]:text-grey-400 transition-all duration-300 hover:text-grey-800 hover:bg-grey-50 [&:hover_svg]:text-brand-600 [&.active]:bg-grey-50 [&.active_svg]:text-brand-600 hover:rounded-sm"
      to={to}
    >
      {children}
    </NavLink>
  );
}

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <StyleNavLink to="/dashboard">
            <HiOutlineHome />
            <span>首頁</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>預訂</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>客房</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/users">
            <HiOutlineUsers />
            <span>註冊</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>設定</span>
          </StyleNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
