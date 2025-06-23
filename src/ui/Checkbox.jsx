function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex gap-4 ">
      <input
        className="h-6 w-6 outline-offset-2 transform-origin-0 accent-brand-600 disabled:accent-brand-600"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={!disabled ? id : ''}
        className="flex-1 flex items-center gap-2"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
