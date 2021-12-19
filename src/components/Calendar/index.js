import React, { useState } from "react";
import "./index.css";
import moment from "moment";
import { monthShort, showDay, showMonth, showYear } from "./utils";

function Calendar(props) {
  const { dateObject, handleMonthChange } = props;
  const [showState, setShowState] = useState(showDay);
  const nowMonth = dateObject.format("MMM");
  const nowYear = dateObject.year();
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

  return (
    <div className="calendar-card">
      <div className="calendar-bar">
        <button
          className="soft-btn"
          onClick={() => handleMonthChange(dateObject, "-")}
        >{`<`}</button>
        {showState === showDay && (
          <div className="current-month">
            <span>{nowMonth}</span>
            <span>{nowYear}</span>
          </div>
        )}
        <button
          className="soft-btn"
          onClick={() => handleMonthChange(dateObject, "+")}
        >{`>`}</button>
      </div>

      {showState === showDay && (
        <div className="calendar">
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
            {daysInMonthArray.map((item) => {
              return (
                <div key={`day-${item}`} className="days-name">
                  {item}
                </div>
              );
            })}
            {[
              ...Array(
                totalDays - firstDayOfMonth.length - daysInMonthArray.length
              ).keys(),
            ].map((day) => {
              return (
                <div key={`empty-${day + 1}`} className="days-name empty-days">
                  {day + 1}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
