# Function Score

[foe legact version - ES 6.8](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-function-score-query.html)

## Boost

```python
GET /_search
{
    "query": {
        "function_score": {
            "query": { "match_all": {} },
            "boost": "5",
            "random_score": {}, 
            "boost_mode":"multiply"
        }
    }
}
```

* boost (float) - boost value
* boost_mode : `multiply`
  * multiply (default)
  * replace - only function score is used, query score is ignored
  * sum - query score and function score are added
  * avg
  * max - max of query score and function score
  * min - min of query score and function score

## Wright (When you want to normalize)

```python
GET /_search
{
    "query": {
        "function_score": {
          "query": { "match_all": {} },
          "boost": "5", 
          "functions": [
              {
                  "filter": { "match": { "test": "bar" } },
                  "random_score": {}, 
                  "weight": 23
              },
              {
                  "filter": { "match": { "test": "cat" } },
                  "weight": 42
              }
          ],
          "max_boost": 42,
          "score_mode": "max",
          "boost_mode": "multiply",
          "min_score" : 42
        }
    }
}
```

* several functions can be combined
* each document is scored by the defined functions
* `score_mode` : specifieds how the computed scores are conbined
* each score can be different `scales` - use `weight` to control your overall score
  * sum
  * avg
  * first - the first func that has a matching filter is applied
  * max
  * min
* e.g. 
  * score_mode : `avg`
  * weight : `w1`, `w2`
  * overall score = `(w1 * s1 + w2 * s2) / (w1 + w2)`
* `max_boost` - limit the score

more:

1. script_score
2. random_score
3. field_value_factor
4. decay functions: gauss, linear, exp

## Field Value factor

[dicussion on stackoverflow](https://stackoverflow.com/questions/52776547/elasticsearch-use-function-score-query-field-value-factor-with-match-query)

* allow you to use a field from a document to influence the score.

* similar to `script_score`, but avoids the overhead of scropting.

* if used on a multi-values field, only the first value of the field is used.


e.g. use `like` to influence the ranking.

```python
GET /_search
{
    "query": {
        "function_score": {
            "field_value_factor": {
                "field": "likes",
                "factor": 1.2,
                "modifier": "sqrt",
                "missing": 1
            }
        }
    }
}
```

translate to `sqrt(1.2 * doc[likes].value`

* field
* factor (default to 1)
* modifier (none, log, log1p, log2p, ln, ln1p, ln2p, square, sqrt, reciprocal)
* missing - value used if the documnet doesn't have that field. modifier and factor are still applied
