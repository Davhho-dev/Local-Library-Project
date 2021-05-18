/* return the account if the accountID matches the given id
-> use of for/in loop
*/
function findAccountById(accounts, id) {
  for(let accountID in accounts) {
    if(accounts[accountID].id === id) {
      return accounts[accountID];
    }
  }
}
/* sort() the account by last name - use tertinary operator */
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastNameA, lastNameB) => (lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase() ? 1 : -1));
}

/* traverse through each book
-> traverse through borrowed books
-> if book.borrowed id matches the account - increment by one
*/
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach(book => book.borrows.forEach(id => {
    if(account.id === id.id) {
      total++;
    }}
  ));
  return total;
}

/* traverse through books
--> filter for instance where book borrowed is a match with the account holder
--> check to see if item hasn't been returned (currently checked out)
--> push the book into array (results)
-> traverse through the results array and create a key called "author" with value of the author.id
*/
function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  books.forEach(book => book.borrows.filter(item => {
    if(item.id === account.id && !item.returned) {
      result.push(book);
    }}));
  result.forEach(book => book['author'] = authors.find(author => author.id === book.authorId));
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
