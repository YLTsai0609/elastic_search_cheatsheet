// check the data exist first
// http get localhost:9200/movies/_doc/58559

// but you wanna search the document id
// http get localhost:9200/movies/_search?q=Dark | jq -C | less -R

// delete it
// http delete localhost:9200/movies/_doc/58559
