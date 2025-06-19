import SidebarRoot from "../components/sidebars/sidebar-root";
import AuthRouter from "../routes/auth-router";
import Message from "../pages/root/message";
import AppRouter from "../routes/app-router";

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
        </div>
      </div>
    </>
  );
};

export default AppLayout;
