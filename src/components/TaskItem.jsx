import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";

const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5] text-[#00ADB5]";
    }
    if (task.status === "inProgress") {
      return "bg-[#FFAA04] text-[#FFAA04]";
    }
    if (task.status === "notStarted") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]";
    }
  };
  return (
    <div
      className={`flex items-center rounded-lg px-4 py-3 text-sm ${getStatusClasses()} justify-between bg-opacity-10`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex size-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            className="absolute h-full w-full cursor-pointer opacity-0"
            checked={task.status === "done"}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "inProgress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <a href="#" className="transition-all hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  );
};

export default TaskItem;
