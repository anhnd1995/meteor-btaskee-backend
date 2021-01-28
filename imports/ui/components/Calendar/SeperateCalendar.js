import React, { useState,useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SeperateCalendar() {
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end = startDate] = dates;
    setStartDate(start);
    setEndDate(end);
    
  };
    

  const CustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}></button>
  );

  return (
    <div onClick={(e) => { e.stopPropagation(); }}><DatePicker selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      customInput={<CustomInput />}
      formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
      />
      </div>
  );
}
