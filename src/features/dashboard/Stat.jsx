const iconColor = {
  blue: 'bg-blue-100 [&_svg]:text-blue-700',
  green: 'bg-green-100 [&_svg]:text-green-700',
  indigo: 'bg-indigo-100 [&_svg]:text-indigo-700',
  yellow: 'bg-yellow-100 [&_svg]:text-yellow-700',
};

function Box({ children }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-4 grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      {children}
    </div>
  );
}

function Icon({ children, color }) {
  return (
    <div
      className={`row-span-full aspect-square rounded-full flex items-center justify-center [&_svg]:w-8 [&_svg]:h-8 ${iconColor[color]}`}
    >
      {children}
    </div>
  );
}

function Title({ children }) {
  return (
    <h5 className="self-end text-sm uppercase font-semibold text-grey-500">
      {children}
    </h5>
  );
}

function Value({ children }) {
  return <p className="text-2xl font-medium">{children}</p>;
}

function Stat({ icon, title, value, color }) {
  return (
    <Box>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Box>
  );
}

export default Stat;
