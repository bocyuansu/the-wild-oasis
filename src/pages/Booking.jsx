import BookingDetail from '../features/bookings/BookingDetail';

// 頁面不應該獲取資料，也不應該有副作用
// 大部分的工作應該都留在 features 中

function Booking() {
  return <BookingDetail />;
}

export default Booking;
