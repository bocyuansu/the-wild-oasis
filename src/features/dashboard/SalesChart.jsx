import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { format, isSameDay } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

function SalesChart({ bookings, allDates }) {
  const { isDarkMode } = useDarkMode();

  const data = allDates.map((date) => {
    return {
      label: format(new Date(date), 'M月d日', { locale: zhTW }),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <DashboardBox className="col-span-full [&_.recharts-cartesian-grid-horizontal_line,&_.recharts-cartesian-grid-vertical_line]:stroke-grey-300">
      <Heading level={2}>銷售額</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="銷售額"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="加購服務"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}

export default SalesChart;
