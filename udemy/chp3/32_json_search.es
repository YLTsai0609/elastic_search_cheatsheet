// A filter query will be bool query
GET movies/_search
{
    "query" : {
        "bool" :{
            "must" : {"term" : {"title" :  "star"}},
            "filter" : {"range" : {"year" : {"gte" : 2010}}}
        }
    }
}

// Some types of Filters
// filter by exact values

// {"term" : {"year" : 2014}}

// Match if any exact values in a list match

// {"term" : {"genre" : ["Sci-Fi", "Adventure"]}}

// Range : Find unmbers or dates in given rage

// {"range" : {"year" : ["gte", 2010]}}

// Exist : Find documents where a field exists

// {"exists" : {"field " : "tags"}}

// Missing : Find documents where a field is missing

// {"missing" : {"field" : "tags"}}

// Bool : Combine filters with Boolean logic {must, must_not, should}

// Some Types of Queries

// Match_all : Return all docuemnts and is the default, Normally used with a filter

// {"match_all" : {}}

// Match : Searches analyzed results, such as full text search

// {"match" : {"ttle" : "star"}}

// Multi_match : Run the same query on multuple fields

// {"multi_match" : {"query" : "star", "fields" : ["title","synopsis"]}}

// Bool : Works like a bool filter, but results are second by relevance

// Syntax Reminder 
// Query are wapped in a "query" block
// Filters are wrapped in a "filter" block

// You can combine query inside filter or vice versa

// Star Wars released after 1980

GET movies/_mapping

// If you're tring query with filter
GET movies/_search
{
    "query":{
        "bool" :{
            "must" : {"match_phrase" : {"title" : "Star Wars"}},
            "filter" : {"range" : {"year" : {"gte" : 1980}}}
        }
    }
    // "sort" : {"year" : "desc"}
}

// COmplex filter

GET movies/_search
{
    "query": {
        "bool": {
            "must": {
                "match": {
                    "genre": "Sci-Fi"
                }
            },
            "must_not": {
                "match": {
                    "title": "trek"
                }
            },
            "filter": {
                "range": {
                    "year": {
                        "gte": 2010,
                        "lt": 2015
                    }
                }
            }
        }
    }
}