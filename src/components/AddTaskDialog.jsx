import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { v4 } from "uuid";
import PropTypes from "prop-types";

const AddTaskDialog = ({
  isOpen,
  handleCloseDialogClick,
  handleAddTaskSubmit,
}) => {
  const nodeRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      // titleRef?.current?.value = "";
      // timeRef?.current?.value = "";
      // descriptionRef?.current?.value = "";
    }
  }, [isOpen]);

  const handleSaveClick = () => {
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
      return;
    }

    handleAddTaskSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "notStarted",
    });
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
            <div className="w-96 rounded-xl bg-white p-5 text-center shadow">
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
                  error={titleError}
                  ref={titleRef}
                />

                <TimeSelect error={timeError} ref={timeRef} />

                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  id="description"
                  error={descriptionError}
                  ref={descriptionRef}
                />

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleCloseDialogClick}
                  >
                    Cancelar
                  </Button>
                  <Button size="lg" onClick={handleSaveClick}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDialogClick: PropTypes.func.isRequired,
  handleAddTaskSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
