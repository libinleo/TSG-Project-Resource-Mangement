#Create class for project Table containing all the details
class Project:
    def __init__(self,id:int,name:str,start_date:str,department:str,manager:str ):
        self.id=id
        self.name=name
        self.start_date=start_date
        self.department=department
        self.manager=manager