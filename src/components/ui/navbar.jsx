import { Button } from "./button";
import { TargetIcon, PlusCircledIcon } from "@radix-ui/react-icons";

const Navbar = (props) => {
  const { setOpen } = props;
  const openHandler = () => {
    setOpen(true);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-between items-center container h-14 max-w-screen-2xl">
        <h1 className="text-lg font-semibold flex items-center gap-1">
          <TargetIcon width={30} height={30} />
          Task Manager
        </h1>

        <Button variant="outline" onClick={openHandler}>
          Create Task
          <PlusCircledIcon className="ml-1" width={18} height={18} />
        </Button>
      </nav>
    </header>
  );
};
export default Navbar;
