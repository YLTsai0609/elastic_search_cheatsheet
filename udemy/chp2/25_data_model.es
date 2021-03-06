// parent child relation
// http put localhost:9200/_bulk @series.json

GET series/_search
{
    "query": {
        "has_parent": {
            "parent_type": "franchise",
            "query": {
                "match": {
                    "title": "Star Wars"
                }
            }
        }
    }
}


// {
//     "took": 99,
//     "timed_out": false,
//     "_shards": {
//         "total": 1,
//         "successful": 1,
//         "skipped": 0,
//         "failed": 0
//     },
//     "hits": {
//         "total": {
//             "value": 7,
//             "relation": "eq"
//         },
//         "max_score": 1,
//         "hits": [
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "260",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "260",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode IV - A New Hope",
//                     "year": "1977",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "1196",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "1196",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode V - The Empire Strikes Back",
//                     "year": "1980",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "1210",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "1210",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode VI - Return of the Jedi",
//                     "year": "1983",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "2628",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "2628",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode I - The Phantom Menace",
//                     "year": "1999",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "5378",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "5378",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode II - Attack of the Clones",
//                     "year": "2002",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi",
//                         "IMAX"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "33493",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "33493",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode III - Revenge of the Sith",
//                     "year": "2005",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Sci-Fi"
//                     ]
//                 }
//             },
//             {
//                 "_index": "series",
//                 "_type": "_doc",
//                 "_id": "122886",
//                 "_score": 1,
//                 "_routing": "1",
//                 "_source": {
//                     "id": "122886",
//                     "film_to_franchise": {
//                         "name": "film",
//                         "parent": "1"
//                     },
//                     "title": "Star Wars: Episode VII - The Force Awakens",
//                     "year": "2015",
//                     "genre": [
//                         "Action",
//                         "Adventure",
//                         "Fantasy",
//                         "Sci-Fi",
//                         "IMAX"
//                     ]
//                 }
//             }
//         ]
//     }
// }

GET series/_search
{
    "query": {
        "has_child": {
            "type": "film",
            "query": {
                "match": {
                    "title": "The Force Awakens"
                }
            }
        }
    }
}