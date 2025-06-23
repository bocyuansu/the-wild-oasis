import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="w-5 h-5 text-brand-600" />
      ) : (
        <HiOutlineMoon className="w-5 h-5 text-brand-600" />
      )}
      <span>主題</span>
    </ButtonIcon>
  );
}

export default DarkModeToggle;
