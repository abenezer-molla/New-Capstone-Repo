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
        "level": fields.String(),
        "gender": fields.String(),
        "age": fields.Integer(),
        "department": fields.String(),
        "status": fields.String(),
        "medicalnote": fields.String(),
        "diagnosisstatus": fields.String(),
        "doctorusername": fields.String(),
        "doctorid": fields.Integer(),
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
    @jwt_required()
    def post(self):
        """Create a new patient"""

        data = request.get_json()

        new_patient = Patients(

            patientid=data.get('patientid'),
            patientfirstname=data.get('patientfirstname'),
            patientlastname=data.get('patientlastname'),
            address=data.get('address'),
            level=data.get('level'),
            gender=data.get('gender'),
            age=data.get('age'),
            department=data.get('department'),
            status=data.get('status'),
            medicalnote=data.get('medicalnote'),
            diagnosisstatus=data.get('diagnosisstatus'),
            doctorusername=data.get('doctorusername'),
            doctorid=data.get('doctorid')
        )

        new_patient.save()

        return new_patient, 201


@patients_ns.route('/patients/<int:id>')
class PatientResource(Resource):

    @patients_ns.marshal_with(patients_model)
    def get(self, patientid):
        """Get a patient by id """
        patients = Patients.query.get_or_404(id)

        return patients

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def put(self, id):
        """Update a patient by id """

        patient_data_to_update = Patients.query.get_or_404(id)

        data = request.get_json()

        patient_data_to_update.update(
            data.get('title'), data.get('description'))

        return patient_data_to_update

    @patients_ns.marshal_with(patients_model)
    @jwt_required()
    def delete(self, id):
        """Delete a patient by id """

        patient_data_to_delete = Patients.query.get_or_404(id)
        patient_data_to_delete.delete()
        return patient_data_to_delete
