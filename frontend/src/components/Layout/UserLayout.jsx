import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main><Outlet/></main>
      {/* Footer */}
      <Footer />
    </>
  );
}
