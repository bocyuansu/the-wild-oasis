function ButtonIcon({ children, onClick, disabled }) {
  return (
    <button
      className="flex items-center gap-1 bg-none border-none p-1.5 rounded-sm transition-all duration-200 hover:bg-grey-50 text-sm"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
