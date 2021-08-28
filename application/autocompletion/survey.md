# Ref

## Eng

[Elasticsearch: Building AutoComplete functionality](https://taranjeet.medium.com/elasticsearch-building-autocomplete-functionality-494fcf81a7cf)

[Suggesters Official doc](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html)

[Elasticsearch Autocomplete Guide](https://opster.com/elasticsearch-glossary/elasticsearch-auto-complete-guide/)

[ES search 中文搜尋??]

Docs :
```
Spider-Man: Homecoming
Ant-man and the Wasp
Avengers: Infinity War Part 2
Captain Marvel
Black Panther
Avengers: Infinity War
Thor: Ragnarok
Guardians of the Galaxy Vol 2
Doctor Strange
Captain America: Civil War
Ant-Man
Avengers: Age of Ultron
Guardians of the Galaxy
Captain America: The Winter Soldier
Thor: The Dark World
Iron Man 3
Marvel’s The Avengers
Captain America: The First Avenger
Thor
Iron Man 2
The Incredible Hulk
Iron Man

```

check `005_build_custom_mapping.es`

### Prefix Query
1. matching is supported only at the beginning of the term.
2. Not optimized for large datasets, result in increased latency.

GET movies_autocompletion/_search
{
  "query": {
    "prefix":{
      "keywordstring" : "Av"
    }
  }
}

```
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}

```

Case sensitive



### Edge Ngram

1. different analysuers at index and search time.

	indexing : edge n-gram filter can be applied.

	search time : standard analyser can be applied.

2. break the text dowen into words on custom characeters(space, special characyers, etc..) (May not good for chinese, need custom tokenizer)

3. generally fast for queires but may result in slower indexing in large index storage.


### Completion Suggester

1. In-memory data structure called Finite State Transducer. ES sotres FST on per segment basis, which means suggestions scale horizobntally as more new nodes are added
2. You should use `completion` types as its filed type.
3. Weights can be defined with each document to control thire ranking.
4. Store all the terms in lowercase helps in the case-insensitive match.
5. Context suggester can be enabled to support filtering or boosting by certain criteria.
6. Idea approach

### Search as your type
