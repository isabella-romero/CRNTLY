from flask import Blueprint, render_template, request, redirect, url_for, flash, abort

from .model import Model 
from .cryp import Cryp

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('main.login') #redirect to login page if nothing happens

@main.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    
    if not username or not password:
        flash('Please enter both username and password.')
        return redirect(url_for('main.index'))
    
    model = Model()
    user = model.get_user_by_username(username)
    
    if not user:
        flash('Username does not exist.')
        return redirect(url_for('main.index'))
    
    cryp = Cryp()
    if not cryp.check_password(user['password'], password):
        flash('Incorrect password.')
        return redirect(url_for('main.index'))
    
    # Successful login logic here
    return 'Login successful!'  # Replace with actual success handling