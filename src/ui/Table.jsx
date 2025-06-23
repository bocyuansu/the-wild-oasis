import { createContext, useContext } from 'react';

function CommonRow({ children, columns, className = '', role }) {
  return (
    <div
      role={role}
      style={{ gridTemplateColumns: columns }}
      className={`grid gap-x-6 items-center ${className}`}
    >
      {children}
    </div>
  );
}

const TableContext = createContext();

// Table 是 columns 的入口
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-solid border-grey-200 text-base bg-grey-0 rounded-lg overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <CommonRow
      role="thead"
      columns={columns}
      className="px-6 py-4 bg-grey-50 border-b border-solid border-grey-100 uppercase tracking-wide font-semibold text-grey-600"
    >
      {children}
    </CommonRow>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <CommonRow role="tr" columns={columns} className="px-6 py-3">
      {children}
    </CommonRow>
  );
}

function Empty({ children }) {
  return (
    <p className="text-base tracking-wide font-medium text-center m-6">
      {children}
    </p>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>目前沒有資料</Empty>;

  return (
    <section role="tbody" className="mx-0 my-1 divide-y-1 divide-grey-100">
      {data.map(render)}
    </section>
  );
}

function Footer({ children }) {
  return (
    <footer className="bg-grey-50 flex justify-center p-3 not-has-[*]:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
