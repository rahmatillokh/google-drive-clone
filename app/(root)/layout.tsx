import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ChildProps } from "@/types";
import React from "react";

const RootLayout = ({ children }: ChildProps) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#f6f9fc] dark:bg-[#1f1f1f] p-4">
        <div className="h-[85vh] p-8 rounded-md ml-4 bg-white dark:bg-black">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
