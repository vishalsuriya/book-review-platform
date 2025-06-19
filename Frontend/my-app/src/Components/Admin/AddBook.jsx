import { useState } from 'react';
import axios from 'axios';
import '../Admin/AddBook.css';

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/books/post-book', form);
      setMessage('✅ Book created successfully!');
      setForm({ title: '', author: '', description: '', coverImage: '' });
    } catch (err) {
      setMessage('❌ Failed to create book.');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book (Admin)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AddBook;
