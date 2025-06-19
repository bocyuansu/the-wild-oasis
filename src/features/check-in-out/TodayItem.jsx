import Tag from '../../ui/Tag';
import Flag from '../../ui/Flag';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

function Guest({ children }) {
  return <div className="font-medium">{children}</div>;
}

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-[5.625rem_1.25rem_1fr_4.375rem_5.625rem] gap-3 items-center text-sm px-0 py-2 border-b border-b-grey-100 first:border-t first:border-t-grey-100">
      {/* 第一欄 */}
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      {/* 第二欄 */}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>

      {/* 第三欄 */}
      <div>住 {numNights} 晚</div>

      {/* 第四欄 */}
      {status === 'unconfirmed' && (
        <Link
          to={`/checkin/${id}`}
          className="border-none rounded-sm shadow-sm text-xs px-2 py-1 uppercase font-semibold text-center text-white bg-indigo-500 hover:bg-indigo-600"
        >
          Check in
        </Link>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
