GET movies/_mapping

GET movies/_search
{
    "query": {
        "match_phrase_prefix": {
            "title": {
                // "query": "star",
                "query": "tr",
                "slop": 10
            }
        }
    }
}