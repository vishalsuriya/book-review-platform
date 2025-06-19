import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import BookList from "./Components/BookList/BookList";
import AddBook from "./Components/Admin/AddBook";
import BookDetailsPage from "./Components/BookDetails/BookDetailsPage";
import "../src/Components/index.css";
function App() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route path="/allbooks" element={<BookList />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
    </Routes>
  );
}

export default App;
