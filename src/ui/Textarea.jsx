function Textarea(props) {
  return (
    <textarea
      className="px-3 py-2 border border-solid border-grey-300 rounded-sm bg-grey-0 shadow-sm w-full h-20 focus:outline-none focus:ring-2 focus:ring-violet-500"
      {...props}
    />
  );
}

export default Textarea;
