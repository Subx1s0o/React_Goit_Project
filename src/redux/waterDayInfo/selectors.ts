import { RootState } from '../store';

export const selectDayWater = (state: RootState) => state.waterDay.water.items;
export const selectDayTotalPercentage = (state: RootState) =>
  state.waterDay.water.totalPercentage;
export const selectDayLoading = (state: RootState) =>
  state.waterDay.water.loading;
export const selectDayError = (state: RootState) => state.waterDay.water.error;
