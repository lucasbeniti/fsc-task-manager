import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask ", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const updatedTask = response.json();
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
