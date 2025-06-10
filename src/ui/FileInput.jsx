function FileInput(props) {
  return (
    <input
      type="file"
      className="file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded-sm file:border-none file:text-violet-700 file:bg-violet-50 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-violet-100"
      {...props}
    />
  );
}

export default FileInput;
