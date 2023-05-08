import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogAdmin from "../components/LoginAdmin";
import RegistrationForm from "../pages/Register";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Puzzle from "../pages/Puzzle";
import Header from "../components/Header";
import { AppContext } from "../context/AppContextProvider";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogAdmin heading={"Login"} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin" element={<LogAdmin heading={"Admin"} />} />
        <Route path="/game" element={<Game />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
