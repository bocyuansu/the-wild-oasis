import { useDarkMode } from '../context/DarkModeContext';

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

  return (
    <div className="text-center">
      <img className="inline-block h-24 w-auto" src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
