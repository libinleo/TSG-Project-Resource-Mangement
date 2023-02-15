#Create class for Employee Table containing all the details
class Employee:
    def __init__(self,id:int, name:str, skills:str,designation:str,project:str ):
        self.id=id
        self.name=name
        self.skills=skills
        self.designation=designation
        self.project=project