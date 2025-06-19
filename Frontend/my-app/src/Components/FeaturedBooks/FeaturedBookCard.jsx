import { useEffect, useState } from "react";
import "../FeaturedBooks/FeaturedBookCard.css"
import { Link } from 'react-router-dom';
import axios from "axios"

const FeaturedBookCard = () => {
  useEffect(()=>{
  const fetchBooks = async()=>{
    try{
      const res = await axios.get("http://localhost:5000/api/books/get-book");
      setBooks(res.data);
    }
  catch(error){
    console.log("Error fetching book " ,error);
  }
  }
  fetchBooks();
},[])

  const [Books,setBooks] = useState([]);
   console.log(Books);
  return (
    <div className="book-grid">
      {Books.map((book) => (
        <div className="book-card" key={book._id}>
          <img src={book.coverImage} alt={book.title} />
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <Link to={`/books/${book._id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBookCard;
