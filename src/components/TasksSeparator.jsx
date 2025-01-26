const TasksSeparator = ({ text, icon }) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-[#F4F4F5] pb-2">
        {icon}
        <p className="text-sm text-[#9A9C9F]">{text}</p>
      </div>
    </div>
  );
};

export default TasksSeparator;
