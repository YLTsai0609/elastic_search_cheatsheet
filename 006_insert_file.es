// get indeices (toy data)
GET _cat/indices

// (base) yulongtsai@YudeMacBook-Pro:~/Desktop/Working_Area/elastic_search_cheatsheet/udemy/chp4/data$ curl -XDELETE 127.0.0.1:9200/movies
// DELETE if any
GET movies/_count

// (base) yulongtsai@YudeMacBook-Pro:~/Desktop/Working_Area/elastic_search_cheatsheet/udemy/chp4/data$ curl -PUT 127.0.0.1:9200/_bulk -H 'Content-Type: application/json' --data-binary @moremovie.json
// inser the data into es

// check data
// curl -XGET "127.0.0.1:9200/movies/_search?q=mary%20poppings&pretty"