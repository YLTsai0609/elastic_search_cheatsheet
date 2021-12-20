# https://github.com/soumilshah1995/autocomplete-using-elasticsearch

try:
    from flask import app,Flask
    from flask_restful import Resource, Api, reqparse
    from elasticsearch import Elasticsearch
    from dotenv import load_dotenv
    import os

except Exception as e:
    print("Modules Missing {}".format(e))


app = Flask(__name__)
api = Api(app)
load_dotenv()

es = Elasticsearch(f"http://{os.environ['ES_HOST']}:{os.environ['ES_PORT']}")



class Poi(Resource):
    def __init__(self):
        self.lead = parser.parse_args().get("q", None)
        self.baseQuery = {
            'size':5,
            "query":{
                "term":
                {
                    "ngram":None
                }
            },
            "_source": [
                'poi_name',
                'hash_id'
            ],
    }

    def get(self):
        print("In")
        value = str(self.lead)
        self.baseQuery["query"]["term"]["ngram"] = value
        res = es.search(index=os.environ['INDEX'], body=self.baseQuery)
        print(res)
        return res


parser = reqparse.RequestParser()
parser.add_argument("q", type=str, required=True, help="query parameter is required ")

api.add_resource(Poi, '/search')



if __name__ == '__main__':
    app.run(debug=True)
