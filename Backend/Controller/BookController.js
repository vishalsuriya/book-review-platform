const Books = require("../Schemas/BookSchema");

const postBook = async (req, res) => {
  try {
    const { title, author, description, coverImage } = req.body;
    const book = new Books({ title, author, description, coverImage });
    await book.save();
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Books.find();
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSpecificBook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const { userName, rating, comment } = req.body;
    const review = {
      userName,
      rating: parseInt(rating),
      comment,
    };

    book.reviews.push(review);
    const total = book.reviews.reduce((acc, r) => acc + r.rating, 0);
    book.averageRating = total / book.reviews.length;
    await book.save();
    res.status(200).json({ message: "Review added successfully", book });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { postBook, getBook, getSpecificBook,addReview };
