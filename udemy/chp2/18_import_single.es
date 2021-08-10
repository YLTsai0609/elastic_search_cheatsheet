// GET _cat/indices

GET movies/_mapping

// Auto create mapping when you inser data
PUT movies_sample_schema/_doc/109487
{
    "genre": ["IMAX","Sci-Fi"],
    "title": "Interstellar",
    "year" : 2014
}
// if you wanna check the mapping
// GET movies_sample/_mapping

// if you wanna create mapping on your own
// DELETE /movies_sample/_doc/109487
PUT movies_sample_schema
{
    "mappings":
    {
        "properties":
        {
            "year" : {
                // kind of create the schema of single column
                "type" : "date"
            }
        }
    }
}

// GET movies_sample_schema/_mapping

// check the data is indeed there.
GET movies_sample_schema/_search