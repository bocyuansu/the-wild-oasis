function StyledFormRow({ children }) {
  return (
    <div className="grid items-center grid-cols-[15rem_1fr_1.2fr] gap-x-6 gap-y-2 px-0 py-3 [&:first-child]:pt-0 [&:last-child]:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-solid [&:not(:last-child)]:border-grey-100 [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-3">
      {children}
    </div>
  );
}

function FormRow({ id, label, error, children }) {
  return (
    <StyledFormRow>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-sm text-red-700 col-start-3 col-end-4 row-start-1 row-end-2">
          {error}
        </span>
      )}
    </StyledFormRow>
  );
}

export default FormRow;
