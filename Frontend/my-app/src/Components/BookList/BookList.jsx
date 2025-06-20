import { useState, useEffect } from 'react';
import axios from 'axios';
import "../BookList/BookList.css";
import NavigationBar from "../Header/NavigationBar";
import NavigationBar2 from "../Header/NavigationBar2"; 
import Footer from "../Footer/Footer";

const BookList = () => {
  const [Books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false); 

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("https://book-review-platform-server-cfuk.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUserLoggedIn(true);
      } catch (err) {
        setUserLoggedIn(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-review-platform-server-cfuk.onrender.com/api/books/get-book");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const authors = [...new Set(Books.map(book => book.author))];

  const filteredBooks = Books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());

    const matchesAuthor =
      selectedAuthor === '' || book.author === selectedAuthor;

    return matchesSearch && matchesAuthor;
  });

  return (
    <div>
      {userLoggedIn ? <NavigationBar2 /> : <NavigationBar />}

      <div className="book-list-container">
        <h2>📖 All Books</h2>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Filter by Author</option>
          {authors.map((author, idx) => (
            <option key={idx} value={author}>
              {author}
            </option>
          ))}
        </select>

        <div className="book-grid">
          {filteredBooks.length ? (
            filteredBooks.map((book) => (
              <div className="book-card" key={book._id}>
                <img src={book.coverImage} alt={book.title} />
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <a href={`/books/${book._id}`}>
                  <button>Read More</button>
                </a>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookList;
