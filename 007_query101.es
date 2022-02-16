// full text search and analyzer related
// filed : text

// fulltext search

// GET index/_search
// {
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

