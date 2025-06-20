# book-review-platform
# using MERN stack

# Book Pages
1. Added home page with featured books.
2. Added book details page with reviews and ratings.
3. created separate page to list all books in that user can search and filter books by author name and book name;

# user
1. user register,login,profilepage were added;
2. user password was hashed using bcrypt and stored in database for security.
3. Additionally used jwt(json-web-token)for Authentication and added protect middlware so that so can update their profile if their token is valid 
4. The token expires in 7 days.
5. token is stored in cookies.
6. user can update their profile eg: name ,email, password,pic.
7. user can give a review , ratings for the book.

# Admin
1. For admin account isAdmin property is said to true so that admin only can add book.
2. Added add book form to add book(admin only); 