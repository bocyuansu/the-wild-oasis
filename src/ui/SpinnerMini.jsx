import { BiLoaderAlt } from 'react-icons/bi';

function SpinnerMini({ size = '', color = '' }) {
  return (
    <div className="flex justify-center">
      <BiLoaderAlt className={`stroke-1 animate-spin ${size} ${color}`} />
    </div>
  );
}

export default SpinnerMini;
