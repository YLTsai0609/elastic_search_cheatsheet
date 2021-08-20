GET _cat/indices

// indiecs : movie_yeartext
// movies_sample_schema


// Get alias of an index
GET movies_sample_schema/_alias

// Get all the index with the alias
GET _alias/log_movie

POST /_aliases
{
    "actions" : [
        {"add" : {"alias":"log_movie", "index" : "movie_yeartext"}},
        {"add" : {"alias":"log_movie", "index" : "movies_sample_schema"}}
    ]
}

// search by alias

// You can notice the shards become 2 instead of 1 (we add 2 index for this alais)
GET log_movie/_search

POST /_aliases
{
    "actions" : [
        {"remove" : {"alias" : "log_movie", "index" : "movies_sample_schema"}}
    ]
}

// Once the api failed, you must add actions "add" from the old index (roll back)