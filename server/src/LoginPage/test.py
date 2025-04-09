from flask import flask

app = Flask(__name__)

print( 'top ', __name__)

@app.route('/')
def hello_world():
    return 'Hello, there!'

@app.route('/welcome')
def welcome():
    return 'Welcome!'

if __name__ == '__main__':
    app.run(debug=1, host='0.0.0.0', port=5000)

    
# This is a simple Flask application that defines two routes: '/' and '/welcome'.
# The '/' route returns 'Hello, there!' and the '/welcome' route returns 'Welcome!'.
# The application is set to run in debug mode on all interfaces at port 5000.
# The __name__ variable is used to determine if the script is being run directly or imported as a module.
# When run directly, the application starts a Flask server.
# The debug mode allows for automatic reloading and improved error messages.
