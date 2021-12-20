// udemy/chp3/data/sayt.txt

POST movies/_analyze
{
    "tokenizer" : "standard",
    "filter" : [
        {
            "type":"edge_ngram",
            "min_gram" : 1,
            "max_gram" : 4
        }
    ],
    // "text" : "Star"
    "text" : "海底撈" // not working
}

PUT autocomplete
{
    "mappings" : {
        "properties":{
            "title":{
                "type":"search_as_you_type"
            },
            "genre" : {
                "type":"search_as_you_type"
            }
        }
    }
}

// http put localhost:9200/autocomplete/_bulk @44_movie.json

GET autocomplete/_mapping

// GET autocomplete/_field

//  1. INPUT=''
//  2. paste the shell command(creating a infinite loop)
//  3. Type in your command line

// Try analyze

POST autocomplete/_analyze
{
    "tokenizer" : "standard",
    "filter" : [
        {
            // "type":"edge_ngram",
            // "type":"ngram",
            "min_gram" : 1,
            "max_gram" : 4
        }
    ],
    "text" : "Star Trek"
    // "text" : "海底撈" // not working
}

GET autocomplete/_search
{
    "size":5,
    "query":
    {
        "multi_match":
        {
            "query" : "s",
            "type":"bool_prefix",
            "fields":[
            "title",
            "title._2gram",
            "title._3gram"
            ]
        }
    }
}

GET _cat/version