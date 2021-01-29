import React, { useState, useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";


export default function SeperateCalendar({ receiveDateFilter }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const InputCalendarIcon = ({ value, onClick }) => (
    <button className="seperate-input" onClick={onClick}>
      {value}
      <FontAwesomeIcon icon={faCalendarAlt} />
    </button>
  );



  return (
    <div className="d-flex justify-content-between align-items-center">
      <p>Beginning</p>
      <DatePicker
        selected={startDate}
        onChange={date => {setStartDate(date);receiveDateFilter(startDate,endDate)}}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        customInput={<InputCalendarIcon />}
      />
      <p>Ending</p>
      <DatePicker
        selected={endDate}
        onChange={date => {setEndDate(date);receiveDateFilter(startDate,endDate)}}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<InputCalendarIcon />}
      />
    </div>
  );
}
