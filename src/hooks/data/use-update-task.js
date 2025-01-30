import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask ", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }
      );
      return updatedTask;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (tasks) => {
        return tasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
    },
  });
};
