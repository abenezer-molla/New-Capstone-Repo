from flask_restx import Resource, Namespace, fields
from models import User
from models import DoctorStatus
from config import Config

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
class SignUp(Resource):
    @jwt_required()
    @doctorStatus_ns.marshal_with(doctorStatus_model)
    def get(self):
        """Get all doctors """
        doctorStatus = DoctorStatus.query.all()
        return doctorStatus

    @doctorStatus_ns.expect(doctorStatus_model)
    def post(self):
        data = request.get_json()

        newUser = User(
            username=data.get('doctorusername'),
            firstname=data.get('doctorfirstname'),
            lastname=data.get('doctorlastname'),
            status=data.get('status'),
            department=data.get('department'),
            date=data.get('date'),
            doctorid=data.get('doctorid'),
        )
        newUser.save()
        return make_response(jsonify({"message": "User created/registered successfuly"}), 201)


@doctorStatus_ns.route('/refresh')  # used to generate refresh token
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        currentUser = get_jwt_identity()
        new_access_token = create_access_token(identity=currentUser)
        return make_response(jsonify({"access_token": new_access_token}), 200)
