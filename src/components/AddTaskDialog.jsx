import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "./AddTaskDialog.css";

const AddTaskDialog = ({ isOpen, handleCloseDialogClick }) => {
  const nodeRef = useRef();

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={100}
      classNames={"add-task-dialog"}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60"
          >
            <div className="w-96 rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex flex-col space-y-4">
                <Input
                  label="Título"
                  placeholder="Título da tarefa"
                  id="title"
                />
                <Input label="  Horário" placeholder={"teste"} id="time" />
                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  id="description"
                />

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleCloseDialogClick}
                  >
                    Cancelar
                  </Button>
                  <Button size="lg">Salvar</Button>
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

export default AddTaskDialog;
