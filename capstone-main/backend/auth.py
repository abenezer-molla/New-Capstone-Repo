from flask_restx import Resource, Namespace, fields
from models import User
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
auth_ns = Namespace('auth', description="A namespace for Authentication")

signup_model = auth_ns.model(

    'SignUp',
    {
        "firstname": fields.String(),
        "lastname": fields.String(),
        "username": fields.String(),
        "email": fields.String(),
        "address": fields.String(),
        "password": fields.String(),
        "level": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
    }
)

doctors_model = auth_ns.model(

    'Doctors',
    {
        "firstname": fields.String(),
        "lastname": fields.String(),
        "username": fields.String(),
        "email": fields.String(),
        "address": fields.String(),
        "password": fields.String(),
        "level": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
        "doctorid": fields.Integer(),
    }
)

login_model = auth_ns.model(
    'Login',
    {
        'username': fields.String(),
        'password': fields.String()
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


@auth_ns.route('/doctors')
class SignUp(Resource):
    @jwt_required()
    @auth_ns.marshal_with(doctors_model)
    def get(self):
        """Get all doctors """
        doctors = User.query.all()
        return doctors

    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')

        currentUser = User.query.filter_by(username=username).first()

        if currentUser is not None:  # it means it has already been registered
            return jsonify({"message": f"User with username {username} already exists"})

        newUser = User(
            username=data.get('username'),
            email=data.get('email'),
            firstname=data.get('firstname'),
            lastname=data.get('lastname'),
            address=data.get('address'),
            level=data.get('level'),
            gender=data.get('gender'),
            age=data.get('age'),
            department=data.get('department'),
            doctorid=data.get('doctorid'),
            password=generate_password_hash(data.get('password'))
        )  # assigning the values from the UI input into the respective db values.

        newUser.save()
        return make_response(jsonify({"message": "User created/registered successfuly"}), 201)


@auth_ns.route('/doctors/<department>')
class DoctorByDepartmentResource(Resource):

    @auth_ns.marshal_with(doctors_model)
    def get(self, department):
        """ Get a doctors by department """
        doctor = User.query.filter(User.department == department).all()
        print(doctor)
        return doctor


@auth_ns.route('/doctors/<int:id>')
class DoctorResource(Resource):

    @auth_ns.marshal_with(doctors_model)
    def get(self, id):
        """Get a doctor by id """
        doctor = User.query.filter(User.doctorid == id).first()

        return [doctor]

    @auth_ns.marshal_with(doctors_model)
    @jwt_required()
    def put(self, id):
        """Update a doctor by id """

        doctor_data_to_update = User.query.filter(
            User.doctorid == id).first()

        print('doctor_data_to_update', doctor_data_to_update)

        data = request.get_json()

        doctor_data_to_update.update(
            address=data.get('address'),
            level=data.get('level'),
            gender=data.get('gender'),
            age=data.get('age'),
            department=data.get('department'),
        )

        return doctor_data_to_update

    @auth_ns.marshal_with(doctors_model)
    @jwt_required()
    def delete(self, id):
        """Delete a doctor by id """

        doctor_data_to_delete = User.query.filter(
            User.doctorid == id).first()
        doctor_data_to_delete.delete()
        return doctor_data_to_delete


@auth_ns.route('/login')  # function for Login user
class Login(Resource):

    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        doctorid = data.get('doctorid')
        password = data.get('password')
        currentUser = User.query.filter_by(username=username).first()

        # checking the password given with the one that is hashed ans stored!
        if currentUser and check_password_hash(currentUser.password, password):
            # access will only be given once the password sorted and given matches
            access_token = create_access_token(identity=currentUser.username)
            refresh_token = create_refresh_token(identity=currentUser.username)
            return jsonify(
                {"access_token": access_token, "refresh_token": refresh_token}
            )
        else:
            return jsonify({"message": "Invalid username and/or password"})


@auth_ns.route('/refresh')  # used to generate refresh token
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        currentUser = get_jwt_identity()
        new_access_token = create_access_token(identity=currentUser)
        return make_response(jsonify({"access_token": new_access_token}), 200)
