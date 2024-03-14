import Navbar from "@/components/main-layout/navbar";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

function MainLayout({ children }: Prop) {
  return (
    <div className="h-full w-full flex flex-col-reverse lg:flex-row justify-between lg:justify-start">
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
