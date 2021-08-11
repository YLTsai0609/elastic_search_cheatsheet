
GET _cat/indices

// Prefix
GET movie_yeartext/_search
{
    "query" : {
        "prefix" : {"year" : "201"}
    }  
}

// Widldcard


GET movie_yeartext/_search
{
    "query" : {
        "wildcard" : {"year" : "1*"}
    }  
}
