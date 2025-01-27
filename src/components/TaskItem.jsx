import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleTaskCheckboxClick, handleTaskDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    }
    if (task.status === "inProgress") {
      return "bg-brand-process text-brand-process";
    }
    if (task.status === "notStarted") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue";
    }
  };

  return (
    <div
      className={`flex items-center rounded-lg px-4 py-3 text-sm ${getStatusClasses()} select-none justify-between bg-opacity-10 transition`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex size-7 items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            className="absolute h-full w-full cursor-pointer opacity-0"
            checked={task.status === "done"}
            onChange={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "inProgress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="transition-all hover:opacity-75"
          onClick={() => handleTaskDeleteClick(task.id)}
        >
          <TrashIcon className="text-red-500" />
        </Button>
        <a href="#" className="transition-all hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
