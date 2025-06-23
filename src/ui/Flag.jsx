function Flag({ children, src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-5 rounded-sm block border border-solid border-grey-100"
    >
      {children}
    </img>
  );
}

export default Flag;
