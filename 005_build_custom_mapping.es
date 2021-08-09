// # Create index
// prefix query, edge ngram, completion

PUT movies_autocompletion
{
  "settings": {
    "index": {
      "analysis": {
        "filter": {},
        "analyzer": {
          "keyword_analyzer": {
            "filter": [
              "lowercase",
              "asciifolding",
              "trim"
            ],
            "char_filter": [],
            "type": "custom",
            "tokenizer": "keyword"
          },
          "edge_ngram_analyzer": {
            "filter": [
              "lowercase"
            ],
            "tokenizer": "edge_ngram_tokenizer"
          },
          "edge_ngram_search_analyzer": {
            "tokenizer": "lowercase"
          }
        },
        "tokenizer": {
          "edge_ngram_tokenizer": {
            "type": "edge_ngram",
            "min_gram": 2,
            "max_gram": 5,
            "token_chars": [
              "letter"
            ]
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "keywordstring":{
        "analyzer": "keyword_analyzer",
        "type" : "text"
        },
      "edgengram" : {
        "analyzer": "edge_ngram_analyzer",
        "search_analyzer": "edge_ngram_search_analyzer",
        "type" : "text"
      },
      "completion": {
        "analyzer": "standard",
        "type": "completion"
      }
    }
}
}

// Post data inside
POST movies_autocompletion/_doc
{
  "edgengram": "Avengers: Infinity War Part 2",
  "keywordstring": "Avengers: Infinity War Part 2",
  "completion" : "Avengers: Infinity War Part 2"
}