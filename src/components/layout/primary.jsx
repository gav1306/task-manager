import Navbar from "../ui/navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const PrimaryLayout = (props) => {
  const { setOpen } = props;
  return (
    <>
      <Navbar setOpen={setOpen} />
      <main className="container">
        <Outlet />
      </main>
      <Toaster richColors toastOptions={{}} theme="light" />
    </>
  );
};
export default PrimaryLayout;
