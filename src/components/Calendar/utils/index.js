import moment from "moment";

export const monthShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const allMonthShort = moment.monthsShort();
export const showDay = "showDay";
export const showMonth = "showMonth";
export const showYear = "showYear";
export const showYearRange = "showYearRange";
export const showMapping = {
  showDay: "months",
  showMonth: "years",
  showYear: "years",
  showYearRange: "yearRange",
};
