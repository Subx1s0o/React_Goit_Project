import { WaterData } from 'types/WaterTypes';

import React from 'react';

import { cn } from '@/utils/cn';

interface CalendarItemProps {
  dayData: WaterData | undefined;
  day: number;
}

const CalendarItem: React.FC<CalendarItemProps> = ({ dayData, day }) => {
  const todayDay: number = new Date().getDate();

  return (
    <>
      {todayDay === day ? (
        <button
          type="button"
          className={cn(
            'flex size-7 items-center justify-center rounded-full border border-black bg-[#323F4733] text-base font-bold hover:bg-darkGrey hover:text-green focus:bg-darkGrey focus:text-green',
            {
              'bg-white': dayData && dayData.persentage >= 100,
            },
          )}
        >
          {day}
        </button>
      ) : (
        <button
          type="button"
          className={cn(
            'flex size-7 items-center justify-center rounded-full bg-[#323F4733] text-base font-bold hover:bg-darkGrey hover:text-green focus:bg-darkGrey focus:text-green',
            {
              'bg-white': dayData && dayData.persentage >= 100,
              'border-red border': todayDay === day,
            },
          )}
        >
          {day}
        </button>
      )}
      {dayData ? (
        <p className="text-xs text-[#2F2F2F99]">{`${dayData.persentage}%`}</p>
      ) : (
        <p className="text-xs text-[#2F2F2F99]">0%</p>
      )}
    </>
  );
};

export default CalendarItem;
