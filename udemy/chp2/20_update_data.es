// Every document has a _version field 
// elasticsearch documents are immutable
// When you updaye an existing document, 
// a new document is created with an incremented _version
// the old document is marked fore deletion

// Update exisited document
POST movies/_doc/109487/_update
{
    "doc" : {
        "title" : "Interstellar"
    }
}

// you can check the version become 1
// {
//     "_index": "movies",
//     "_type": "_doc",
//     "_id": "109487",
//     "_version": 1,
//     "result": "noop",
//     "_shards": {
//         "total": 0,
//         "successful": 0,
//         "failed": 0
//     },
//     "_seq_no": 8376,
//     "_primary_term": 1
// }