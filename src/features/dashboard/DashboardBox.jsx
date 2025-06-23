function DashboardBox({ children, className = '' }) {
  return (
    <div
      className={`bg-grey-0 border border-grey-100 rounded-md p-8 flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox;
