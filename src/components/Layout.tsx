import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
