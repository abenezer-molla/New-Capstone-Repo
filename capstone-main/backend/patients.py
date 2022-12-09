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
        "date": fields.DateTime(dt_format='rfc822'),
    }
)


@referral_ns.route('/referrals')
class ReferralResource(Resource):

    @referral_ns.marshal_list_with(referral_model)
    def get(self):
        """Get all patients """

        patients = Patients.query.filter(
            Patients.doctorusername != None, Patients.doctorusername != 'N/A', Patients.doctorusername != 'NA').all()

        return patients

    @referral_ns.marshal_with(referral_model)
    @referral_ns.expect(referral_model)
    def post(self):
        """Create a new Patient Referrals History"""

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
            doctorfirstname=data.get('doctorfirstname'),
            doctorlastname=data.get('doctorlastname'),
            doctorid=data.get('doctorid'),
            doctorusername=data.get('doctorusername'),
            date=data.get('date')
        )

        new_patient.save()

        return new_patient, 201


@referral_ns.route('/referrals/<int:id>')
class ReferralResource(Resource):

    @referral_ns.marshal_with(referral_model)
    def get(self, id):
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
        "date": fields.DateTime(dt_format='rfc822'),
    }
)


@patients_ns.route('/hello')
class HelloPatient(Resource):
    def get(self):
        return {"message": "Hello World"}


@patients_ns.route('/patients/referral')
class Referral(Resource):
    @jwt_required()
    @patients_ns.marshal_list_with(patients_model)
    def get(self):
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
    def get(self):
        """Get all patients """

        patients = Patients.query.all()

        return patients

    @patients_ns.marshal_with(patients_model)
    @patients_ns.expect(patients_model)
    def post(self):
        """Create a new patient"""

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
            doctorfirstname=data.get('doctorfirstname'),
            doctorlastname=data.get('doctorlastname'),
            doctorid=data.get('doctorid'),
            doctorusername=data.get('doctorusername'),
            date=data.get('date')
        )

        new_patient.save()

        return new_patient, 201


@patients_ns.route('/patients/<int:id>')
class PatientResource(Resource):

    @patients_ns.marshal_with(patients_model)
    def get(self, id):
        """Get a patient by id """
        patients = Patients.query.filter(Patients.patientid == id).all()

        return patients

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def put(self, id):
        """Update a patient by id """
        print('Here', Patients.query.all(), id)

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def delete(self, id):
        """Delete a patient by id """

        patient_data_to_delete = Patients.query.filter(
            Patients.patientid == id).first()
        patient_data_to_delete.delete()
        return patient_data_to_delete
