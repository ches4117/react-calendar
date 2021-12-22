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

export const clickChangeMapping = {
  showMonth: "showDay",
  showYearRange: "showMonth",
};

export const formatDateString = (selectedDate) => {
  return moment(
    `${selectedDate.year}-${moment()
      .month(selectedDate.month)
      .format("M")}-${selectedDate.day}`,
    "YYYY-M-DD"
  ).format("YYYY-MM-DD");
};

export const daysOfMonth = (dateObject) => {
  return [...Array(moment(dateObject).daysInMonth()).keys()].map((i) => i + 1);
};

export const disabledDayOfMonth = (dateObject) => {
  const firstDayNowMonth = (dateObject) => {
    return Number(
      moment(dateObject)
        .startOf("month")
        .format("d")
    );
  };

  const preMonthLastDay = (dateObject) => {
    return Number(
      moment(dateObject)
        .subtract(1, "months")
        .endOf("month")
        .format("DD")
    );
  };

  return [...Array(firstDayNowMonth(dateObject)).keys()]
    .map((i) => preMonthLastDay(dateObject) - i)
    .reverse();
};
