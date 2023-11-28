from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from models import  User, Task

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo'

mysql = MySQL(app)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/cadastro', methods=['POST'])
def cadastrar_usuario():
    if request.method == 'POST':
        nome = request.form.get('nome')
        email = request.form.get('email')
        senha = request.form.get('senha')

        user = User(email, nome, senha)

        try:
            cursor = mysql.connection.cursor()
            cursor.execute(f"""INSERT INTO USERS VALUES('{user.nome[0]}', '{user.email[0]}', '{user.senha}')""")
            mysql.connection.commit()
            cursor.close()

            print(f'Nome: {nome}, Email: {email}, Senha: {senha}')

            return jsonify({"status": "success", "message": "Usuário cadastrado com sucesso!"})
        except Exception as Error:
            return jsonify({"status": "error", "message": f"{Error}"}), 500
        

        
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        senha = request.form.get('senha')

        cursor = mysql.connection.cursor()
        cursor.execute(f"SELECT * FROM USERS WHERE email = '{email}'")
        user_data = cursor.fetchone()
        cursor.close()
        
        if user_data[0] == email and user_data[2] == senha:  
            return jsonify({"status": "success", "message": "Login efetuado!", }), 200
        else:
            return jsonify({"status": "failed", "message": "Não Autorizado!"}), 401
        
        

@app.route('/todo/post', methods=['POST'])
def todo():
    if request.method == 'POST':
        email = request.form.get('email')
        descricao = request.form.get('descricao')
        status = request.form.get('status')
        
        task = Task(email, descricao, status)
        
        try:
            cursor = mysql.connection.cursor()
            print(task.user_email, task.descricao, task.status)
            cursor.execute('SET FOREIGN_KEY_CHECKS=0')

            insert_query = "INSERT INTO tasks (email_user, descricao, status) VALUES (%s, %s, %s)"
            insert_values = (task.user_email, task.descricao, task.status)

            cursor.execute(insert_query, insert_values)

            mysql.connection.commit()
            
            cursor.close()

        
            return jsonify({"status": "success", "message": "Tarefa cadastrada com sucesso!"})
        except Exception as Error:
            return jsonify({"status": "error", "message": f"{Error}"}), 500
        
        
@app.route('/todo/<email>', methods=['GET'])
def listTodo(email):
    if request.method == 'GET':
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT * FROM tasks where email_user = '%s'" % email
            cursor.execute(query)
            todos = cursor.fetchall()
            result = []
            print(email)
            for row in todos:
                print(row)
                dicionario = {"id":row[0], "email":row[1], "descricao":row[2], "status":row[3]}
                result.append(dicionario)
            return jsonify({'tasks':result})
        except Exception as Error:
            return jsonify({"status": "error", "message": f"{Error}"}), 500

if __name__ == "__main__":
    app.run(debug=True)