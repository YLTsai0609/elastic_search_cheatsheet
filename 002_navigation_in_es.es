// get the version of es

// http get http://35.201.255.59:9200/

// Get the list table in es
GET _cat/indices

// Get schema of table
GET topic_author_20210501/_mapping

// get the creation_date, n shards, n replicas
GET topic_author_20210501/_settings

// get num of data in the table
GET topic_author_20210501/_count
// Get sample data in table

// GET  _cat/aliases?v

// check the shards (the pararellel nodes)
GET _cat/shards/topic_author_20210501?v

GET /_cluster/stats