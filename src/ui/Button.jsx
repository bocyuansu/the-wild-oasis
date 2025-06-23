// 物件表示法
// sizes[props.size] 相當於 sizes.small

const sizes = {
  small: 'text-xs px-2 py-1 uppercase font-semibold text-center',
  medium: 'text-base px-3 py-1.5 font-medium',
  large: 'text-base px-6 py-3 font-medium',
};

const variations = {
  primary: 'text-white bg-indigo-500 hover:bg-indigo-600',
  secondary:
    'text-grey-0 border border-solid border-grey-200 bg-sky-500 hover:bg-sky-600',
  danger: 'text-red-100 bg-red-700 hover:bg-red-600',
};

function Button({
  variation = 'primary',
  size = 'medium',
  children,
  ...props
}) {
  return (
    <button
      className={`border-none rounded-sm shadow-sm ${sizes[size]} ${variations[variation]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
