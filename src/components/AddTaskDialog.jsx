import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { LoaderIcon } from "../assets/icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddTask } from "../hooks/data/use-add-task";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef();
  const { mutate: addTask } = useAddTask();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "notStarted",
    };

    addTask(task, {
      onSuccess: () => {
        handleClose();
        toast.success("Tarefa adicionada com sucesso!");
        reset();
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefa. Por favor, tente novamente!");
        return;
      },
    });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={100}
      classNames={"add-task-dialog"}
      unmountOnExit
    >
      <div className="hidden">
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60"
          >
            <form
              className="w-96 rounded-xl bg-white p-5 text-center shadow"
              onSubmit={handleSubmit(handleSaveClick)}
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="text-brand-gray mt-1 text-sm">
                Insira as informações abaixo
              </p>

              <div className="flex flex-col space-y-4">
                <Input
                  label="Título"
                  placeholder="Título da tarefa"
                  id="title"
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O título é obrigatório!",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode estar em branco!";
                      }
                      return true;
                    },
                  })}
                  error={errors?.title}
                />

                <TimeSelect
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horário é obrigatório!",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O horário não pode estar em branco!";
                      }
                      return true;
                    },
                  })}
                  error={errors?.time}
                />

                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  id="description"
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatória!",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode estar em branco!";
                      }
                      return true;
                    },
                  })}
                  error={errors?.description}
                />

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button size="lg" disabled={isSubmitting} type="submit">
                    Salvar
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                  </Button>
                </div>
              </div>
            </form>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTaskDialog;
