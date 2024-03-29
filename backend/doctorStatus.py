from flask_restx import Resource, Namespace, fields
from models import User
from models import DoctorStatus
from config import Config
from exts import db

from flask_login import LoginManager
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (JWTManager,
                                create_access_token, create_refresh_token,
                                get_jwt_identity,
                                jwt_required)
from flask import Flask, request, jsonify, make_response, session
from functools import wraps
doctorStatus_ns = Namespace(
    'doctorStatus', description="A namespace for Doctor's Status")

doctorStatus_model = doctorStatus_ns.model(

    'DoctorStatus',
    {
        "doctorfirstname": fields.String(),
        "doctorlastname": fields.String(),
        "doctorid": fields.Integer(),
        "status": fields.String(),
        "doctorusername": fields.String(),
        "department": fields.String(),
        "date": fields.String(),
    }
)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, Config.SECRET_KEY)
            current_user = User.query.filter_by(
                doctorid=data['doctorid']).first()
        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated


@doctorStatus_ns.route('/doctor_status')
class DoctorStat(Resource):

    @jwt_required()
    # jwt_required() means the method below will only work for a logged in authorized individual with unexpired jwt token.
    @doctorStatus_ns.expect(doctorStatus_model)
    def post(self):  # used for CREATE method of CRUD functionality
        """Get currently looged in User """
        token = None

        print(request.headers.get('Authorization'))

        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(' ')[1]

        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        current_user = User.query.filter_by(username=data['sub']).first()
        data = request.get_json()

        doctor = DoctorStatus.query.filter_by(
            doctorid=current_user.doctorid).first()
        status = data.get('status')

        if doctor:  # if the doctor is already in the doctorStatus table
            # we just need to update by assigning the status we get from the frontend input into the backend table
            doctor.status = status
            db.session.commit()
        else:  # if not, we will have to register all the required doctor infomations along with the status
            newUser = DoctorStatus(
                doctorusername=current_user.username,
                doctorfirstname=current_user.firstname,
                doctorlastname=current_user.lastname,
                status=data.get('status'),
                department=current_user.department,
                date=data.get('date'),
                doctorid=current_user.doctorid,
            )
            newUser.save()
            return make_response(jsonify({"message": "User created/registered successfuly"}), 201)


@doctorStatus_ns.route('/refresh')  # used to generate refresh token
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):  # used for CREATE method of CRUD functionality
        currentUser = get_jwt_identity()
        new_access_token = create_access_token(identity=currentUser)
        return make_response(jsonify({"access_token": new_access_token}), 200)
