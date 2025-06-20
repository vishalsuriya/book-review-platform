import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import BookList from "./Components/BookList/BookList";
import AddBook from "./Components/Admin/AddBook";
import BookDetailsPage from "./Components/BookDetails/BookDetailsPage";
import "../src/Components/index.css";
import UserRegister from "./Components/Users/UserRegister";
import UserLogin from "./Components/Users/UserLogin";
import AfterLogin from "./Components/Home/AfterLogin";
import UserProfile from "./Components/Users/UserProfile";
function App() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route path="/allbooks" element={<BookList />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path ="/register" element = {<UserRegister />} />
      <Route path = "/login" element = {<UserLogin />} />
      <Route path="/profile" element = {<UserProfile />} />
      <Route path="/userlogin" element = {<AfterLogin />} />
    </Routes>
  );
}

export default App;
