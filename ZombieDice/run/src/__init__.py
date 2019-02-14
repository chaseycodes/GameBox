from flask import Flask,redirect,render_template,request,session,url_for, jsonify


app = Flask(__name__)
app.secret_key = 'very secret1'


@app.route('/get', methods=['GET'])
def get_point():
    if request.method == 'GET':
        state = request.get_json()
        user_turn = state['user_turn']
        turn_number = state['turn_number']
        players = state['players']
        # set state to base if the game has just been initialized
        if state['state'] == 'START':
            game_state = '123456789'
        elif state['state'].find("WIN -") > -1:
            return state['state']
        else:
            game_state = state['state']