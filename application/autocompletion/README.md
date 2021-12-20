## Create Index
http put http://localhost:9200/poi_autocompletion_yyyyMMdd @index.json

### for alpha site, nested type
http put http://localhost:9200/poi_autocompletion_yyyyMMdd?include_type_name=true @index.json

## List Index
http get localhost:9200/_cat/indices

## Delete Index
http delete localhost:9200/poi_autocompletion_yyyyMMdd

## Inser data

`insert.ipynb`

## Search

`python -m venv .venv`

`poetry install`

`.venv/bin/python search_app/backend/api.py`

`.venv/bin/python search_app/frontend/app.py`