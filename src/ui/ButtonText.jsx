function ButtonText({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-lg text-grey-600 font-medium text-center transition-all duration-300 bg-none border-none rounded-sm px-3 py-1.5 hover:bg-grey-100 hover:text-brand-600 active:text-brand-600"
    >
      {children}
    </button>
  );
}

export default ButtonText;
