import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';

function ChartBox({ children }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md px-8 py-6 col-start-3 col-end-[span_2] [&_>_*:first-child]:mb-4 [&_.recharts-pie-label-text]:font-semibold">
      {children}
    </div>
  );
}

const startDataLight = [
  {
    duration: '1天',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2天',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3天',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5天',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7天',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14天',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21天',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21天以上',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1天',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2天',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3天',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5天',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7天',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14天',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21天',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21天',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1天');
      if (num === 2) return incArrayValue(arr, '2天');
      if (num === 3) return incArrayValue(arr, '3天');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5天');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7天');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14天');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21天');
      if (num >= 21) return incArrayValue(arr, '21天以上');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const CustomTooltip = ({ active, payload, backgroundColor, color, border }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor,
          color,
          border,
          padding: '10px',
        }}
      >
        <p>{`住${payload[0].name}：${payload[0].value} 組客人`}</p>
      </div>
    );
  }

  return null;
};

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  const colors = isDarkMode
    ? {
        duration: { stroke: '#4f46e5', fill: '#4f46e5' },
        color: '#e5e7eb',
        background: '#18212f',
        border: '1px solid #fff',
      }
    : {
        duration: { stroke: '#4f46e5', fill: '#c7d2fe' },
        color: '#374151',
        background: '#fff',
        border: '1px solid #000',
      };

  return (
    <ChartBox>
      <Heading level={2}>住宿期間客人組數</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip
            content={
              <CustomTooltip
                backgroundColor={colors.background}
                color={colors.color}
                border={colors.border}
              />
            }
          />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
