import PropTypes from "prop-types";

const TasksSeparator = ({ text, icon }) => {
  return (
    <div className="flex gap-2 border-b border-brand-border pb-2">
      {icon}
      <p className="text-brand-gray text-sm">{text}</p>
    </div>
  );
};

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default TasksSeparator;
