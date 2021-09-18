// We are trying to use a update by query
// which update some doc with given condition
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
// https://www.elastic.co/guide/en/elasticsearch/painless/master//painless-context-examples.html
// https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-using.html#prefer-params

PUT /seats
{
  "mappings": {
    "properties": {
      "theatre":  { "type": "keyword" },
      "play":     { "type": "keyword" },
      "actors":   { "type": "keyword" },
      "date":     { "type": "keyword" },
      "time":     { "type": "keyword" },
      "cost":     { "type": "double"  },
      "row":      { "type": "integer" },
      "number":   { "type": "integer" },
      "sold":     { "type": "boolean" },
      "datetime": { "type": "date"    }
    }
  }
}

PUT /_ingest/pipeline/seats
{
  "description": "update datetime for seats",
  "processors": [
    {
      "script": {
        "source": "String[] dateSplit = ctx.date.splitOnToken('-'); String year = dateSplit[0].trim(); String month = dateSplit[1].trim(); if (month.length() == 1) { month = '0' + month; } String day = dateSplit[2].trim(); if (day.length() == 1) { day = '0' + day; } boolean pm = ctx.time.substring(ctx.time.length() - 2).equals('PM'); String[] timeSplit = ctx.time.substring(0, ctx.time.length() - 2).splitOnToken(':'); int hours = Integer.parseInt(timeSplit[0].trim()); int minutes = Integer.parseInt(timeSplit[1].trim()); if (pm) { hours += 12; } String dts = year + '-' + month + '-' + day + 'T' + (hours < 10 ? '0' + hours : '' + hours) + ':' + (minutes < 10 ? '0' + minutes : '' + minutes) + ':00+08:00'; ZonedDateTime dt = ZonedDateTime.parse(dts, DateTimeFormatter.ISO_OFFSET_DATE_TIME); ctx.datetime = dt.getLong(ChronoField.INSTANT_SECONDS)*1000L;"
      }
    }
  ]
}


GET /seats/_search
{
    "query": {
        "term": {
            "sold": true
        }
    }
}

GET /seats/_search
{
  "query":{
    "term":{
      "theatre" : "Skyline"
    }
  }
}


// This one worked!
POST /seats/_update_by_query
{
  "script": {
    "source": "ctx._source.sold = params.sold",
    "lang": "painless",
    "params": {
      "sold": true
    }
  },
  "query":{
    "term":{
      "theatre" : "Skyline"
    }
  }
}

// check the version by query
GET /seats/_search
{
  "query":{
    "term":{
      "theatre" : "Skyline"
    }
  },
  "version" : true
}

// You cannot search by version or rollback

// If you would like to have versioning stuff, 
// you might use some workaround method
// https://stackoverflow.com/questions/8218309/can-we-retrieve-previous-source-docs-with-elastic-search-versions