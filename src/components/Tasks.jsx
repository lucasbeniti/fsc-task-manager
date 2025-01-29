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
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Tasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });
      const tasks = await response.json();

      return tasks;
    },
  });

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

  const onDeleteSuccess = async (taskId) => {
    queryClient.setQueryData(["tasks"], (currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
    toast.success("Tarefa deletada com sucesso!");
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

  const handleCloseDialogClick = () => {
    setIsDialogOpen(false);
  };

  const onSubmitSuccess = async (task) => {
    queryClient.setQueryData(["tasks"], (currentTasks) => {
      return [...currentTasks, task];
    });
    setIsDialogOpen(false);
    toast.success("Tarefa adicionada com sucesso!");
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

          <AddTaskDialog
            isOpen={isDialogOpen}
            handleCloseDialogClick={handleCloseDialogClick}
            onSubmitSuccess={onSubmitSuccess}
          />
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
              onDeleteSuccess={onDeleteSuccess}
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
              onDeleteSuccess={onDeleteSuccess}
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
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
