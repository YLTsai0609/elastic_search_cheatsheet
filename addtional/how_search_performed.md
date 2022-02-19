

# Inverted Index When Indexing Chinese
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

# How the full text search perform exactly?

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


We can leverage this to do the folllowling:

1. find everything ending with `tastic`, we can index the reverse, e.g. `fantastic` --> `citsatnaf` and search everything starting with `citsat`
2. finding substring often involves splitting terms into smaller terms called `n-grams` - yours : `^yo`, `you`, `our`, `urs`, `rs$`
3. geo coordinates such as `60.6384, 6.5017` can be converted into `geo hashes`(encoded string) to perform the search.
4. same idea, if we wanna enable `phonetic matching`(語音搜尋) - 聽出這個人是誰, there are some algo like [`metaphone`](https://en.wikipedia.org/wiki/Metaphone) to convert voice to hashes.
5. when dealing with numeric data and timstamps, Lucene automaticaaly generates serval terms with different precision in a trie-like fashion
   1. 123 --> "1", "12", "123", so searching for everything in range [100, 199] is therefore every matching `1` - hundren-term.
6. to do `Did you mean?` - type searches and find spelling that are close to the input, we can use edit distance like `Levenshtein` automaton