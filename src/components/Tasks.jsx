import Button from "./Button";
import {
  TrashIcon,
  AddIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from "../assets/icons";
import TasksSeparator from "./TasksSeparator";
import { useState } from "react";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTasks } from "../hooks/data/use-get-task";

const Tasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time == "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const nightTasks = tasks?.filter((task) => task.time === "night");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "notStarted") {
        return { ...task, status: "inProgress" };
      }
      if (task.status === "done") {
        return { ...task, status: "notStarted" };
      }
      if (task.status === "inProgress") {
        return { ...task, status: "done" };
      }

      return task;
    });
    queryClient.setQueryData(["tasks"], newTasks);
  };

  const handleDeleteAllTasksClick = async () => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "DELETE",
    });
    if (!response.ok) {
      toast.error(
        "Erro ao deletar todas as tarefas. Por favor, tente novamente!"
      );
      return;
    }
    toast.success("Todas as tarefas foram deletadas com sucesso!");
  };

  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"ghost"} onClick={handleDeleteAllTasksClick}>
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button variant={"primary"} onClick={handleAddTaskClick}>
            Nova tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog isOpen={isDialogOpen} handleClose={handleClose} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />
          {morningTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />
          {nightTasks?.length == 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
