import unittest
from main import create_app
from config import TestConfig
from exts import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/patients/hello')

        json = hello_response.json

        # print(json)
        self.assertEqual(json, {"message": "Hello World"})

    def test_signup(self):
        signup_response = self.client.post('/auth/doctors',
                                           json={
                                               "firstname": "string",
                                               "lastname": "string",
                                               "username": "string",
                                               "email": "string",
                                               "address": "string",
                                               "password": "string",
                                               "level": "string",
                                               "gender": "string",
                                               "age": 0,
                                               "department": "string"
                                           }
                                           )

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    def test_login(self):
        signup_response = self.client.post('/auth/doctors',
                                           json={
                                               "firstname": "string",
                                               "lastname": "string",
                                               "username": "string",
                                               "email": "string",
                                               "address": "string",
                                               "password": "string",
                                               "level": "string",
                                               "gender": "string",
                                               "age": 0,
                                               "department": "string"
                                           }
                                           )

        login_response = self.client.post(
            'auth/login',
            json={
                "username": "string",
                "password": "string"
            }
        )

        status_code = login_response.status_code

        json = login_response.json

        # print(json)

        self.assertEqual(status_code, 200)

    def test_get_all_patients(self):
        """TEST GETTING ALL Patients"""
        response = self.client.get('/patients/patients')

        # print(response.json)

        status_code = response.status_code

        self.assertEqual(status_code, 200)

    def test_get_one_patient(self):
        id = 1
        response = self.client.get(f'/patients/patients/{id}')

        status_code = response.status_code
        # print(status_code)

        self.assertEqual(status_code, 404)

    def test_create_patientdata(self):
        signup_response = self.client.post('/patients/doctors',
                                           json={
                                               "id": 0,
                                               "patientid": 0,
                                               "patientfirstname": "string",
                                               "patientlastname": "string",
                                               "address": "string",
                                               "gender": "string",
                                               "age": 0,
                                               "department": "string",
                                               "currentdepartment": "string",
                                               "status": "string",
                                               "medicalnote": "string",
                                               "diagnosisstatus": "string",
                                               "doctorfirstname": "string",
                                               "doctorlastname": "string",
                                               "doctorid": 0,
                                               "doctorusername": "string",
                                               "date": "string"
                                           }
                                           )

        login_response = self.client.post(
            'auth/login',
            json={
                "username": "string",
                "password": "string"
            }
        )

        access_token = login_response.json["access_token"]

    def test_update_recipe(self):
        signup_response = self.client.post('/auth/doctors',
                                           json={
                                               "id": 0,
                                               "patientid": 0,
                                               "patientfirstname": "string",
                                               "patientlastname": "string",
                                               "address": "string",
                                               "gender": "string",
                                               "age": 0,
                                               "department": "string",
                                               "currentdepartment": "string",
                                               "status": "string",
                                               "medicalnote": "string",
                                               "diagnosisstatus": "string",
                                               "doctorfirstname": "string",
                                               "doctorlastname": "string",
                                               "doctorid": 0,
                                               "doctorusername": "string",
                                               "date": "string"
                                           }
                                           )

        login_response = self.client.post(
            'auth/login',
            json={
                "username": "string",
                "password": "string"
            }
        )

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post(
            '/patients/patients',
            json={
                "doctorfirstname": "BEN",
                "doctorlastname": "TEN",
            },
            headers={
                "Authorization": f"Bearer {access_token}"}
        )

        status_code = create_recipe_response.status_code

        id = 1

        update_response = self.client.put(
            f'recipe/recipe/{id}',
            json={
                "doctorfirstname": "BEN",
                "doctorlastname": "TEN",
            },
            headers={"Authorization": f"Bearer {access_token}"}
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_recipe(self):
        signup_response = self.client.post('/auth/doctors',
                                           json={"username": "testuser",
                                                 "email": "testuser@test.com",
                                                 "password": "password"}
                                           )

        login_response = self.client.post(
            'auth/login',
            json={
                "username": "testuser",
                "password": "password"
            }
        )

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post(
            '/recipe/recipes',
            json={
                "id": 0,
                "patientid": 0,
                "patientfirstname": "string",
                "patientlastname": "string",
                "address": "string",
                "gender": "string",
                "age": 0,
                "department": "string",
                "currentdepartment": "string",
                "status": "string",
                "medicalnote": "string",
                "diagnosisstatus": "string",
                "doctorfirstname": "string",
                "doctorlastname": "string",
                "doctorid": 0,
                "doctorusername": "string",
                "date": "string"
            },
            headers={
                "Authorization": f"Bearer {access_token}"}
        )

        id = 1
        delete_response = self.client.delete(
            f'/patients/patients/{id}',
            headers={
                "Authorization": f"Bearer {access_token}"}
        )

        status_code = delete_response.status_code

        print(delete_response.json)

        self.assertEqual(status_code, 200)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()
