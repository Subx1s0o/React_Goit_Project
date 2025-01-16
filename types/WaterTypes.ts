export interface WaterMonthState {
  water: {
    items: WaterMonthData[];
    loading: boolean;
    error: null | any;
  };
}

export interface WaterMonthData {
  // _id: string;
  totalPercentage: number;
  date: string;
  amount: number;
}

export interface WaterDayState {
  water: {
    items: WaterDayData[];
    loading: boolean;
    error: null | any;
  };
}

export interface WaterDayData {
  _id: string;
  amount: number;
  date: string;
  time: string;
  dailyNorm: number;
}

export interface DayData {
  day: number;
  date: string;
  percentage: number;
}

export interface StatisticData {
  day: number;
  litr: number;
}