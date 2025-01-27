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
import TASKS from "../constants/tasks";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const morningTasks = tasks.filter((task) => task.time == "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const nightTasks = tasks.filter((task) => task.time === "night");

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
    setTasks(newTasks);
  };

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success("Tarefa deletada com sucesso!");
  };

  const handleDeleteAllTasksClick = () => {
    setTasks([]);
    toast.success("Todas as tarefas foram deletadas com sucesso!");
  };

  const handleAddTaskClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialogClick = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
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
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />
          {nightTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
