import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
import ButtonIcon from '../../ui/ButtonIcon';

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isPending}>
      {!isPending ? (
        <HiArrowRightOnRectangle className="w-5 h-5 text-brand-600" />
      ) : (
        <SpinnerMini size="w-4 h-4" color="text-brand-600" />
      )}
      <span>登出</span>
    </ButtonIcon>
  );
}

export default Logout;
