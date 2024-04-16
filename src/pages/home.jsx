import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  DotsVerticalIcon,
  ExclamationTriangleIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import CreateTaskModal from "../components/modals/create-task";
import { getAllTasks, deleteTask } from "../services/task";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { toast } from "sonner";

const Home = (props) => {
  const { open, setOpen } = props;
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState({ data: null, enable: false });

  const editHandler = (data) => {
    setIsEdit({ data, enable: true });
    setOpen(true);
  };

  const deleteHandler = async (id) => {
    toast.promise(deleteTask.bind(null, id), {
      loading: "Task Deleting...",
      success: () => {
        return `Task has been deleted`;
      },
      error: "Something went wrong",
    });
    setIsLoading(true);
    const data = await getAllTasks();
    setIsLoading(false);
    setTasks(data.tasks);
  };

  useEffect(() => {
    (async () => {
      const data = await getAllTasks();
      setIsLoading(false);
      setTasks(data.tasks);
    })();
  }, []);

  useEffect(() => {
    if (shouldUpdate === true) {
      (async () => {
        setIsLoading(true);
        const data = await getAllTasks();
        setIsLoading(false);
        setTasks(data.tasks);
        setShouldUpdate(false);
      })();
    }
  }, [shouldUpdate]);

  return (
    <section>
      <div className="m-auto text-center my-4">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your tasks!
        </p>
      </div>
      <ScrollArea
        className={cn(
          "rounded-md border w-[800px] m-auto shadow-md md:shadow-xl py-2 overflow-clip relative",
          tasks.length === 0 ? "" : "h-[300px]"
        )}
      >
        <Table>
          <TableHeader className="sticky top-0 bg-white shadow-sm">
            <TableRow>
              <TableHead className="w-[100px] text-center">Sr.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
              <TableHead className="text-right w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading === true ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan="4">
                  <div className="w-full grid justify-center items-center">
                    <ReloadIcon className="w-10 h-10 m-auto animate-spin" />
                    <h3 className="text-xl">Loading...!</h3>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : tasks.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan="4">
                  <div className="w-full grid justify-center items-center">
                    <ExclamationTriangleIcon className="w-10 h-10 m-auto" />
                    <h3 className="text-xl">Not Found!</h3>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {tasks.map((task, index) => {
                return (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>
                      {task.completed ? (
                        <Badge
                          className="w-24 justify-center"
                          variant="success"
                        >
                          Done
                        </Badge>
                      ) : (
                        <Badge
                          className="w-24 justify-center"
                          variant="destructive"
                        >
                          In-Progress
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={editHandler.bind(null, task)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={deleteHandler.bind(null, task._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </ScrollArea>
      <CreateTaskModal
        open={open}
        setOpen={setOpen}
        setShouldUpdate={setShouldUpdate}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </section>
  );
};
export default Home;
