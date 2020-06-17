import React, { useRef } from "react";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";

import CustomDayPickerInputComponent from "./CustomDayPickerInputComponent";

const CustomDayPickerInput = ({ value, onChange, ref, ...rest }) => {
  const inputRef = useRef(null);

  const selectedDayString = moment(value).format("DD/MM/YYYY");

  return (
    <DayPickerInput
      component={React.forwardRef((props, ref) => (
        <CustomDayPickerInputComponent
          day={selectedDayString}
          ref={ref}
          {...props}
        />
      ))}
      formatDate={(date) => moment(date).format("DD.MM.YYYY.")}
      inputProps={{ ref: inputRef }}
      onDayChange={onChange}
      {...rest}
    />
  );
};

export default CustomDayPickerInput;
