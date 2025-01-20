const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
let userswithsamename = users.filter((user) => {
  return user.username === username;
});
// Return true if any user with the same username is found, otherwise false
if (userswithsamename.length > 0) {
  return true;
} else {
  return false;
}
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user) => {
  return (user.username === username && user.password === password);
});
// Return true if any valid user is found, otherwise false
if (validusers.length > 0) {
  return true;
} else {
  return false;
}
}





//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
      // Generate JWT access token
      let accessToken = jwt.sign({
          data: password
      }, 'access', { expiresIn: 60 * 60 });

      // Store access token and username in session
      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const authReview = req.params.isbn;
  let book = books[authReview];  
  if (book) {  
      let newReview = req.body.review;
      if (newReview) {
          // Assuming 'auth' is an object that holds user-specific reviews
          auth[authReview] = newReview;
          res.send(`The review for the book with ISBN ${authReview} has been updated.`);
      } else {
          res.send("Review content is missing!");
      }
  } else {
      res.send("Unable to find the book!");
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const authReview = req.params.isbn;
  let book = books[authReview];
  if (book)
  delete books[authReview].reviews[username]; 
  res.send(`Review for ISBN ${isbn} posted by ${username} has been deleted.`);
});

  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
