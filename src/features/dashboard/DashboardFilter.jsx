import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: '7', label: '七天前' },
        { value: '30', label: '三十天前' },
        { value: '90', label: '九十天前' },
      ]}
    />
  );
}

export default DashboardFilter;
