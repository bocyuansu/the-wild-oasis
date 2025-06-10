import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-1">
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser className="w-5 h-5 text-brand-600" />
          <span>會員資料</span>
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
