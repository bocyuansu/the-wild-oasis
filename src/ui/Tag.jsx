const textColor = {
  blue: 'text-blue-700',
  green: 'text-green-700',
  silver: 'text-silver-700',
};

const bgColor = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  silver: 'bg-silver-100',
};

function Tag({ children, type }) {
  return (
    <span
      className={`w-fit uppercase text-xs font-semibold px-3 py-1 rounded-[100px] ${textColor[type]} ${bgColor[type]}`}
    >
      {children}
    </span>
  );
}

export default Tag;
