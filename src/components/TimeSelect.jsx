import { forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";
import PropTypes from "prop-types";

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        ref={ref}
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.error && (
        <InputErrorMessage>{props.error.message}</InputErrorMessage>
      )}
    </div>
  );
});

TimeSelect.displayName = "TimeSelect";
TimeSelect.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default TimeSelect;
