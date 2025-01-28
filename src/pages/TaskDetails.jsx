import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();

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

  return <h1>oi</h1>;
};

export default TaskDetailsPage;
