import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./components/Home";
import { Employee } from "./components/Employee";
import { Details } from "./components/Details";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Details /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
    </div>
  );
}

export default App;
