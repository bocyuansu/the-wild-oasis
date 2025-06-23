const types = {
  regular:
    'px-10 py-6 bg-grey-0 border border-solid border-grey-100 rounded-md',
  modal: 'w-200 p-2',
  login:
    'px-10 py-6 bg-grey-0 border border-solid border-grey-100 rounded-lg shadow-sm',
};

function Form({ type = 'regular', children, onSubmit }) {
  return (
    <form
      className={`overflow-hidden text-sm ${types[type]}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
