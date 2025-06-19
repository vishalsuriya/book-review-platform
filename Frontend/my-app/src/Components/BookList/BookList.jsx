import { useState, useEffect } from 'react';
import axios from 'axios';
import "../BookList/BookList.css";
import NavigationBar from "../Header/NavigationBar";
import Footer from "../Footer/Footer";
const BookList = () => {
  const [Books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books/get-book"); 
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
   <NavigationBar />
  
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
