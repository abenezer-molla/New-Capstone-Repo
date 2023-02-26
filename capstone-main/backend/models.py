from datetime import datetime
from exts import db

# Table that stored the very important data of each user.


class Patients(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=True)
    patientid = db.Column(db.Integer, nullable=True)
    patientfirstname = db.Column(db.String(80), nullable=False)
    patientlastname = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.String(80), nullable=False)
    department = db.Column(db.String(80), nullable=False)
    currentdepartment = db.Column(db.String(80), nullable=True)
    status = db.Column(db.String(80), nullable=False)
    medicalnote = db.Column(db.String(), nullable=False)
    diagnosisstatus = db.Column(db.String(80), nullable=False)
    doctorfirstname = db.Column(
        db.String(80), nullable=True)
    doctorlastname = db.Column(
        db.String(80), nullable=True)
    doctorid = db.Column(db.Integer, nullable=False)
    doctorusername = db.Column(
        db.String(80), nullable=True)
    date = db.Column(
        db.String(80))

    def __repr__(self):
        return f"<PatientID =  {self.patientid} >"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, patientfirstname, patientlastname, address, gender, age, department, currentdepartment, status, medicalnote, diagnosisstatus, doctorfirstname, doctorlastname, date):
        self.patientfirstname = patientfirstname
        self.patientlastname = patientlastname
        self.address = address
        self.gender = gender
        self.age = age
        self.department = department
        self.currentdepartment = currentdepartment
        self.status = status
        self.medicalnote = medicalnote
        self.diagnosisstatus = diagnosisstatus
        self.doctorfirstname = doctorfirstname
        self.doctorlastname = doctorlastname
        self.date = date

        db.session.commit()


class DoctorStatus(db.Model):
    __tablename__ = 'DoctorStatus'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=True)
    doctorid = db.Column(db.Integer, db.ForeignKey('user.doctorid'))
    doctorfirstname = db.Column(db.String(80), nullable=False)
    doctorlastname = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    department = db.Column(db.String(80), nullable=False)
    doctorusername = db.Column(
        db.String(80), nullable=True)
    date = db.Column(
        db.String(80))

    def __repr__(self):
        return f"<User {self.doctorusername}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class ReferralHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    patientid = db.Column(db.Integer, nullable=False)
    patientfirstname = db.Column(db.String(80), nullable=False)
    patientlastname = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    department = db.Column(db.String(80), nullable=False)
    currentdepartment = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    medicalnote = db.Column(db.String(), nullable=False)
    diagnosisstatus = db.Column(db.String(80), nullable=False)
    doctorfirstname = db.Column(
        db.String(80), nullable=False)
    doctorlastname = db.Column(
        db.String(80), nullable=False)
    doctorid = db.Column(db.Integer, nullable=False)
    doctorusername = db.Column(
        db.String(80), nullable=False)
    date = db.Column(
        db.String(80))

    def __repr__(self):
        return f"<PatientID =  {self.patientid} >"

    def save(self):
        db.session.add(self)
        db.session.commit()

        db.session.commit()


class User(db.Model):
    doctorid = db.Column(db.Integer, primary_key=True, unique=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    address = db.Column(db.String(80), nullable=False)
    level = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.String(80), nullable=False)
    department = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, level, address, gender, age, department):
        self.address = address
        self.level = level
        self.gender = gender
        self.age = age
        self.department = department

        db.session.commit()
