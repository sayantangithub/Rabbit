import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
}
