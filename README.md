### Personal Library: Documentation

*   **POST**  

    to add a book make a request with a body containing _title_

    `/api/books` returns a json object, with a unique id, title and comments. e.g  
`{ "_id": "5bb9e5495fb87310e1057656", "title": "Game of thrones", "comments": [] }`

*   **GET**

    To retrieve an aray of all books.

    `/api/books`  
Returns.  
`[ { "_id": "5bb9e5495fb87310e1057656", "title": "Game of thrones", "commentcount": 1 }, { "_id": "5bb9e6dd5fb87310e1057657", "title": "Test-Book", "commentcount": 2 } ]`  

*   **GET**

    To retrieve a single book.

    `/api/books/{_id}`  
returns  
`{ "_id": "5bb9e5495fb87310e1057656", "title": "Game of thrones", "comments": [ "winter is coming. :D" ] }` 

*   **POST**

    To add a comment to a specific book using __id_ and body containing _comment_.

    `/api/books/{_id}`  
Returns a book object with a newly added commnet.  
 `{ "_id": "5bb9e6dd5fb87310e1057657", "title": "Test-Book", "comments": [ "test comment 1", "test comment 2" ] }`  

*   **DELETE**

    To delete a book from the collection.

    `/api/books/{_id}`  
Returns if sucessfull,  
`'delete successful'` 

*   **DELETE**

    To delete all books in the database.

    `/api/books` 
 Returns if sucessfull,  
`'complete delete successful'`

---

For more information visit: [_https://books-lib.glitch.me/_](https://books-lib.glitch.me/)

* * *

