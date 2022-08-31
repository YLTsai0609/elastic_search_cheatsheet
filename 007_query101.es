// full text search and analyzer related
// filed : text

// fulltext search

// By default, using OR operator to score
// GET index/_search
// {
//     "from": 0,
//     "size": 10,
//     "query": {
//         "match": {
//             "title": "奇異博士 影評",
// 			   "operator": "and"
//         }
//     }
// }

// explain your query
// GET index/_search
// {
//     "explain":true,
//     "from": 0,
//     "size": 10,
//     "query": {
//         "match": {
//             "title": "奇異博士 影評"
//         }
//     }
// }

// analyze your text

// POST topic_article_20201230/_analyze
// {
//     "text": "台北火鍋"
// }

// do some experiment on analyzers

// POST _analyze
// {
//   "tokenizer": "standard",
//   "filter":  [ "lowercase", "asciifolding" ],
//   "text":      "Is this déja vu?"
// }



// GET /YOUR_INDEX/_doc/DOC_ID/_termvectors
// {
//   "fields" : ["YOUR_FIELD"],
//   "term_statistics" : true,
//   "field_statistics" : true
// }

// Ranking Query

// Suppose mixing recency and relevance

// GET article_search_sample/_search
// {
//     "query": {
//         "function_score": {
//             "functions": [
//                 {
//                     "field_value_factor": {
//                         "field": "recency",
//                         "factor": 1,
//                         "modifier": "none"
//                     }
//                 }
//             ],
//             "query": {
//                 "match": {
//                     "topic": "美食"
//                 }
//             },
//             "score_mode": "multiply"
//         }
//     }
// }

// perform exact match for analyzed input
// then you can sort by other columns


// {
//     "from": 0,
//     "size": 10,
//     "query": {
//         "bool": {
//             "filter": [
//                 {
//                     "term": {
//                         "curating": "策展標籤"
//                     }
//                 },
//                 {
//                     "match_phrase": {
//                         "topic": "搜尋主題"
//                     }
//                 }
//             ]
//         }
//     },
//     "sort": {
//         "uv": "desc"
//     }
// } 

// match_phrase --> analyzed, as filter
// term --> not analyzed, as filter

// we can combine match OR, match and, match_phrase to tuning thr result
// https://www.elastic.co/blog/how-to-improve-elasticsearch-search-relevance-with-boolean-queries?fbclid=IwAR1y9OBnFI_7vKfgBo_67IE6xrebWk4WMG1PhsvJoF0ePR13VJ6hDrC6EvU