// numerical simple =)

GET movies/_search
{
    "query" : {
        "match" : {}
    }
    // "sort" : {"year" : "desc"}
}
// text field
// cannot sort the analyzed field.
// work around
// If you need to sort on an analyzed text field, map a keyword copy.
// However, you should design it well when you are building the index.