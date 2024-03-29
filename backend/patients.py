from flask_restx import Namespace, Resource, fields
from models import Patients
from flask_jwt_extended import jwt_required
import jwt
from config import Config
from models import User
from models import ReferralHistory
from flask import request, jsonify
from datetime import datetime

referral_ns = Namespace(
    'referrals', description="A namespace for History of Referrals")

referral_model = referral_ns.model(
    "Referrals",
    {
        "id": fields.Integer(),
        "patientid": fields.Integer(),
        "patientfirstname": fields.String(),
        "patientlastname": fields.String(),
        "address": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
        "currentdepartment": fields.String(),
        "status": fields.String(),
        "medicalnote": fields.String(),
        "diagnosisstatus": fields.String(),
        "doctorfirstname": fields.String(),
        "doctorlastname": fields.String(),
        "doctorid": fields.Integer(),
        "doctorusername": fields.String(),
        "date": fields.String(),
    }
)


@referral_ns.route('/referrals')
class ReferralResource(Resource):

    @referral_ns.marshal_list_with(referral_model)
    def get(self):  # used for READ method of CRUD functionality
        """Get all patients """

        patients = Patients.query.filter(
            Patients.doctorusername != None, Patients.doctorusername != 'N/A', Patients.doctorusername != 'NA').all()

        return patients

    @referral_ns.marshal_with(referral_model)
    @referral_ns.expect(referral_model)
    def post(self):  # used for CREATE method of CRUD functionality
        """Create a new Patient Referrals History"""

        token = None

        print(request.headers.get('Authorization'))

        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(
                ' ')[1]  # extracting authorization header text

        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        current_user = User.query.filter_by(username=data['sub']).first()

        data = request.get_json()

        new_patient = ReferralHistory(
            patientid=data.get('patientid'),
            patientfirstname=data.get('patientfirstname'),
            patientlastname=data.get('patientlastname'),
            address=data.get('address'),
            gender=data.get('gender'),
            age=data.get('age'),
            department=data.get('department'),
            currentdepartment=data.get('currentdepartment'),
            status=data.get('status'),
            medicalnote=data.get('medicalnote'),
            diagnosisstatus=data.get('diagnosisstatus'),
            doctorfirstname=current_user.firstname,
            doctorlastname=current_user.lastname,
            doctorid=current_user.doctorid,
            doctorusername=data.get('doctorusername'),
            date=data.get('date')
        )

        new_patient.save()

        # the 201, is as network response to show that everything went smooth.
        return new_patient, 201


@referral_ns.route('/referrals/<int:id>')
class ReferralResource(Resource):

    @referral_ns.marshal_with(referral_model)
    def get(self, id):  # used for READ method of CRUD functionality
        """Get a Referrals by id """
        patients = ReferralHistory.query.filter(
            ReferralHistory.patientid == id).all()
        return patients


patients_ns = Namespace('patients', description="A namespace for Patients")

patients_model = patients_ns.model(
    "Patient",
    {
        "id": fields.Integer(),
        "patientid": fields.Integer(),
        "patientfirstname": fields.String(),
        "patientlastname": fields.String(),
        "address": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
        "currentdepartment": fields.String(),
        "status": fields.String(),
        "medicalnote": fields.String(),
        "diagnosisstatus": fields.String(),
        "doctorfirstname": fields.String(),
        "doctorlastname": fields.String(),
        "doctorid": fields.Integer(),
        "doctorusername": fields.String(),
        "date": fields.String(),
    }
)


@patients_ns.route('/patients/referral')
class Referral(Resource):
    @jwt_required()
    @patients_ns.marshal_list_with(patients_model)
    def get(self):  # used for READ method of CRUD functionality
        """Get all doctors """
        token = None
        print(request.headers.get('Authorization'))

        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(' ')[1]

        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        print('data', data)
        current_user = Patients.query.filter(
            Patients.doctorusername == data['sub'], Patients.diagnosisstatus != 'COMPLETE').all()
        return current_user


@patients_ns.route('/patients')
class PatientsResource(Resource):

    @patients_ns.marshal_list_with(patients_model)
    def get(self):  # used for READ method of CRUD functionality
        """Get all patients """

        patients = Patients.query.all()

        return patients

    @patients_ns.marshal_with(patients_model)
    @patients_ns.expect(patients_model)
    @jwt_required()
    def post(self):  # used for CREATE method of CRUD functionality
        """Create a new patient"""
        token = None

        print(request.headers.get('Authorization'))

        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization').split(
                ' ')[1]  # extracting the authorization text

        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        current_user = User.query.filter_by(username=data['sub']).first()
        print("current_user", current_user)

        data = request.get_json()

        new_patient = Patients(
            patientid=data.get('patientid'),
            patientfirstname=data.get('patientfirstname'),
            patientlastname=data.get('patientlastname'),
            address=data.get('address'),
            gender=data.get('gender'),
            age=data.get('age'),
            department=data.get('department'),
            currentdepartment=data.get('currentdepartment'),
            status=data.get('status'),
            medicalnote=data.get('medicalnote'),
            diagnosisstatus=data.get('diagnosisstatus'),
            doctorfirstname=current_user.firstname,
            doctorlastname=current_user.lastname,
            doctorid=current_user.doctorid,
            doctorusername=data.get('doctorusername'),
            date=data.get('date')
        )

        new_patient.save()

        # the 201, is as network response to show that everything went smooth.
        return new_patient, 201


@patients_ns.route('/patients/<int:id>')
class PatientResource(Resource):

    @patients_ns.marshal_with(patients_model)
    def get(self, id):  # used for READ method of CRUD functionality
        """Get a patient by id """
        patients = Patients.query.filter(Patients.patientid == id).all()

        return patients

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def put(self, id):  # used for PUT method of CRUD functionality
        """Update a patient by id """

        print('Here', Patients.query.all(), id)
        patient_data_to_update = Patients.query.filter(
            Patients.patientid == id).first()
        data = request.get_json()

        patient_data_to_update.update(
            data.get('patientfirstname'),
            data.get('patientlastname'),
            data.get('address'),
            data.get('gender'),
            data.get('age'),
            data.get('department'),
            data.get('currentdepartment'),
            data.get('status'),
            data.get('medicalnote'),
            data.get('diagnosisstatus'),
            data.get('doctorfirstname'),
            data.get('doctorlastname'),
            data.get('date'),
        )

        return patient_data_to_update

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def delete(self, id):  # used for DELETE method of CRUD functionality
        """Delete a patient by id """

        patient_data_to_delete = Patients.query.filter(
            Patients.patientid == id).first()
        patient_data_to_delete.delete()
        return patient_data_to_delete
