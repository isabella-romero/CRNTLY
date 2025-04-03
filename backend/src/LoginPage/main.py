from flask import Flask,request,render_template,redirect 
import os
import sqlite3

currentlocation = os.path.dirname(os.path.abspath(__file__))

myapp = Flask(__name__)

@myapp.route('/')
def index():
    return render_template('index.html')

@myapp.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # Connect to the SQLite database
    conn = sqlite3.connect(os.path.join(currentlocation, 'users.db'))
    cursor = conn.cursor()
    query1 = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
    cursor.execute(query1)
    query2 = "INSERT INTO users (username, password) VALUES (?, ?)"
    cursor.execute(query2, (username, password))
    conn.commit()
    # Check if the table is created successfully
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
    table_exists = cursor.fetchone()
    if table_exists:
        print("Table created successfully")
    else:
        print("Table creation failed")
    # Check if the username already exists
    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    existing_user = cursor.fetchone()
    if existing_user:
        return redirect('/')
    
    # Check if the username and password match
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    
    conn.close()
    
    if user:
        return redirect('/welcome')
    else:
        return redirect('/')
@myapp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        
        # Connect to the SQLite database
        conn = sqlite3.connect(os.path.join(currentlocation, 'users.db'))
        cursor = conn.cursor()
        
        # Check if the username already exists
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            return redirect('/')
        
        # Insert the new user into the database
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        conn.close()
        
        return redirect('/welcome')
    
    return render_template('register.html')

if __name__ == '__main__':
    myapp.run(debug=True)