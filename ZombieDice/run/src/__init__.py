import random


from flask import Flask, redirect, render_template, request, url_for, jsonify


app = Flask(__name__)


DIE_REF = {
            'r': {
                "color": "Red",
                "faces": {
                    1: "shotgun",
                    2: "shotgun",
                    3: "shotgun",
                    4: "footprints",
                    5: "footprints",
                    6: "brain"
                        }
                },
            'y': {
                "color": "Yellow", 
                "faces": {
                    1: "shotgun",
                    2: "shotgun",
                    3: "footprints",
                    4: "footprints",
                    5: "brain",
                    6: "brain"
                        }
                },
            'g': {
                "color": "Green",
                "faces": {
                    1: "shotgun",
                    2: "footprints",
                    3: "footprints",
                    4: "brain",
                    5: "brain",
                    6: "brain"
                        }
                }
            }


class ZombieDice():
    """TODO docstring"""
    def __init__(self, game_state, pk):
        self.get_attr_from_str(game_state)
        self.pk = pk


    def get_attr_from_str(self, game_state):
        """parse the current game state to get class attributes"""
        split_game_state = game_state.split('?')
        raw_dice_cup = split_game_state[0]
        raw_player_scores = split_game_state[1]
        try:
            raw_current_hand = split_game_state[4]
        except IndexError:
            raw_current_hand = ''
        self.round_score = split_game_state[2]
        self.round_shotguns = split_game_state[3]
        self.dice_cup = self.format_dice_cup(raw_dice_cup)
        self.current_hand = self.format_current_hand(raw_current_hand)
        self.player_scores = self.format_player_scores(raw_player_scores)


    def format_dice_cup(self, dice_cup):
        """take dice cup from state string and reformat to be used"""
        dice_cup_list = []
        for character in dice_cup:
            dice_cup_list.append(character)
        return dice_cup_list


    def format_player_scores(self, player_scores):
        """take player scores from state string and reformat to be used"""
        player_score_list = player_scores.split(',')
        for i in range(len(player_score_list)):
            player_score[i] = player_score[i].split(':')
        return player_score_list


    def format_current_hand(self, current_hand):
        """take current hand from state string and reformat to be used"""
        hand_list = []
        for character in current_hand:
            hand_list.append(character)
        return hand_list


    def pull_dice(self):
        """draw from cup until player has 3 dice in hand"""



    def roll_dice(self):
        """roll three dice and return results"""


    
    def bank_score(self):
        """bank current round score"""
        


def create_start_state(player_list):
    """create a string of the starting state given a list of player pks"""
    start_players_scores = ''
    for player in players:
        start_players_scores += (str(player) + ':0')
    # state is cup?player:score?round score?round shotguns?leftover dice
    game_state = f'GGGGGGYYYYRRR?{start_players_scores}?0?0?'
    return game_state


@app.route('/get', methods=['GET'])
def get_point():
    if request.method == 'GET':
        state = request.get_json()
        user_turn = state['user_turn']
        turn_number = state['turn_number']
        players = state['players']
        # set state to base if the game has just been initialized
        if state['state'] == 'START':
            game_state = create_start_state(players)
        elif state['state'].find("WIN -") > -1:
            return state['state']
        else:
            game_state = state['state']
        
        
        