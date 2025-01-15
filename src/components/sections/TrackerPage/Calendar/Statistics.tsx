import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StatisticData, WaterMonthData } from 'types/WaterTypes';

import React from 'react';
import { useSelector } from 'react-redux';

import { selectDate } from '@/redux/date/selectors';
import { selectMonthWater } from '@/redux/waterMonthInfo/selectors';

interface DataByDay {
  [key: string]: number;
}
//request from Api
const waterDailyNorma = 1500;

const Statistics = () => {
  const date: string = useSelector(selectDate);
  const waterDataApi: WaterMonthData[] = useSelector(selectMonthWater);

  const maxDayShown: number = new Date(date).getDate();
  const allDaysData: StatisticData[] = Array.from(
    { length: maxDayShown },
    (_, index) => ({
      day: index + 1,
      litr: 0,
    }),
  );

  // Transform raw data to day-litre pairs
  const dataByDay: DataByDay = waterDataApi.reduce(
    (acc: DataByDay, item: WaterMonthData) => {
      const day: number = new Date(item.date).getDate();
      acc[day] = Number((waterDailyNorma * item.percentage) / 100 / 1000);
      return acc;
    },
    {},
  );

  // Merge the actual data with the full days array to show days where there was no data
  const transformedData: StatisticData[] = allDaysData.map(({ day }) => ({
    day,
    litr: dataByDay[day] || 0,
  }));

  // Show only seven last days on the Chart
  const reducedTransformedData: StatisticData[] = transformedData.filter(
    dayData => dayData.day <= maxDayShown && dayData.day > maxDayShown - 7,
  );

  return (
    <div className="mt-[8px] flex h-[300px] w-[303px] items-end text-ms font-normal md:mt-[40px] md:h-[305px] md:w-[640px] lg:mt-[25px] lg:h-[305px] lg:w-[608px]">
      <ResponsiveContainer width="100%" height="95%">
        <AreaChart
          data={reducedTransformedData}
          margin={{
            top: 0,
            right: 0,
            left: -17,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorLitr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#87D28D" stopOpacity={1} />
              <stop offset="65%" stopColor="#87D28D" stopOpacity={0.6} />
              <stop offset="85%" stopColor="#87D28D" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#F0EFF4" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="day"
            type="category"
            padding={{ left: 10, right: 0 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 'auto']}
            padding={{ top: 0, bottom: 20 }}
            tickFormatter={value => `${value.toFixed(1)} L`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            isAnimationActive={false}
            allowEscapeViewBox={{ y: true, x: true }}
          />
          <Area
            type="linear"
            dataKey="litr"
            stroke="#87D28D"
            fill="url(#colorLitr)"
            strokeWidth={2}
            dot={{
              fill: '#FFFFFF',
              stroke: '#87D28D',
              r: 7,
              strokeWidth: 2,
              opacity: 1,
              style: { cursor: 'pointer' },
            }}
            connectNulls
            activeDot={{
              fill: '#FFFFFF',
              style: { cursor: 'pointer' },
            }}
            unit="ml"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="relative flex h-[32px] w-[53px] items-center justify-center rounded-[13px] bg-white shadow-md md:h-[40px] md:w-[80px]"
        style={{
          transform: 'translateY(-190%)',
          marginLeft: '-46px',
        }}
      >
        <div className="absolute -bottom-1.5 left-1/2 size-[12px] -translate-x-1/2 rotate-45 bg-white"></div>
        <p className="md: text-center font-poppins text-xs font-bold md:text-sm md:leading-[22.4px]">
          {`${payload[0].value * 1000} ml`}
        </p>
      </div>
    );
  }
  return null;
};