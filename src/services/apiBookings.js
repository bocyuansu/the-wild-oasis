import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getBookings(filterOptions, sortBy, page) {
  // count: 'exact' 代表查詢特定的數量
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' }
    );

  // filter
  filterOptions.forEach((option) => {
    if (option.value === null) return;
    query = query[option.method](option.field, option.value);
  });

  // Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  // 分頁
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('無法載入客房預約');
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// 傳回過去一段時間內，所有預訂資料。
// 例如：有助於取得過去 30 天內建立的預訂。
// data: ISO String
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// 用於篩選過去一段時間內 已入住 或 已退房 的所有預訂資料
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// 正常情況下，只取得今日 未入住 或 已入住 的資料
// 但為了 DEMO 功能，改成取得所有 未入住 或 已入住 的資料（非當日）
// 用於 dashboard 入住 及 退房 功能
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality,countryFlag)')
    .or('status.eq.unconfirmed, status.eq.checked-in')
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select('*, cabins(name)')
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('無法刪除預訂，請稍後再試');
  }
  return data;
}
