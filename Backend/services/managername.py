import pymysql
from config import mydb
from flask import jsonify
from app import app

#for getting the fullname of managers from the user table        
@app.route('/manager', methods=['GET'])
def getmanager():
    try:       
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT fullname FROM user where roleid='2'")
        empRows = cursor.fetchall()
        conn.commit()
        respone = jsonify(empRows)
        respone.allocation_code = 200
        return respone
    except Exception as e:
        print(e)
        return jsonify("error")
