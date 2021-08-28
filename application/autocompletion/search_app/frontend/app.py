# https://github.com/soumilshah1995/autocomplete-using-elasticsearch
from flask import Flask
from flask import request,render_template
import requests

app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def index():
    return render_template("home.html")


@app.route('/pipe', methods=["GET", "POST"])
def pipe():

    data = request.form.get("data")

    payload = {}
    headers= {}

    url = "http://127.0.0.1:5000/search?q="+str(data)
    print(url)
    response = requests.request("GET", url, headers=headers, data = payload)
    print(response.json())
    return response.json()


"""
    <div id="pdfcontainer">
        <iframe id="MYResume" src="data:application/pdf;base64," height="500px" width="500"></iframe>
    </div>

"""

if __name__ == "__main__":
    app.run(debug=True, port=4000)