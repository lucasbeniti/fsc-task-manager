import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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

  const handleSaveClick = async () => {
    setIsLoading(true);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;
    const newErrors = [];

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório!",
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório!",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória!",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      setIsLoading(false);
      return;
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Erro ao atualizar a tarefa. Por favor, tente novamente!");
      return;
    }
    const newTask = await response.json();
    setTask(newTask);
    setIsLoading(false);
    toast.success("Tarefa atualizada com sucesso!");
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setIsLoading(false);
      return toast.error("Ocorreu um erro ao deletar a tarefa!");
    }
    setIsLoading(false);
    toast.success("Tarefa deletada com sucesso!");
    navigate(-1);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
              <Link className="cursor-pointer text-brand-text-gray" to={"/"}>
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            variant="danger"
            className="h-fit self-end"
            disabled={isLoading}
            onClick={handleDeleteClick}
          >
            Deletar tarefa
            {isLoading && <LoaderIcon className="animate-spin" />}
            <TrashIcon />
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              label="Título"
              id="title"
              defaultValue={task?.title}
              ref={titleRef}
              error={titleError}
              disabled={isLoading}
            />
          </div>
          <div>
            <TimeSelect
              defaultValue={task?.time}
              ref={timeRef}
              error={timeError}
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              defaultValue={task?.description}
              ref={descriptionRef}
              error={descriptionError}
              disabled={isLoading}
            />
          </div>

          <div className="flex w-full items-center justify-end gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-fit"
              disabled={isLoading}
              onClick={handleSaveClick}
            >
              Salvar
              {isLoading && <LoaderIcon className="animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
