const TasksSeparator = ({ text, icon }) => {
  return (
    <div className="flex gap-2 border-b border-brand-border pb-2">
      {icon}
      <p className="text-brand-gray text-sm">{text}</p>
    </div>
  );
};

export default TasksSeparator;
