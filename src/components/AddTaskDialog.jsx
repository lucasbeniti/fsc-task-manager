import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "./AddTaskDialog.css";
import InputLabel from "./InputLabel";

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

                <div className="flex flex-col gap-1 text-left">
                  <InputLabel htmlFor="time">Horário</InputLabel>
                  <select
                    id="time"
                    className="placehoder:text-[#9A9C9F] rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
                  >
                    <option value="0">Selecione</option>
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="night">Noite</option>
                  </select>
                </div>

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
