import unittest
from unittest.mock import Mock
from flask import Flask
from services.project import addAudio
app = Flask(__name__)
#Test case for add project 
class TestDemo(unittest.TestCase):
    def setUp(self):
        self.id = 1
        self.name = "movie management"
        self.start_date = "25/02/2023"
        self.department = "tsg"
        self.manager = "Reshma"
        self.request = Mock(method='POST')
    def test_demo_success(self):
        with app.app_context():
            response = addAudio(self.id, self.name, self.start_date, self.department, self.manager,self.request)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.get_json(), {"message": "project added successfully!"})
    def test_demo_missing_params(self):
        with app.app_context():
            response = addAudio(self.id, "", "", "", "","", self.request)
            self.assertEqual(response.get_json(), {"message": "All fields are required"})
if __name__ == '__main__':
    unittest.main()