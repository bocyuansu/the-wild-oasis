function DataItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-2 px-0 py-2">
      <span className="flex items-center gap-2 font-medium [&_svg]:w-5 [&_svg]:h-5 [&_svg]:text-brand-600">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
