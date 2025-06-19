import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import BookList from "./Components/BookList/BookList";
function App() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route path="/allbooks" element={<BookList />} />
    </Routes>
  );
}

export default App;
