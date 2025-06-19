import "../FeaturedBooks/FeaturedBookCard.css"
import { Link } from 'react-router-dom';

const featuredBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://covers.openlibrary.org/b/id/8226196-L.jpg',
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://covers.openlibrary.org/b/id/10547158-L.jpg',
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg',
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://m.media-amazon.com/images/I/71Q1Iu4suSL.jpg',
  },
  {
    _id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: 'https://m.media-amazon.com/images/I/81OthjkJBuL.jpg',
  },
  {
    _id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
  },
  {
    _id: '7',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverImage: 'https://covers.openlibrary.org/b/id/11153265-L.jpg',
  },
  {
    _id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg',
  },
  {
    _id: '9',
    title: 'Harry Potter and the Sorcerer’s Stone',
    author: 'J.K. Rowling',
    coverImage: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg',
  },
  {
    _id: '10',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://m.media-amazon.com/images/I/911bSgYftRL.jpg',
  },
  {
    _id: '11',
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    coverImage: 'https://covers.openlibrary.org/b/id/7281511-L.jpg',
  },
  {
    _id: '12',
    title: 'Midnight’s Children',
    author: 'Salman Rushdie',
    coverImage: 'https://covers.openlibrary.org/b/id/10531945-L.jpg',
  },
  {
    _id: '13',
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    coverImage: 'https://covers.openlibrary.org/b/id/9270850-L.jpg',
  },
  {
    _id: '14',
    title: 'Train to Pakistan',
    author: 'Khushwant Singh',
    coverImage: 'https://covers.openlibrary.org/b/id/8165260-L.jpg',
  },
  {
    _id: '15',
    title: 'Wings of Fire',
    author: 'A.P.J. Abdul Kalam',
    coverImage: 'https://covers.openlibrary.org/b/id/8091015-L.jpg',
  },
  {
    _id: '16',
    title: 'The Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    coverImage: 'https://covers.openlibrary.org/b/id/8414991-L.jpg',
  },
  {
    _id: '17',
    title: 'An Era of Darkness',
    author: 'Shashi Tharoor',
    coverImage: 'https://covers.openlibrary.org/b/id/10487078-L.jpg',
  },
  {
    _id: '18',
    title: 'The Immortals of Meluha',
    author: 'Amish Tripathi',
    coverImage: 'https://covers.openlibrary.org/b/id/8787812-L.jpg',
  },
  {
    _id: '19',
    title: 'A Suitable Boy',
    author: 'Vikram Seth',
    coverImage: 'https://covers.openlibrary.org/b/id/8224110-L.jpg',
  },
  {
    _id: '20',
    title: 'Raavan: Enemy of Aryavarta',
    author: 'Amish Tripathi',
    coverImage: 'https://covers.openlibrary.org/b/id/10522761-L.jpg',
  }
];

const FeaturedBookCard = () => {
  return (
    <div className="book-grid">
      {featuredBooks.map((book) => (
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
