import React from "react";
import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Create from "./Components/Create";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className=" h-screen  w-screen flex ">
      {(pathname != "/" || search.length > 0) && (
        <Link to="/" className="text-2xl absolute left-[17%] text-red-400 ">
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
