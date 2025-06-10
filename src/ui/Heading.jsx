function Heading({ level, children, className = null }) {
  switch (level) {
    case 1:
      return (
        <h1 className={`${className} text-3xl font-semibold`}>{children}</h1>
      );
    case 2:
      return (
        <h2 className={`${className} text-xl font-semibold`}>{children}</h2>
      );
    case 3:
      return <h3 className={`${className} text-xl font-medium`}>{children}</h3>;
    case 4:
      return (
        <h4
          className={`${className} text-3xl font-medium text-center tracking-widest`}
        >
          {children}
        </h4>
      );
    default:
      throw Error('Unknown level: ' + level);
  }
}

export default Heading;
