import { LoaderIcon, Tasks2Icon, TasksIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import DashboardCard from "./DashboardCard";

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();

  const doneTasks = tasks?.filter((task) => task.status === "done");
  const inProgressTasks = tasks?.filter((task) => task.status === "inProgress");
  const notStartedTasks = tasks?.filter((task) => task.status === "notStarted");

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText={"Tarefas totais"}
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={notStartedTasks?.length}
        secondaryText={"Tarefas não iniciadas"}
      />
      <DashboardCard
        icon={<LoaderIcon className={"animate-spin"} />}
        mainText={inProgressTasks?.length}
        secondaryText={"Tarefas em andamento"}
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={doneTasks?.length}
        secondaryText={"Tarefas concluídas"}
      />
    </div>
  );
};

export default DashboardCards;
