// WITHOUT fuzzy match

GET movies/_search
{
    "query": {
        "match": {
            // You should got nothing
            "title": "intersteller"
        }
    }
}

// with fuzzy maych
GET movies/_search
{
    "query": {
        "fuzzy": {
            // You should got nothing
            "title":{
                "value": "intersteller",
                "fuzziness" : 1
                }
        }
    }
}

// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html
// with fuzzyness perportion to input keyword
GET movies/_search
{
    "query": {
        "fuzzy": {
            // You should got nothing
            "title":{
                "value": "intersteller",
                "fuzziness" : "AUTO"
                }
        }
    }
}