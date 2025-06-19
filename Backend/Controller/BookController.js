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

const addRating = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { rating } = req.body;
    const newRating = parseFloat(rating);

    if (isNaN(newRating) || newRating < 1 || newRating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }
    const totalRatingCount = book.totalRating || 0;
    const currentAverage = book.averageRating || 0;

    const updatedAverage =
      (currentAverage * totalRatingCount + newRating) / (totalRatingCount + 1);

    book.averageRating = updatedAverage;
    book.totalRating = totalRatingCount + 1;

    await book.save();

    res.status(200).json({
      message: "Rating submitted and average updated",
      averageRating: book.averageRating.toFixed(1),
      totalRatings: book.totalRatings,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { postBook, getBook, getSpecificBook,addReview ,addRating};
