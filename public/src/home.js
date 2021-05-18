/* Can just return the length of books - did this just for fun
-> use of for/in loop 
*/
function getTotalBooksCount(books) {
  let total = 0;
  for(let book in books) {
    total++;
  }
  return total;
}

//return the length of the account
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/* can reduce the code and just use filter() and find()
--> every instance of book returned increase a counter variable
-> *For fun* Wanted to use reduce() so made it more complex then needed to be
-> count is set to 1, every instance of returned push count into the array
--> the array now has values of 1 stored inside
----> use reduce() to get sum
*/
function getBooksBorrowedCount(books) {
  let arr = [];
  let count = 1;
  books.forEach(book => book.borrows.find(item => {
    if(!item.returned) {
    arr.push(count);
    }
  }))
  return arr.reduce((acc, value) => {
    return acc + value}, 0);
}

/*traverse through object - if item is not present in new object - add it and put count at 1
-> else - update the count at that value by 1
--> use helper function objKeyValue
---> passes the object as an argument - assigns a key (name, count), pushes it into an array
*/
function getMostCommonGenres(books) {
  let result = {};
  books.forEach(book => {
    if(result[book.genre] == null) {
      result[book.genre] = 1;
    }else {
      result[book.genre]++;
    }
  });
  let transformObj = objKeyValue(result);
  return transformObj.slice(0, 5);
}

//use objKeyValue helper function
function getMostPopularBooks(books) {
  let result = {}
  for(let book in books) {
    result[books[book].title] = books[book].borrows.length;
  }
  let transformObj = objKeyValue(result);
  return transformObj.slice(0, 5);
}

// most inneficient way of doing this
function getMostPopularAuthors(books, authors) {
  //map() function - create a new array mapping the first/last name
  //template literals
  let result = []
  let fullName = authors.map(person => {
    return result.push({
      'name': `${person.name.first} ${person.name.last}`,
    })
  });
  //creating a new array of the amount of borrowed per book
  let bookCount = books.map(book => {
    return book.borrows.length
  })

  //assigning the values (name and count) to actual keys ('name' and 'count)
  let newObj = []
  for(let name in result) {
    newObj.push({
      'name' : result[name].name,
      'count': bookCount[name]
    })
  }

  /* creates a new object
  -> if object does not have the item - add it and add the count
  -> if object has the item already (Tate) - add the remaining count
  */
  let obj = {};
  newObj.forEach(item => {
    if(obj[item.name] == null) {
      obj[item.name] = item.count;
    }else {
      obj[item.name] += item.count;
    }
  })
//call the help function to assign the new object with keys and values and sort from descending
let final = objKeyValue(obj);
//return only the top 5
return final.slice(0, 5);
}

//HELPER FUNCTION
/* assigns values (genre and count) with a key (name, count)
-> pushes obj into an array and returns array of objects
-> sorts the array of objects from descending order
*/
function objKeyValue(obj) {
  let result = [];
  for(let prop in obj) {
    result.push({
      'name': prop,
      'count': obj[prop]
    })
  }
  const sort = result.sort((countA, countB) => (countB.count - countA.count));
  return sort;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
