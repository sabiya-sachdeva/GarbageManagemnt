import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const DatePickerComponent = ({ handleDateChange, selectedDate }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="DD/MM/YYYY"
    />
  );
};

export default DatePickerComponent;
