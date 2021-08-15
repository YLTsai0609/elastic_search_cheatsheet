// The index settings
// our custom analyzer called autocomplete 
// Once you setup the analyzer
// We can mapping this when building index

PUT /movies_ngram
{
    "settings": {
        "analysis": {
            "filter": {
                "autocomplete_filter": {
                    "type": "edge_ngram",
                    "min_gram": 1,
                    "max_gram": 20
                }
            },
            "analyzer": {
                "autocomplete": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        " "
                    ]
                }
            }
        }
    }
}

// Actually you can test the ngram wordk as expected by

GET /movies_ngram/_analyze
{
    "analyzer": "autocomplete",
    // "text": "Sta Trek"
    // "text": "新馬辣" // 看起來中文做不到 XD
    // "text": "新馬辣 古亭店" // 看起來中文做不到 XD
    // "text" : "Sta"
}

// Building index 
PUT movies_ngram/_mapping
{
    "properties": {
        "title": {
            "type": "text",
            "analyzer": "autocomplete"
        }
    }
}

// upload data
// http put localhost:9200/_bulk?pretty @movies_ngram.json
GET movies_ngram/_mapping
GET movies_ngram/_count

GET movies_ngram/_search
{
    "query":{
        "match":{
            "title":{
                "query" : "sta"
                // you will get wired result
                // "Plan 9 from Outer Space",
                // Because you are using ngram analyzer by default
            }
        }
    }
}

GET movies_ngram/_search
{
    "query":{
        "match":{
            "title":{
                "query" : "sta",
                "analyzer" : "standard"
            }
        }
    }
}

GET movies_ngram/_search
{
    "query":{
        "match":{
            "title":{
                "query" : "star tr",
                // You will still get "Star Wars: Episode VII - The Force Awakens",
                // Why?
                // Because we match at least one search term like "Star"
                // If the behavior is not what you want
                // So you might use the completion suggester instead.
                // Which you might control more
                "analyzer" : "standard"
            }
        }
    }
}