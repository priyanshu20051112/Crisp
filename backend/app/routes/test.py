from flask import Flask , request, Blueprint
test = Blueprint("test", __name__)

@test.route("/")
def home():
    return "Backend is running"