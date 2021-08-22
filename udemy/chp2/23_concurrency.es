
GET movies/_doc/109487

// {
//     "_index": "movies",
//     "_type": "_doc",
//     "_id": "109487",
//     "_version": 1,
//     "_seq_no": 8376, --> this is the concurrency control
//     "_primary_term": 1, --> this is the concurrency control
//     "found": true,
//     "_source": {
//         "id": "109487",
//         "title": "Interstellar",
//         "year": 2014,
//         "genre": [
//             "Sci-Fi",
//             "IMAX"
//         ]
//     }
// }

PUT movies/_doc/109487?if_seq_no=8376&if_primary_term=1
{
    "genres" : ["IMAX","Sci-Fi"],
    "title" : "Interstellar fool",
    "year" : 2014
}

// {
//     "_index": "movies",
//     "_type": "_doc",
//     "_id": "109487",
//     "_version": 2,
//     "result": "updated",
//     "_shards": {
//         "total": 2,
//         "successful": 1,
//         "failed": 0
//     },
//     "_seq_no": 9743,
//     "_primary_term": 1
// }

// If you try it twice, you will get the error
// because there is a safty control
// Only if you cahnge the sequence no to the updated one

// {
//     "error": {
//         "root_cause": [
//             {
//                 "type": "version_conflict_engine_exception",
//                 "reason": "[109487]: version conflict, required seqNo [8376], primary term [1]. current document has seqNo [9743] and primary term [1]",
//                 "index_uuid": "lEvltlrPSWKvFHQ9Ud5PyA",
//                 "shard": "0",
//                 "index": "movies"
//             }
//         ],
//         "type": "version_conflict_engine_exception",
//         "reason": "[109487]: version conflict, required seqNo [8376], primary term [1]. current document has seqNo [9743] and primary term [1]",
//         "index_uuid": "lEvltlrPSWKvFHQ9Ud5PyA",
//         "shard": "0",
//         "index": "movies"
//     },
//     "status": 409
// }

// So you might failed when you insert data for updating
// You can use 

POST movies/_doc/109487/_update?retry_on_conflict=5
{
    "doc" :  
    {
        // "title" : "Interstellar typo"
        "title" : "Interstellar"
    }
}