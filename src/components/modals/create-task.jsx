import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createTask, editTask } from "../../services/task";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";

const items = [
  {
    id: 1,
    label: "Done",
    value: true,
  },
  {
    id: 2,
    label: "In Progress",
    value: false,
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Too short",
  }),
  completed: z.boolean(),
});

const CreateTaskModal = (props) => {
  const { open, setOpen, setShouldUpdate, isEdit, setIsEdit } = props;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      completed: false,
    },
  });

  useEffect(() => {
    if (isEdit.enable) {
      form.setValue("name", isEdit.data.name);
      form.setValue("completed", isEdit.data.completed);
    }
  }, [isEdit]);

  async function onSubmit(values) {
    setIsLoading(true);

    if (isEdit.enable) {
      await editTask(values, isEdit.data._id);
      setIsEdit({ enable: false, data: {} });
    } else {
      await createTask(values);
    }
    form.reset();
    setIsLoading(false);
    setOpen(false);
    setShouldUpdate(true);
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(status) => {
        setOpen(status);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit.enable ? 'Edit a task': 'Add a new task'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="task.."
                      className={cn(
                        form.formState.errors.task &&
                          "focus-visible:ring-red-400"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {items.map((option) => {
                        return (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={option.id}
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isEdit.enable ? "Edit" : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTaskModal;
