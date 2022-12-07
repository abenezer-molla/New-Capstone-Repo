from flask_restx import Namespace, Resource, fields
from models import Patients
from flask_jwt_extended import jwt_required
from flask import request


patients_ns = Namespace('patients', description="A namespace for Patients")


patients_model = patients_ns.model(
    "Patient",
    {
        "patientid": fields.Integer(),
        "patientfirstname": fields.String(),
        "patientlastname": fields.String(),
        "address": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
        "status": fields.String(),
        "medicalnote": fields.String(),
        "diagnosisstatus": fields.String(),
        "doctorfirstname": fields.String(),
        "doctorlastname": fields.String(),
        "doctorid": fields.Integer(),
        "doctorusername": fields.String(),
    }
)


@patients_ns.route('/hello')
class HelloPatient(Resource):
    def get(self):
        return {"message": "Hello World"}


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
            status=data.get('status'),
            medicalnote=data.get('medicalnote'),
            diagnosisstatus=data.get('diagnosisstatus'),
            doctorfirstname=data.get('doctorfirstname'),
            doctorlastname=data.get('doctorlastname'),
            doctorid=data.get('doctorid'),
            doctorusername=data.get('doctorusername')
        )

        new_patient.save()

        return new_patient, 201


@patients_ns.route('/patients/<int:id>')
class PatientResource(Resource):

    @patients_ns.marshal_with(patients_model)
    def get(self, id):
        """Get a patient by id """
        patients = Patients.query.filter(Patients.patientid == id).first()

        return patients

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def put(self, id):
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
            data.get('status'),
            data.get('medicalnote'),
            data.get('diagnosisstatus'),
        )

        return patient_data_to_update

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def delete(self, id):
        """Delete a patient by id """

        patient_data_to_delete = Patients.query.filter(
            Patients.patientid == id).first()
        patient_data_to_delete.delete()
        return patient_data_to_delete
