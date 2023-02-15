#Create class for user Table containing all the details
class User:
    def __init__(self,id:int,fullname:str,username:int,password:str,roleid:int ):
        self.id=id
        self.fullname=fullname
        self.username=username
        self.password=password
        self.roleid=roleid