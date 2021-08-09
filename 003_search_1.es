GET topic_author_20210501/_search

// {
//   "took" : 0, // response time in ms
//   "timed_out" : false, 
//   "_shards" : {
//     "total" : 1,
//     "successful" : 1,
//     "skipped" : 0,
//     "failed" : 0
//   },
//   "hits" : {
//     "total" : {
//       "value" : 10000,
//       "relation" : "gte"
//     },
//     "max_score" : 1.0,
//     "hits" : [
//       {
//         "_index" : "topic_author_20210501",
//         "_type" : "_doc",
//         "_id" : "kh6rQHkByT74QlQ36XuA",
//         "_score" : 1.0,
//         "_source" : {
//           "author_id" : "kuoyuri",
//           "topic" : "南台大店成熟燒肉股",
//           "articles" : 1,
//           "impressions" : 1,
//           "clicks" : 0,
//           "aliases" : [
//             "大股熟成燒肉台南店"
//           ],
//         //   ... your data in json type
//       },