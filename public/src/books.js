/* find first author by id
-> use of find()
-> arrow function 
*/
function findAuthorById(authors, id) {
  return authors.find(authorId => authorId.id === id);
}

/* find books by id
-> could technically use findAuthorById as a helper function
-> use of find()
-> arrow function
*/
function findBookById(books, id) {
  return books.find(bookId => bookId.id === id);
}

/*traverse through the array of books 
->so technically, only need to look at the first instance of book.borrows to see if it is borrow/returned
-> if false - then book is still loaned out
-> if true - book has been returned and in no one's posession
-> Just for fun - did every() for returned variable
---> checks if every instance of book was returned (true) - thus, it has been returned
-> combine the arrays (no spread since we want a nested array (two arrays w/in one))
*/
function partitionBooksByBorrowedStatus(books) {
  const borrow = books.filter(book => !(book.borrows[0].returned));
  const returned = books.filter(book => book.borrows.every(item => (item.returned)))
  const combineArr = [borrow, returned];
  return combineArr;
}

/* retrieve values of book.borrows (spread operator)
--> traverse through obtained book.borrows value
--> retrieve account information - by finding when book.borrows.id equals account.id
---> assign the account information found to a variable
---> push back the values of book.borrows and the account information (spread operater)
-> slice array of objects to ten
*/
function getBorrowersForBook(book, accounts) {
  const result = [...book.borrows];
  result.forEach((item, index) => {
    const accountFound = accounts.find(account => item.id === account.id);
    result[index] = {...item, ...accountFound};
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
