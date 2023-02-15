import pymysql
from config import mydb
from flask import jsonify
from app import app

#getting project names from project table       
@app.route('/projectname', methods=['GET'])
def getprojectname():
    try:       
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT name FROM project ")
        empRows = cursor.fetchall()
        conn.commit()
        respone = jsonify(empRows)
        respone.allocation_code = 200
        return respone
    except Exception as e:
        print(e)
        return jsonify("error")
