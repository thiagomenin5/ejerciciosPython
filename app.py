from flask import Flask, render_template, request, jsonify, send_file, make_response
import json
import os

app = Flask(__name__)

with open('ejercicios.json', encoding='utf-8') as f:
    DATA = json.load(f)

@app.route('/')
def index():
    response = make_response(render_template('index.html', modulos=DATA['modulos']))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/', methods=['POST'])
def handle_post():
    # Redirigir peticiones POST a la ruta raíz hacia /verificar
    return verificar()

@app.route('/modulo/<int:modulo_id>')
def modulo(modulo_id):
    if modulo_id < len(DATA['modulos']):
        return render_template('modulo.html', modulo=DATA['modulos'][modulo_id], modulo_id=modulo_id)
    return "Módulo no encontrado", 404

@app.route('/verificar', methods=['POST'])
def verificar():
    data = request.json
    codigo = data['codigo']
    test = data['test']
    try:
        local_vars = {}
        exec(codigo, {}, local_vars)
        resultado = eval(test, {}, local_vars)
        return jsonify({'ok': resultado})
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)})

@app.route('/ejercicios.json')
def ejercicios_json():
    response = send_file('ejercicios.json', mimetype='application/json')
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    app.run(debug=True) 