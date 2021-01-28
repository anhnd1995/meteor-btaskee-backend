import React, { useState,useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MergedCalendar({ receiveDateFilter }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end = startDate] = dates;
    setStartDate(start);
    setEndDate(end);
    
  };
  

  useEffect(() => {
    const beginning = document.querySelector('.selected__start');
    const ending = document.querySelector('.selected__end'); 
    if(endDate != null){
      beginning.classList.remove('active');
      ending.classList.add('active');
    } else {
      beginning.classList.add('active');
      ending.classList.remove('active');
    }
  }, [endDate])

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", color: "#fff", position: "absolute", right: "2rem" }}>
        <CalendarContainer className={className}>
          <div>
            <div className="calendar__header">
              <div className="title py-1 px-2">Filter by Date</div>
              <div className="selected my-3 d-flex justify-content-center font-weight-bold">
                <div className="selected__start py-2 px-4 active ">Beginning</div>
                <div className="selected__end py-2 px-5">Ending</div>
              </div>
            </div>
            {children}
            <div className="calendar__footer px-4">
              <div className="pickedDate">
                <p>
                  <span>From</span>{" "}
                  <span className="date">
                    {startDate.toLocaleDateString("es-US")}
                  </span>
                </p>
                <p>
                  <span style={{ paddingLeft: "1.31rem" }}>to </span>
                  {endDate ? (
                    <span className="date" style={{ paddingLeft: "4px" }}>
                      {endDate.toLocaleDateString("es-US")}
                    </span>
                  ) : (
                    <span className="date" style={{ paddingLeft: "4px" }}>
                    00/00/000
                  </span>
                    )}
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  receiveDateFilter(startDate, endDate);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </CalendarContainer>
      </div>
    );
  };

  const CustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}></button>
  );

  return (
    <div onClick={(e) => { e.stopPropagation(); }}><DatePicker selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      calendarContainer={MyContainer}
      customInput={<CustomInput />}
      formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
      />
      </div>
  );
}
