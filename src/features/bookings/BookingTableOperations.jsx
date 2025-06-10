import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import BookingPriceRange from './BookingPriceRange';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          {
            value: 'all',
            label: '全部',
          },
          {
            value: 'unconfirmed',
            label: '未入住',
          },
          {
            value: 'checked-in',
            label: '已入住',
          },
          {
            value: 'checked-out',
            label: '已退房',
          },
        ]}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: '日期 ▼' },
          { value: 'startDate-asc', label: '日期 ▲' },
          { value: 'totalPrice-desc', label: '總價 ▼' },
          { value: 'totalPrice-asc', label: '總價 ▲' },
        ]}
      />

      <BookingPriceRange />
    </TableOperations>
  );
}

export default BookingTableOperations;
