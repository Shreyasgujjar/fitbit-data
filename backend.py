from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods = ['POST'])
def hello_world():
    content = request.json
    print(content)
    return {'message':  'received data'}

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port= 3000,debug=True)