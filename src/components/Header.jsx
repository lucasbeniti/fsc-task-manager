import { useState } from "react";
import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

const Header = ({ subtitle, title, handleDeleteAllTasksClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <header className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant={"ghost"} onClick={handleDeleteAllTasksClick}>
          Limpar tarefas
          <TrashIcon />
        </Button>
        <Button variant={"primary"} onClick={() => setIsDialogOpen(true)}>
          Nova tarefa
          <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
