// using standard analyzer when searching
// but using autocomplete analyzer when indexing
// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-analyzer.html

// PUT my-index-000001
// {
//   "settings": {
//     "analysis": {
//       "filter": {
//         "autocomplete_filter": {
//           "type": "edge_ngram",
//           "min_gram": 1,
//           "max_gram": 20
//         }
//       },
//       "analyzer": {
//         "autocomplete": { 
//           "type": "custom",
//           "tokenizer": "standard",
//           "filter": [
//             "lowercase",
//             "autocomplete_filter"
//           ]
//         }
//       }
//     }
//   },
//   "mappings": {
//     "properties": {
//       "text": {
//         "type": "text",
//         "analyzer": "autocomplete", 
//         "search_analyzer": "standard" 
//       }
//     }
//   }
// }