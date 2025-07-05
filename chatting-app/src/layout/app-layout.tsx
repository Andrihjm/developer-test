import SidebarRoot from "../components/sidebars/sidebar-root";
import AuthRouter from "../routes/auth-router";
import Message from "../pages/root/message";
import AppRouter from "../routes/app-router";
import Crud from "../pages/root/latihan/crud";

const AppLayout = () => {
  return (
    <>
      <main className="">
        <AuthRouter />
      </main>

      <div className="flex h-screen w-full">
        <SidebarRoot />
        <Message />

        <div className="w-full flex-1 bg-[#161717]">
          <AppRouter />
          <Crud />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
