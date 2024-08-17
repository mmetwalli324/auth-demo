from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def get_username():
           username = request.args.get('username')
           return f'{username}'
