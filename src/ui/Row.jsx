function Row({ type, children }) {
  if (type === 'horizontal') {
    return <div className='flex justify-between items-center'>{children}</div>;
  }

  return <div className='flex flex-col gap-[1.6rem]'>{children}</div>;
}

export default Row;
