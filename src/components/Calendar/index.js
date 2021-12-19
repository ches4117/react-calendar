import React, { useState } from "react";
import "./index.css";
import moment from "moment";
import {
  monthShort,
  showDay,
  showMonth,
  showYearRange,
  allMonthShort,
  showMapping,
} from "./utils";

function Calendar(props) {
  const { dateObject, handleRangeChange, todayObject } = props;
  const [showState, setShowState] = useState(showDay);
  const [selectedDate, setSelectDate] = useState(undefined);
  const [nowYear, nowMonth] = dateObject.format("YYYY MMM").split(" ");
  const [yearRangeStart, yearRangeEnd] = [
    Math.floor(Number(nowYear) / 10) * 10,
    Math.floor(Number(nowYear) / 10 + 1) * 10,
  ];
  const [todayYear, todayMonth, today] = todayObject
    .format("YYYY MMM DD")
    .split(" ");
  const totalDays = 7 * 6; // total days of a page of calendar
  const daysInMonthArray = [...Array(dateObject.daysInMonth()).keys()].map(
    (i) => i + 1
  );

  const firstDayOfMonth = (() => {
    const preMonthLastDay = Number(
      moment()
        .subtract(1, "months")
        .endOf("month")
        .format("DD")
    );

    const firstDayNowMonth = dateObject.startOf("month").format("d");

    return [...Array(Number(firstDayNowMonth)).keys()]
      .map((i) => preMonthLastDay - i)
      .reverse();
  })();

  const handleMonthClick = () => {
    setShowState(showMonth);
  };

  const handleYearClick = () => {
    setShowState(showYearRange);
  };

  const handleYearRangeClick = () => {
    setShowState(showDay);
  };

  const handleDateClick = (value) => {
    setSelectDate(value);
  };

  return (
    <div className="calendar-card">
      <div className="calendar-bar">
        <button
          className="soft-btn"
          onClick={() =>
            handleRangeChange(showMapping[showState], dateObject, "-")
          }
        >{`<`}</button>
        {showState === showDay && (
          <div className="current-month" onClick={() => handleMonthClick()}>
            <span>{nowMonth}</span>
            <span>{nowYear}</span>
          </div>
        )}
        {showState === showMonth && (
          <div className="current-year" onClick={() => handleYearClick()}>
            <span>{nowYear}</span>
          </div>
        )}
        {showState === showYearRange && (
          <div className="current-year" onClick={() => handleYearRangeClick()}>
            <span>
              {yearRangeStart}-{yearRangeEnd}
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
                      todayYear === nowYear &&
                      todayMonth === nowMonth
                        ? "current-day"
                        : ""
                    } ${selectedDate === day ? "selected-day" : ""}`}
                    onClick={() => handleDateClick(day)}
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
                    selectedDate === month ? "selected-day" : ""
                  }`}
                  onClick={() => handleDateClick(month)}
                >
                  {month}
                </div>
              );
            })}
          </div>
        )}
        {showState === showYearRange && (
          <div className="calendar-months">
            {[...Array(yearRangeEnd - yearRangeStart + 2).keys()].map(
              (year, index) => (
                <div
                  key={`year-${year}`}
                  className={`months-name ${
                    selectedDate === year ? "selected-day" : ""
                  } ${
                    index === 0 || index === yearRangeEnd - yearRangeStart + 1
                      ? "empty-days"
                      : ""
                  }
                
                `}
                  onClick={() => {
                    if (index > 0 && index <= yearRangeEnd - yearRangeStart) {
                      handleDateClick(year);
                    }
                  }}
                >
                  {yearRangeStart - 1 + year}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
