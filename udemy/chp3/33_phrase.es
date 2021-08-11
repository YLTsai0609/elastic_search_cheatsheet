// Must find all terms, in the right order
GET movies/_search
{
    "query" : {
        "match_phrase" : {
            "title" : "star wars" 
        }
    }
}

// Slop
// Order matters, but you're OK with some words being in between


GET movies/_search
{
    "query": {
        "match_phrase": {
            "title": {
                "query": "star beyond",
                "slop": 1
            }
        }
    }
}

// Proximity Query
// result are sorted by relevance
// do a slop = 100 trick
// more relevant will get higher score

GET movies/_search
{
    "query": {
        // "match" : {
        "match_phrase": {
            "title": {
                "query": "star beyond",
                "slop": 100
            }
        }
    }
}