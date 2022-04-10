from flask import Flask, render_template, request, jsonify

# from chat import get_response
from estimate_algo import estimate

app = Flask(__name__)

test_feature = "index.html"
@app.route("/")
def index():
    return render_template(test_feature)
    

@app.route("/chat", methods=["POST", "GET"])
def chat():
    text = request.get_json().get('message')
    print(text)
    response = answer_question(text)
    print(response)
    bot_response = {'bot': response}
    print(bot_response)
    return jsonify(bot_response) 
    # print('chat')
    # return render_template(test_feature)

@app.route("/estimate", methods=["POST", "GET"])
def get_quote():
    var1 = request.get_json().get("height")
    var2 = request.get_json().get("width")
    var3 = request.get_json().get("depth")
    print(f'Inputs = {var1}, {var2}, {var3}')
    response =  estimate(var1, var2, var3)
    bot_response = {'bot': response}
    print(f'Response = {bot_response}')
    return jsonify(bot_response)

@app.route("/booking", methods=["POST", "GET"])
def booking():
    request_test = request.get_json().get("email")
    print(request_test)
    return jsonify(request_test)

if __name__ == '__main__':

    app.run(debug=True)