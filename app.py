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
    # Ignorar peticiones de Steam
    user_agent = request.headers.get('User-Agent', '')
    if 'Valve/Steam' in user_agent:
        print(f"Ignorando petición de Steam: {user_agent}")
        return jsonify({'ok': False, 'error': 'Steam request ignored'}), 200
    
    # Redirigir peticiones POST a la ruta raíz hacia /verificar
    print(f"Headers: {dict(request.headers)}")
    print(f"Content-Type: {request.content_type}")
    print(f"Data: {request.get_data()}")
    
    try:
        data = request.json
        print(f"JSON data: {data}")
        
        if data and 'codigo' in data and 'test' in data:
            return verificar()
        else:
            print(f"Missing data - data: {data}")
            return jsonify({'ok': False, 'error': 'Datos incompletos'}), 400
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return jsonify({'ok': False, 'error': f'Error parsing JSON: {str(e)}'}), 400

@app.route('/modulo/<int:modulo_id>')
def modulo(modulo_id):
    if modulo_id < len(DATA['modulos']):
        return render_template('modulo.html', modulo=DATA['modulos'][modulo_id], modulo_id=modulo_id)
    return "Módulo no encontrado", 404

@app.route('/verificar', methods=['POST'])
def verificar():
    try:
        data = request.json
        if not data:
            return jsonify({'ok': False, 'error': 'No se recibieron datos JSON'}), 400
        
        if 'codigo' not in data or 'test' not in data:
            return jsonify({'ok': False, 'error': 'Faltan datos requeridos: codigo o test'}), 400
        
        codigo = data['codigo'].strip()
        test = data['test']
        
        # Verificar que el código no esté vacío
        if not codigo:
            return jsonify({'ok': False, 'error': 'El código está vacío'}), 400
        
        print(f"Ejecutando código: {codigo}")
        print(f"Test: {test}")
        
        # Crear un entorno limpio para ejecutar el código
        local_vars = {}
        global_vars = {
            '__builtins__': {
                'print': print,
                'len': len,
                'range': range,
                'list': list,
                'tuple': tuple,
                'set': set,
                'dict': dict,
                'str': str,
                'int': int,
                'float': float,
                'bool': bool,
                'True': True,
                'False': False,
                'None': None,
                'sum': sum,
                'max': max,
                'min': min,
                'abs': abs,
                'round': round,
                'sorted': sorted,
                'reversed': reversed,
                'enumerate': enumerate,
                'zip': zip,
                'map': map,
                'filter': filter,
                'any': any,
                'all': all,
                'isinstance': isinstance,
                'type': type,
                'dir': dir,
                'help': help,
                'id': id,
                'hash': hash,
                'ord': ord,
                'chr': chr,
                'bin': bin,
                'oct': oct,
                'hex': hex,
                'pow': pow,
                'divmod': divmod,
                'complex': complex,
                'bytes': bytes,
                'bytearray': bytearray,
                'memoryview': memoryview,
                'slice': slice,
                'property': property,
                'super': super,
                'object': object,
                'Exception': Exception,
                'BaseException': BaseException,
                'TypeError': TypeError,
                'ValueError': ValueError,
                'KeyError': KeyError,
                'IndexError': IndexError,
                'AttributeError': AttributeError,
                'NameError': NameError,
                'ZeroDivisionError': ZeroDivisionError,
                'OverflowError': OverflowError,
                'RuntimeError': RuntimeError,
                'NotImplementedError': NotImplementedError,
                'AssertionError': AssertionError,
                'ArithmeticError': ArithmeticError,
                'BufferError': BufferError,
                'LookupError': LookupError,
                'OSError': OSError,
                'IOError': IOError,
                'EOFError': EOFError,
                'ImportError': ImportError,
                'ModuleNotFoundError': ModuleNotFoundError,
                'SyntaxError': SyntaxError,
                'IndentationError': IndentationError,
                'TabError': TabError,
                'UnicodeError': UnicodeError,
                'UnicodeDecodeError': UnicodeDecodeError,
                'UnicodeEncodeError': UnicodeEncodeError,
                'UnicodeTranslateError': UnicodeTranslateError,
                'Warning': Warning,
                'UserWarning': UserWarning,
                'DeprecationWarning': DeprecationWarning,
                'PendingDeprecationWarning': PendingDeprecationWarning,
                'SyntaxWarning': SyntaxWarning,
                'RuntimeWarning': RuntimeWarning,
                'FutureWarning': FutureWarning,
                'ImportWarning': ImportWarning,
                'UnicodeWarning': UnicodeWarning,
                'BytesWarning': BytesWarning,
                'ResourceWarning': ResourceWarning,
                'ConnectionError': ConnectionError,
                'BrokenPipeError': BrokenPipeError,
                'ConnectionAbortedError': ConnectionAbortedError,
                'ConnectionRefusedError': ConnectionRefusedError,
                'ConnectionResetError': ConnectionResetError,
                'FileExistsError': FileExistsError,
                'FileNotFoundError': FileNotFoundError,
                'IsADirectoryError': IsADirectoryError,
                'NotADirectoryError': NotADirectoryError,
                'PermissionError': PermissionError,
                'ProcessLookupError': ProcessLookupError,
                'TimeoutError': TimeoutError,
                'ChildProcessError': ChildProcessError,
                'InterruptedError': InterruptedError,
                'BlockingIOError': BlockingIOError,
                'RecursionError': RecursionError,
                'MemoryError': MemoryError,
                'ReferenceError': ReferenceError,
                'SystemError': SystemError,
                'NotImplemented': NotImplemented,
                'Ellipsis': Ellipsis,
                '__debug__': __debug__,
                '__doc__': __doc__,
                '__import__': __import__,
                '__loader__': __loader__,
                '__name__': __name__,
                '__package__': __package__,
                '__spec__': __spec__,
            }
        }
        
        # Ejecutar el código del usuario
        exec(codigo, global_vars, local_vars)
        
        print(f"Variables locales después de ejecutar código: {local_vars}")
        
        # Ejecutar el test
        resultado = eval(test, global_vars, local_vars)
        
        print(f"Resultado del test: {resultado}")
        
        return jsonify({'ok': resultado})
    except KeyError as e:
        return jsonify({'ok': False, 'error': f'Error de clave: {str(e)}'}), 400
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
    app.run(debug=True, port=5001) 