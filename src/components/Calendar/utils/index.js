import moment from "moment";

export const totalDays = 7 * 6; // total days of a page of calendar
export const monthShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const allMonthShort = moment.monthsShort();
export const showDay = "showDay";
export const showMonth = "showMonth";
export const showYearRange = "showYearRange";
export const showMapping = {
  showDay: "months",
  showMonth: "years",
  showYearRange: "yearRange",
};

export const clickMapping = {
  showDay: "day",
  showMonth: "month",
  showYearRange: "year",
};

export const clickChangeMapping = {
  showMonth: "showDay",
  showYearRange: "showMonth",
};
