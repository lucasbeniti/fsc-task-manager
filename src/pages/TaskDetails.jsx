import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import InputLabel from "../components/InputLabel";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchTask() {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    }

    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div className="space-y-2">
            <button
              onClick={handleBackClick}
              className="mb-2 flex size-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                className="cursor-pointer text-brand-text-gray"
                onClick={handleBackClick}
              >
                Minhas tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button variant="danger" className="h-fit self-end">
            Deletar tarefa
            <TrashIcon />
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input label="Título" id="title" value={task?.title} />
          </div>
          <div>
            <TimeSelect value={task?.time} />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              value={task?.description}
            />
          </div>

          <div className="flex w-full items-center justify-end gap-3">
            <Button variant="secondary" size="lg" className="w-fit">
              Cancelar
            </Button>
            <Button variant="primary" size="lg" className="w-fit">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
