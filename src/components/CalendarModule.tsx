import React, { useState, useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { formatDate } from "../utils/dateFormat";

type CalendarPropsType = {
  from: string;
  to: string;
};

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const Calendar: React.FC<CalendarPropsType> = ({ from, to }) => {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date(from).getUTCMonth());
  const [currentYear, setCurrentYear] = useState(new Date(from).getUTCFullYear());

  useEffect(() => {
    setCurrentMonth(new Date(from).getUTCMonth());
    setCurrentYear(new Date(from).getUTCFullYear());
  }, [from]);

  const handlePreviousMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth(currentYear, currentMonth) }, (_, index) => index + 1);
  const emptyCellsBefore = Array.from({ length: (firstDay + 6) % 7 }, (_, index) => index)
    .map((e) => daysInMonth(currentYear, currentMonth - 1) - e)
    .reverse();
  const emptyCellsAfter = Array.from(
    { length: 7 - ((daysArray.length + emptyCellsBefore.length) % 7) },
    (_, index) => index
  );

  return (
    <Stack direction="vertical">
      <Stack direction="horizontal" className="justify-content-between">
        <Button variant={theme} onClick={handlePreviousMonth} style={{ backgroundColor: "transparent" }} title="prev">
          <MdArrowBackIosNew size={20} aria-hidden="true" />
        </Button>
        <div className="month">
          {new Date(currentYear, currentMonth).toLocaleString("en-US", {
            month: "long",
          })}
        </div>
        <Button variant={theme} onClick={handleNextMonth} style={{ backgroundColor: "transparent" }} title="next">
          <MdArrowBackIosNew style={{ transform: "rotate(180deg)" }} size={20} aria-hidden="true" />
        </Button>
      </Stack>

      <div className="calendar-grid">
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
        <div className="days">
          {emptyCellsBefore.map((e, index) => (
            <Stack key={`empty-before-${index}`} className="empty-cell justify-content-center align-items-center">
              {e}
            </Stack>
          ))}
          {daysArray.map((day) => {
            const currentDate = new Date(currentYear, currentMonth, day).getTime();
            const start = new Date(formatDate(from, "short")).getTime();
            const end = new Date(formatDate(to, "short")).getTime();
            let cellClassName = "day-cell";

            if (currentDate > start && currentDate < end) cellClassName = "day-cell middle-range";

            if (currentDate === start || currentDate === end) cellClassName = "day-cell end-range";

            return (
              <div key={day} className={cellClassName}>
                {day}
              </div>
            );
          })}
          {emptyCellsAfter.map((_, index) => (
            <Stack key={`empty-after-${index}`} className="empty-cell justify-content-center align-items-center">
              {index + 1}
            </Stack>
          ))}
        </div>
      </div>
    </Stack>
  );
};

export default Calendar;
