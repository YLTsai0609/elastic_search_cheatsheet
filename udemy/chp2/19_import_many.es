// inser by http put
// (base) yulongtsai@YudeMacBook-Pro:~/Desktop/Working_Area/elastic_search_cheatsheet/udemy/chp3/data$ http put localhost:9200/_bulk?pretty @movies.json
// check the result by query search
// http get localhost:9200/movies/_search | jq -C | less -R