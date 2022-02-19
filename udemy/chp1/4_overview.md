# Elasticsearch

1. started off as scalable lucene
2. horizontally scalable search engine
3. each `shard` is an `inverted index`
4. full text search and aggregation
5. often a faster solution than hadoop/spark/flink

# Inverted Index

doc 1 : `Space: The final frontier. These are the voyages...`

doc 2 : `He's bad. he's number one. He's the space cowboy with the laser gun.`

inverted index (normalize, tokenize):

space : 1,2

the : 1,2

final : 1,

frontier : 1

he : 2

bad : 2


# (Addtional) Inverted Index When Indexing Chinese
* 怎麼看 inverted term index?

```
GET /YOUR_INDEX/_doc/DOC_ID/_termvectors
{
  "fields" : ["YOUR_FIELD"],
  "term_statistics" : true,
  "field_statistics" : true
}
```

[More about `_termvectors` API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html)

* 一般來說，中文字是單個字單個字存成一個 term，如果是 index `title`:`葉問三`
  * term - document
    * `葉`
    * `問`
    * `三`

* (TODO) 可以設置 space tokenizer 來進行 Indexing?

# (Additional) How the full text search perform exactly?

[ref : elasticsearch from the bottom up, part1](https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up)

start from inverted index

doc 1 : `Winter is coming`

doc 2 : `Ours is the fury`

doc 3 : `The choice is yours`

|term|freq|documments|
|----|----|----------|
|choice|1|3|
|coming|1|1|
|fury|1|2|
|is|3|1,2,3|
|ours|1|2|
|the|2|2,3|
|winter|1|1|
|yours|1|3|

* input query = `is`
  * find `is` in term dictionary
  * calculate relevance score in doc 1, 2, 3 by [`tfidf`](https://zh.wikipedia.org/wiki/Tf-idf)
  * document freq `is` = 3, idf = $log \frac{5}{3}$
  * term freq `is` in doc 1, 2, 3 = 1
  * then tfidf `is` with doc 1, 2, 3 = $log \frac{5}{3}$, $log \frac{5}{3}$, $log \frac{5}{3}$
  * return score by sorting highest relevance score (with lucene)

* input query = `is cat`
	* do query `is`, AND `cat`

* features
  * term is `sorted` when created index.
    * instead of finding terms in $O(N)$, we can look the first char(we already sorted), then look the second char, ... - treat that as `prefix` finding in sorted char, time complexity $O(log(N))$
  * `immutable` - this is quite different to B-trees, when you delete a documnet from an index, the document is `marked` as such in a special deletion files