from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import os

load_dotenv()
# Instantiate a client instance
client = Elasticsearch(f"{os.environ['ES_HOST']}:{os.environ['ES_PORT']}")

# Call an API, in this example `info()`
# resp = client.info()


resp = client.search(
    index=os.environ['INDEX'],
    body={
        'size':5,
        "query":{
            "term":
            {
                "ngram":"仙草"
            }
        },
        "_source": [
            'poi_name',
            'hash_id'
        ],
    }
)


print([
    doc['_source']['poi_name']
     for doc 
     in resp['hits']['hits']]
     )