from flask import Flask, request, jsonify
from flask_restx import Api
from config import DevConfig
from models import User, Patients
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
from auth import auth_ns
from patients import patients_ns
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

migrate = Migrate(app, db, render_as_batch=True)
jwt = JWTManager(app)
CORS(app)

api = Api(app, doc='/docs')
api.add_namespace(auth_ns)
api.add_namespace(patients_ns)


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "user": User,
        "patients": Patients
    }


if __name__ == '__main__':
    app.run(debug=True)
