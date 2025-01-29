import PropTypes from "prop-types";
import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      });
      return response.json();
    },
  });

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], (currentTasks) => {
          return currentTasks.filter((t) => t.id !== task.id);
        });
        toast.success("Tarefa deletada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa. Por favor, tente novamente!");
      },
    });
  };

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
            <LoaderIcon className="animate-spin cursor-pointer text-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="transition-all hover:opacity-75"
          onClick={handleDeleteClick}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-red-500" />
          )}
        </Button>
        <Link
          to={`/task/${task.id}`}
          className="transition-all hover:opacity-75"
        >
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["done", "inProgress", "notStarted"]).isRequired,
  }).isRequired,
  handleTaskCheckboxClick: PropTypes.func.isRequired,
};

export default TaskItem;
