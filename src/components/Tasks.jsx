import Button from "./Button";
import TrashIcon from "../assets/icons/trash.svg?react";
import AddIcon from "../assets/icons/add.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"ghost"}>
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button variant={"primary"}>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-6">
        <TasksSeparator text="Manhã" icon={<SunIcon />} />

        <div className="my-6 space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
