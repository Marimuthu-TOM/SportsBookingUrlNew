import { useState } from "react";
import moment from "moment";
import leftArrow from "./../assets/leftArrow.png";
import rightArrow from "./../assets/rightArrow.png";

/* ===============================
   CONSTANTS
================================ */
const DAY_NUMBER_TO_NAME = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ===============================
   COMPONENT
================================ */
export default function CustomCalendar({
    workingHours = [],
    packageDays = "",
    trcr_session = 1,
    onSelectDates,
}) {
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [selectedDates, setSelectedDates] = useState([]);

    /* ===============================
       ALLOWED DAYS
    ================================ */
    const allowedPackageDays = packageDays
        .split(",")
        .map((d) => DAY_NUMBER_TO_NAME[d]);

    const allowedWorkingDays = workingHours.map(
        (w) => w.wh_weekday
    );

    const allowedDays = allowedPackageDays.filter((day) =>
        allowedWorkingDays.includes(day)
    );

    /* ===============================
       CALENDAR RANGE
    ================================ */
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");

    const startDate = startOfMonth.clone().startOf("week");
    const endDate = endOfMonth.clone().endOf("week");

    const calendar = [];
    let day = startDate.clone();

    while (day.isBefore(endDate)) {
        calendar.push(day.clone());
        day.add(1, "day");
    }

    /* ===============================
       HELPERS
    ================================ */

    // UI clickable (only current month)
    const isClickableDay = (date) =>
        allowedDays.includes(date.format("dddd")) &&
        date.isSame(currentMonth, "month");

    // Session logic (NO month restriction)
    const isValidSessionDay = (date) =>
        allowedDays.includes(date.format("dddd"));

    const calculateSessionDates = (startDate) => {
        const sessions = [];
        let current = startDate.clone();
        let guard = 0; // 🔒 safety guard

        while (sessions.length < trcr_session && guard < 366) {
            if (isValidSessionDay(current)) {
                sessions.push(current.format("YYYY-MM-DD"));
            }
            current.add(1, "day");
            guard++;
        }

        return sessions;
    };

    const handleDateClick = (date) => {
        const sessions = calculateSessionDates(date);
        setSelectedDates(sessions);
        onSelectDates && onSelectDates(sessions);
    };

    /* ===============================
       UI
    ================================ */
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#F49C7A]">

            {/* HEADER */}
            <div className="flex py-2 justify-center items-center bg-[#F49C7A] text-white rounded-2xl px-4 mb-4">
                <div className="w-2" onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, "month"))}>
                    <img src={leftArrow} alt="" />
                </div>

                <span className="font-semibold text-[#510f30] mx-4">
                    {currentMonth.format("MMM YYYY")}
                </span>

                <div className="w-2" onClick={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}>
                    <img src={rightArrow} alt="" />
                </div>
            </div>

            {/* WEEK DAYS */}
            <div className="px-2 grid grid-cols-7 text-center text-sm font-semibold text-[#510f30] mb-2">
                {WEEK_DAYS.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* DATES */}
            <div className="px-2 pb-4 grid grid-cols-7 gap-2">
                {calendar.map((date) => {
                    const dateStr = date.format("YYYY-MM-DD");
                    const clickable = isClickableDay(date);
                    const isSelected = selectedDates.includes(dateStr);

                    return (
                        <button
                            key={dateStr}
                            disabled={!clickable}
                            onClick={() => clickable && handleDateClick(date)}
                            className={`h-10 w-10 rounded-full text-sm ${isSelected
                                ? "bg-[#510f30] text-white font-bold"
                                : clickable
                                    ? "bg-[#F9E1D9] text-[#510f30] font-semibold hover:bg-[#f7a07a]"
                                    : "text-gray-300 cursor-not-allowed"
                                }`}>
                            {date.date()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
