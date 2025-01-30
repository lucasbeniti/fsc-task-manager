import PropTypes from "prop-types";
import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-update-task";

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);
  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
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

  const getNewStatus = () => {
    if (task.status === "notStarted") {
      return "inProgress";
    }
    if (task.status === "done") {
      return "notStarted";
    }
    if (task.status === "inProgress") {
      return "done";
    }
    return "notStarted";
  };

  const handleTaskCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => {
          toast.success("Status da tarefa atualizado com sucesso!");
        },
        onError: () => {
          toast.error("Não foi possível atualizar o status da tarefa!");
        },
      }
    );
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
            onChange={handleTaskCheckboxClick}
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
};

export default TaskItem;
