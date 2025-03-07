import React, { useState, StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from './context';
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Tasks from "./pages/Tasks";


const App = () => {
  const routes = [
    { path: "/", component: Home, exact: true },
    { path: "/about", component: About, exact: true },
    { path: "/faq", component: Faq, exact: true },
    { path: "/tasks", component: Tasks, exact: true },
    // { path: "*", component: NotFound, exact: true }
  ];

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, component: Component, exact }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <App />
)
