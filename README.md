# node-node-google-books-search-promise

Fork of [google-books-search](https://www.npmjs.com/package/google-books-search) which makes use of promises instead of callbacks. Makes use of `util.promisify`; requires Node v8+

## Install

    npm install --save node-google-books-search-promise

or yarn

    yarn add node-google-books-search-promise

## Basic Usage

### .search(query, options)

Search for books matching the specified query.

    const books = require('node-google-books-search-promise');

    books.search('Professional JavaScript for Web Developers').then(results => {
        console.log(results);
    })
    .catch(e => {
        console.log(e);
    });

Or using `await`

    const books = require('node-google-books-search-promise');

    const results = await book.search('Professional JavaScript for Web Developers');
    console.log(results);

Returns an array of JSON objects. For example;

    [
        {
            "id": "9KJJYFIss_wC",
            "title": "Professional Javascript For Web Developers 2Nd Ed",
            "subtitle": "...",
            "authors":[
                "Nicholas C. Zakas"
            ],
            "publisher": "John Wiley & Sons",
            "publishedDate": "2009-02-09",
            "description": "...",
            "industryIdentifiers": [
                {
                    "type": "ISSN",
                    "identifier": "..."
                }
            ],
            "pageCount": 840,
            "printType": "BOOK",
            "averageRating": "4",
            "thumbnail": "http://bks5.books.google.com.au/books?id=...",
            "images": {
                "small": "http://...",
                "medium": "http://...",
                "large": "http://...",
                "extraLarge": "http://...",
            },
            "language": "en",
            "link": "http://books.google.com.au/books?id=..."
        },

        ...

    ]

For a description of each value; see the [Google Books API documentaion for volumes](https://developers.google.com/books/docs/v1/reference/volumes).

### .lookup(volumeId, options)

Lookup books by Volume ID.

    books.lookup('9KJJYFIss_wC').then(function(result) {
        ...
    });

The options argument accepts an object with a `key` field (your API key).

## Advanced Searches

The search method optionally accepts an options object as the second argument. See below for an overview of the available options.

    var books = require('node-google-books-search-promise');

    var options = {
        key: "YOUR API KEY",
        field: 'title',
        offset: 0,
        limit: 10,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };

    books.search("Professional JavaScript for Web Developers", options).then(function(results, apiResponse) {
        console.log(results);
    });

## Options

Option | Description
--- | ---
`key` | Your Google API key (Optional)
`field` | Search in a specified field (title, author, publisher, subject or isbn) (Optional)
`offset` | The position in the collection at which to start the list of results (Default: 0)
`limit` | The maximum number of results to return (Max 40) (Defult: 10)
`type` | Restrict results to books or magazines (Default: all)
`order` | Order results by relevance or newest (Default: relevance)
`lang` | Restrict results to a specified language (two-letter ISO-639-1 code) (Default: en)

For more info please see the [Google Books API documentation](https://developers.google.com/books/docs/v1/reference/)
