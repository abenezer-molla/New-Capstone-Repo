from flask import Flask
from flask_restx import Api
from config import DevConfig
from models import User, Patients, ReferralHistory, DoctorStatus
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from auth import auth_ns
from patients import patients_ns
from patients import referral_ns
from doctorStatus import doctorStatus_ns
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

migrate = Migrate(app, db, render_as_batch=True)
jwt = JWTManager(app)
CORS(app)

api = Api(app, doc='/docs')
api.add_namespace(auth_ns)  # namespace for authentication
api.add_namespace(patients_ns)  # namespace for patients
api.add_namespace(referral_ns)  # namespace for referral
api.add_namespace(doctorStatus_ns)  # namespace for doctor status


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "user": User,
        "patients": Patients,
        "referrals": ReferralHistory,
        "doctorStatus": DoctorStatus
    }


if __name__ == '__main__':
    app.run(debug=True)
