import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
// Custom Hook
import { useBookings } from './useBookings';

function BookingTable() {
  const { isPending, isError, bookings, count, error } = useBookings();

  if (isPending) return <Spinner />;

  if (isError) {
    return <span>錯誤：{error.message}</span>;
  }

  if (!bookings.length) return <Empty resourceName="訂房" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>房號</div>
          <div>客人</div>
          <div>日期</div>
          <div>狀態</div>
          <div>總價</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
