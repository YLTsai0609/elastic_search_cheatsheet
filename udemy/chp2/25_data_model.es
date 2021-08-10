GET movies/_mapping


// {
//     "movies": {
//         "mappings": {
//             "properties": {
//                 "genre": {
//                     "type": "text",
//                     "fields": {
//                         "keyword": {
//                             "type": "keyword",
//                             "ignore_above": 256
//                         }
//                     }
//                 },
//                 "genres": {
//                     "type": "text",
//                     "fields": {
//                         "keyword": {
//                             "type": "keyword",
//                             "ignore_above": 256
//                         }
//                     }
//                 },
//                 "id": {
//                     "type": "text",
//                     "fields": {
//                         "keyword": {
//                             "type": "keyword",
//                             "ignore_above": 256
//                         }
//                     }
//                 },
//                 "title": {
//                     "type": "text",
//                     "fields": {
//                         "keyword": {
//                             "type": "keyword",
//                             "ignore_above": 256
//                         }
//                     }
//                 },
//                 "year": {
//                     "type": "long"
//                 }
//             }
//         }
//     }
// }

GET movies/_search
{
   "query":{
      "match":{
         // "title" : "star trek"
         "title" : "Star Trek" // same result
         // you might notice the score (tfidf values?)
      }
   }
}


// it will perform tfidf scoring search due to we set 
// text for full-text-search
GET movies/_search
{
   "query":{
      "match_phrase":{
       "genre" : "sci"
      }
   }
}

// If we wanna exact match
// http delete localhost:9200/_movies
// (base) yulongtsai@YudeMacBook-Pro:~/Desktop/Working_Area/elastic_search_cheatsheet/udemy/chp2/data$ http put localhost:9200/_movies @24_mappings.json
// (base) yulongtsai@YudeMacBook-Pro:~/Desktop/Working_Area/elastic_search_cheatsheet/udemy/chp2/data$ http put localhost:9200/_bulk @movies.json

// This time we should got nothing due to we create a keyword for exact matching
GET movies/_search
{
   "query":{
      "match_phrase":{
      //  "genre" : "sci"
      "genre" : "Sci-Fi" // This one will get result
      }
   }
}
