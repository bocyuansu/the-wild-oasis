import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: 'all',
            label: '全部',
          },
          {
            value: 'with-discount',
            label: '打折',
          },
          {
            value: 'no-discount',
            label: '不打折',
          },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: '房號 ▲' },
          { value: 'name-desc', label: '房號 ▼' },
          { value: 'regularPrice-asc', label: '價錢 ▲' },
          { value: 'regularPrice-desc', label: '價錢 ▼' },
          { value: 'maxCapacity-asc', label: '人數 ▲' },
          { value: 'maxCapacity-desc', label: '人數 ▼' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
