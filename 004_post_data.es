// POST json data into cluster
// each darta called document
POST logs-my_app-fefault/_doc
{
  "@timestamp": "2099-05-06T16:21:15.000Z",
  "event": {
    "original": "192.0.2.42 - - [06/May/2099:16:21:15 +0000] \"GET /images/bg.jpg HTTP/1.0\" 200 24736"
  }
}


// {
//   "_index": ".ds-logs-my_app-default-2099-05-06-000001", 
    // _index that contain the document, es automatically generates the name of backing indices

//   "_type": "_doc",
//   "_id": "gl5MJXMBMk1dGnErnBW8",
    //  unique _id for the document within the index
//   "_version": 1,
//   "result": "created",
//   "_shards": {
//     "total": 2,
//     "successful": 1,
//     "failed": 0
//   },
//   "_seq_no": 0,
//   "_primary_term": 1
// }

// Use the `_bulk` endpoint to add multiple documents in one request
// Bulk data must be newline-delimited JSON(NDJSON). Each line must end in a newline character (\n) uncluding the last line.

PUT logs-my_app-default/_bulk
{
    "create": {}
}
{ "@timestamp": "2099-05-07T16:24:32.000Z", "event": { "original": "192.0.2.242 - - [07/May/2020:16:24:32 -0500] \"GET /images/hm_nbg.jpg HTTP/1.0\" 304 0" } }
{ "create": { } }
{ "@timestamp": "2099-05-08T16:25:42.000Z", "event": { "original": "192.0.2.255 - - [08/May/2099:16:25:42 +0000] \"GET /favicon.ico HTTP/1.0\" 200 3638" } }

// POST topic_author_sample/_doc
// {
//   "author_id" : "joetsai"
// }

// GET topic_author_sample/_search