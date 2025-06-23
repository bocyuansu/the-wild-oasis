import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import { eachDayOfInterval, subDays } from 'date-fns';
import Spinner from '../../ui/Spinner';
import DashboardInterval from './DashboardInterval';
import Stats from './Stats';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';

function DashboardLayout() {
  const { bookings, isPending: RecentBookingsPending } = useRecentBookings();
  const {
    confirmedStays,
    numDays,
    isPending: RecentStaysPending,
  } = useRecentStays();
  const { cabins, isPending: cabinsPending } = useCabins();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  if (RecentBookingsPending || RecentStaysPending || cabinsPending) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_auto_21.25rem_auto] gap-6">
      <DashboardInterval allDates={allDates} />
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} allDates={allDates} />
    </div>
  );
}

export default DashboardLayout;
