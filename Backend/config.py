from app import app
from flaskext.mysql import MySQL
from flask_jwt_extended import JWTManager
mydb = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'db'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['JWT_SECRET_KEY'] = '51f174a913f749dfbd7674fe690770c7'
mydb.init_app(app)
jwt = JWTManager(app)