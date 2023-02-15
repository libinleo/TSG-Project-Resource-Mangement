from app import app
from services.employee import *
from services.auth import *
from services.project import *
from services.role import *
from services.managername import *
from services.projectname import *
from services.logger import *
if __name__ == "__main__":  
    app.run(debug=True)