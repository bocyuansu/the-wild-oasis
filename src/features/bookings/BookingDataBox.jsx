import { format, isToday } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import Flag from '../../ui/Flag';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

function Guest({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4 text-grey-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-grey-700">
      {children}
    </div>
  );
}

function Price({ children, isPaid }) {
  return (
    <div
      className={`flex items-center justify-between px-8 py-4 rounded-sm mt-6 ${
        isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      } last:uppercase last:text-sm last:font-semibold [&_svg]:h-6 [&_svg]:w-6 text-current`}
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <footer className="px-10 py-4 text-xs text-grey-500 text-right">
      {children}
    </footer>
  );
}

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="bg-grey-0 border border-solid border-grey-100 rounded-md overflow-hidden">
      <header className="bg-brand-500 px-10 py-5 text-brand-100 text-lg font-medium flex items-center justify-between">
        <div className="flex items-center gap-4 font-semibold text-lg">
          <HiOutlineHomeModern className="w-8 h-8" />
          <p>
            <span className='font-["Sono"] text-xl ml-1'>
              房號:{cabinName} 入住{numNights}晚
            </span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), 'yyyy年M月d日 EEEE', { locale: zhTW })} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash;{' '}
          {format(new Date(endDate), 'yyyy年M月d日 EEEE', { locale: zhTW })}
        </p>
      </header>

      <section className="pt-8 px-10 pb-3">
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} 位客人` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="附早餐？">
          {hasBreakfast ? '是' : '否'}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`總價`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} 房間 + ${formatCurrency(
                extrasPrice
              )} 早餐)`}
          </DataItem>

          <p>{isPaid ? '已付款' : '尚未付款'}</p>
        </Price>
      </section>

      <Footer>
        <p>
          已預訂於{' '}
          {format(new Date(created_at), 'yyyy年M月d日 EEEE', { locale: zhTW })}
        </p>
      </Footer>
    </section>
  );
}

export default BookingDataBox;
