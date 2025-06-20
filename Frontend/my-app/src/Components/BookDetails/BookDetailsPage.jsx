import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../BookDetails/BookDetailsPage.css';
import NavigationBar from "../Header/NavigationBar";
import Footer from "../Footer/Footer";
import NavigationBar2 from "../Header/NavigationBar2"
const BookDetailsPage = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null); 
  const [showModal, setShowModal] = useState(false);           
  const [showRatingModal, setShowRatingModal] = useState(false); 
  const [reviewData, setReviewData] = useState({ userName: '', rating: '', comment: '' });
  const [ratingOnly, setRatingOnly] = useState(''); 
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://book-review-platform-server-cfuk.onrender.com/api/books/book-details/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    };

    const checkUser = async () => {
      try {
        const res = await axios.get("https://book-review-platform-server-cfuk.onrender.com/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchBook();
    checkUser();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://book-review-platform-server-cfuk.onrender.com/api/books/${id}/add-review`, reviewData, {
        withCredentials: true,
      });
      setShowModal(false);
      setReviewData({ userName: '', rating: '', comment: '' });
      const res = await axios.get(`https://book-review-platform-server-cfuk.onrender.com/api/books/book-details/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://book-review-platform-server-cfuk.onrender.com/api/books/${id}/add-rating`, {
        rating: ratingOnly
      }, {
        withCredentials: true,
      });
      setShowRatingModal(false);
      setRatingOnly('');
      const res = await axios.get(`https://book-review-platform-server-cfuk.onrender.com/api/books/book-details/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  if (!book) return <p>Loading book...</p>;

  return (
    <div>
       {user? <NavigationBar2 /> : <NavigationBar />}
      <div className="book-detail-container">
        <img src={book.coverImage} alt={book.title} className="book-cover" />
        <div className="book-detail-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description || "No description available."}</p>
          <p><strong>Average Rating:</strong> {book.averageRating?.toFixed(1) || "No ratings yet"}</p>

          <div className="review-buttons">
            <button
              className="review-btn"
              onClick={() => {
                if (user) {
                  setShowModal(true);
                } else {
                  alert("Please log in to submit a review.");
                }
              }}
            >
              Submit your Review
            </button>

            <button
              className="rating-btn"
              onClick={() => {
                if (user) {
                  setShowRatingModal(true);
                } else {
                  alert("Please log in to give a rating.");
                }
              }}
            >
              Give Rating
            </button>
          </div>

          <h3>Reviews</h3>
          {book.reviews && book.reviews.length > 0 ? (
            <ul>
              {book.reviews.map((review, idx) => (
                <li key={idx}>
                  <strong>{review.userName}</strong> ({review.rating}★): {review.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Submit a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <input
                  type="text"
                  name="userName"
                  placeholder="Your Name"
                  value={reviewData.userName}
                  onChange={handleReviewChange}
                  required
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  required
                />
                <textarea
                  name="comment"
                  placeholder="Your review"
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                  required
                ></textarea>
                <div className="modal-buttons">
                  <button type="submit" className="submit-btn">Submit</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showRatingModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Submit a Rating</h2>
              <form onSubmit={handleRatingSubmit}>
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  value={ratingOnly}
                  onChange={(e) => setRatingOnly(e.target.value)}
                  required
                />
                <div className="modal-buttons">
                  <button type="submit" className="submit-btn">Submit</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowRatingModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookDetailsPage;
