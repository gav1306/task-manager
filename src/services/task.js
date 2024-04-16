import { toast } from "sonner";

const createTask = async (values) => {
  const response = await fetch(
    "https://task-manager-api-3h34.onrender.com/api/v1/tasks",
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    toast.success("Task has been created.");
  } else {
    toast.error("Something went wrong.");
  }
};

const getAllTasks = async () => {
  const response = await fetch(
    "https://task-manager-api-3h34.onrender.com/api/v1/tasks"
  );
  if (!response.ok) {
    toast.error("Something went wrong.");
    return;
  }
  const data = await response.json();
  return data;
};

const deleteTask = async (id) => {
  await fetch(`https://task-manager-api-3h34.onrender.com/api/v1/tasks/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    toast.success("Task has been deleted.");
  } else {
    toast.error("Something went wrong.");
  }
};

const editTask = async (values, id) => {
  const response = await fetch(
    `https://task-manager-api-3h34.onrender.com/api/v1/tasks/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    toast.success("Task has been updated.");
  } else {
    toast.error("Something went wrong.");
  }
};
export { createTask, getAllTasks, deleteTask, editTask };
