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
import { useForm } from "react-hook-form";
import { useUpdateTask } from "../hooks/data/use-update-task";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useGetTask } from "../hooks/data/use-get-task";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);
  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);
  const { data: task } = useGetTask({
    taskId: taskId,
    onSuccess: reset,
  });

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa. Por favor, tente novamente!");
      },
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () => {
        toast.error("Ocorreu um erro ao deletar a tarefa!");
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
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
            disabled={updateTaskIsLoading || deleteTaskIsLoading}
            onClick={handleDeleteClick}
          >
            Deletar tarefa
            <TrashIcon />
          </Button>
        </div>

        <form
          className="space-y-6 rounded-xl bg-brand-white p-6"
          onSubmit={handleSubmit(handleSaveClick)}
        >
          <div>
            <Input
              label="Título"
              id="title"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              {...register("title", {
                required: "O título é obrigatório!",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O título não pode ser vazio!";
                  }
                  return true;
                },
              })}
              error={errors?.title}
            />
          </div>
          <div>
            <TimeSelect
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              {...register("time", {
                required: "O horário é obrigatório!",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O horário não pode ser vazio!";
                  }
                  return true;
                },
              })}
              error={errors?.time}
            />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              {...register("description", {
                required: "A descrição é obrigatória!",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode ser vazia!";
                  }
                  return true;
                },
              })}
              error={errors?.description}
            />
          </div>

          <div className="flex w-full items-center justify-end gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-fit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type="submit"
            >
              Salvar
              {updateTaskIsLoading && <LoaderIcon className="animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
