import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Toast from "./Toast";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { lastToast } = useCart();
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#EFE7D6]">
      <div className="w-full max-w-md relative bg-cream min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white px-3 py-2 rounded">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <BottomNav />
        <Toast message={lastToast} />
      </div>
    </div>
  );
}
