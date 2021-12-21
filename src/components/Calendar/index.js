import React, { useState, useEffect, useMemo } from "react";
import "./index.css";
import moment from "moment";
import {
  monthShort,
  showDay,
  showMonth,
  showYearRange,
  allMonthShort,
  showMapping,
  clickChangeMapping,
  totalDays,
} from "./utils";

function Calendar(props) {
  const {
    dateObject,
    todayObject,
    handleRangeChange,
    handleDateObjectChange,
  } = props;

  const [showCalendar, setShowCalendar] = useState(false);
  const [showState, setShowState] = useState(showDay);
  const [selectedDate, setSelectDate] = useState({
    day: dateObject.format("DD"),
    month: dateObject.format("MMM"),
    year: dateObject.format("YYYY"),
  });
  const selectedDateString = moment(
    `${selectedDate.year}-${moment()
      .month(selectedDate.month)
      .format("M")}-${selectedDate.day}`
  ).format("YYYY-MM-DD");

  const [nowCalendarBar, setNowCalendarBar] = useState({
    month: undefined,
    year: undefined,
    yearRange: undefined,
  });
  const [todayYear, todayMonth, today] = todayObject
    .format("YYYY MMM DD")
    .split(" ");

  const daysInMonthArray = useMemo(() => {
    return [...Array(moment(dateObject).daysInMonth()).keys()].map(
      (i) => i + 1
    );
  }, [dateObject]);

  const firstDayOfMonth = useMemo(() => {
    const preMonthLastDay = Number(
      moment(dateObject)
        .subtract(1, "months")
        .endOf("month")
        .format("DD")
    );

    const firstDayNowMonth = moment(dateObject)
      .startOf("month")
      .format("d");

    return [...Array(Number(firstDayNowMonth)).keys()]
      .map((i) => preMonthLastDay - i)
      .reverse();
  }, [dateObject]);

  useEffect(() => {
    setNowCalendarBar({
      month: dateObject.format("MMM"),
      year: dateObject.format("YYYY"),
      yearRange: [
        Math.floor(Number(dateObject.format("YYYY")) / 10) * 10,
        Math.floor(Number(dateObject.format("YYYY")) / 10 + 1) * 10,
      ],
    });
  }, [dateObject]);

  const handleMonthClick = () => {
    setShowState(showMonth);
  };

  const handleYearClick = () => {
    setShowState(showYearRange);
  };

  const handleYearRangeClick = () => {
    setShowState(showDay);
  };

  const handleShowCalendar = (value) => {
    setShowCalendar(value);
  };

  const handleDateClick = (value, type) => {
    if (showState === "showMonth") {
      setSelectDate({
        ...selectedDate,
        year: nowCalendarBar.year,
        month: value,
      });
    } else if (showState === "showDay") {
      setSelectDate({
        year: nowCalendarBar.year,
        month: nowCalendarBar.month,
        day: value,
      });
      handleShowCalendar(false);
    } else {
      setSelectDate({ ...selectedDate, year: value });
    }
    setNowCalendarBar({ ...nowCalendarBar, [type]: value });
    handleDateObjectChange(dateObject.set(type, value));
    if (clickChangeMapping[showState]) {
      setShowState(clickChangeMapping[showState]);
    }
  };

  return (
    <>
      <input
        className="calendar-input"
        value={selectedDateString}
        onClick={() => handleShowCalendar(true)}
        readOnly
      />
      <div
        className={`calendar-card ${showCalendar ? "" : "calendar-card-hide"}`}
      >
        <div className="calendar-bar">
          <button
            className="soft-btn"
            onClick={() =>
              handleRangeChange(showMapping[showState], dateObject, "-")
            }
          >{`<`}</button>
          {showState === showDay && (
            <div className="current-month" onClick={() => handleMonthClick()}>
              <span>{nowCalendarBar.month}</span>
              <span>{nowCalendarBar.year}</span>
            </div>
          )}
          {showState === showMonth && (
            <div className="current-year" onClick={() => handleYearClick()}>
              <span>{nowCalendarBar.year}</span>
            </div>
          )}
          {showState === showYearRange && (
            <div
              className="current-year"
              onClick={() => handleYearRangeClick()}
            >
              <span>
                {nowCalendarBar.yearRange[0]}-{nowCalendarBar.yearRange[1]}
              </span>
            </div>
          )}
          <button
            className="soft-btn"
            onClick={() =>
              handleRangeChange(showMapping[showState], dateObject, "+")
            }
          >{`>`}</button>
        </div>
        <div className="calendar">
          {showState === showDay && (
            <>
              <div className="weekdays-name">
                {monthShort.map((name) => {
                  return (
                    <div key={name} className="days-name">
                      {name}
                    </div>
                  );
                })}
              </div>
              <div className="calendar-days">
                {firstDayOfMonth.map((day) => {
                  return (
                    <div key={`empty-${day}`} className="days-name empty-days">
                      {day}
                    </div>
                  );
                })}
                {daysInMonthArray.map((day) => {
                  return (
                    <div
                      key={`day-${day}`}
                      className={`days-name ${
                        day === Number(today) &&
                        todayMonth === nowCalendarBar.month &&
                        todayYear === nowCalendarBar.year
                          ? "current-day"
                          : ""
                      } ${
                        selectedDate.day === day &&
                        selectedDate.month === nowCalendarBar.month &&
                        selectedDate.year === nowCalendarBar.year
                          ? "selected-day"
                          : ""
                      }`}
                      onClick={() => handleDateClick(day, "day")}
                    >
                      {day}
                    </div>
                  );
                })}
                {[
                  ...Array(
                    totalDays - firstDayOfMonth.length - daysInMonthArray.length
                  ).keys(),
                ].map((day) => {
                  return (
                    <div
                      key={`empty-${day + 1}`}
                      className="days-name empty-days"
                    >
                      {day + 1}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {showState === showMonth && (
            <div className="calendar-months">
              {allMonthShort.map((month) => {
                return (
                  <div
                    key={`month-${month}`}
                    className={`months-name ${
                      selectedDate.month === month ? "selected-day" : ""
                    }`}
                    onClick={() => handleDateClick(month, "month")}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          )}
          {showState === showYearRange && (
            <div className="calendar-months">
              {[
                ...Array(
                  nowCalendarBar.yearRange[1] - nowCalendarBar.yearRange[0] + 2
                ).keys(),
              ].map((year, index) => (
                <div
                  key={`year-${year}`}
                  className={`months-name ${
                    selectedDate.year === nowCalendarBar.yearRange[0] - 1 + year
                      ? "selected-day"
                      : ""
                  } ${
                    index === 0 ||
                    index ===
                      nowCalendarBar.yearRange[1] -
                        nowCalendarBar.yearRange[0] +
                        1
                      ? "empty-days"
                      : ""
                  }
                
                `}
                  onClick={() => {
                    if (
                      index > 0 &&
                      index <=
                        nowCalendarBar.yearRange[1] -
                          nowCalendarBar.yearRange[0]
                    ) {
                      handleDateClick(
                        `${nowCalendarBar.yearRange[0] - 1 + year}`,
                        "year"
                      );
                    }
                  }}
                >
                  {nowCalendarBar.yearRange[0] - 1 + year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
