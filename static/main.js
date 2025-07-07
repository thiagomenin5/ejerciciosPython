document.addEventListener('DOMContentLoaded', function() {
    const modulosDiv = document.getElementById('modulos');
    const contenido = document.getElementById('contenido');
    let editores = [];
    let moduloActual = null;
    let temaActual = null;

    // Ayuda de sintaxis por tema
    const ayudaSintaxis = {
        "Strings (Cadenas)": {
            "explicacion": "Los strings son secuencias de caracteres. Puedes concatenarlos, obtener su longitud, y usar métodos.",
            "ejemplos": [
                "nombre = 'Juan'",
                "apellido = 'Pérez'",
                "nombre_completo = nombre + ' ' + apellido",
                "longitud = len(nombre_completo)",
                "texto_mayuscula = texto.upper()",
                "palabras = texto.split(' ')"
            ],
            "consejos": [
                "Los strings son inmutables",
                "Usa comillas simples o dobles",
                "Métodos útiles: upper(), lower(), split(), strip()"
            ]
        },
        "Listas": {
            "explicacion": "Las listas son colecciones ordenadas y mutables. Puedes agregar, quitar, modificar elementos.",
            "ejemplos": [
                "mi_lista = [1, 2, 3, 4, 5]",
                "mi_lista.append(6)",
                "mi_lista.remove('banana')",
                "mi_lista.sort()",
                "primer_elemento = mi_lista[0]",
                "ultimo_elemento = mi_lista[-1]"
            ],
            "consejos": [
                "Los índices empiezan en 0",
                "Usa .append() para agregar al final",
                "Usa .remove() para eliminar elementos",
                "Usa .sort() para ordenar"
            ]
        },
        "Tuplas": {
            "explicacion": "Las tuplas son colecciones ordenadas e inmutables. Una vez creadas, no puedes modificar sus elementos.",
            "ejemplos": [
                "coordenadas = (10, 20)",
                "colores = ('rojo', 'verde', 'azul')",
                "persona = ('Juan', 25)",
                "nombre, edad = persona  # desempaquetado"
            ],
            "consejos": [
                "Las tuplas son inmutables",
                "Se usan para datos que no cambian",
                "Puedes desempaquetar valores",
                "Más eficientes que las listas"
            ]
        },
        "Conjuntos": {
            "explicacion": "Los conjuntos son colecciones no ordenadas de elementos únicos. No permiten duplicados.",
            "ejemplos": [
                "vocales = {'a', 'e', 'i', 'o', 'u'}",
                "numeros = {1, 2, 3, 4}",
                "union = set1.union(set2)",
                "interseccion = set1.intersection(set2)"
            ],
            "consejos": [
                "No permiten duplicados",
                "No mantienen orden",
                "Útiles para operaciones de conjunto",
                "Más rápidos para búsquedas"
            ]
        },
        "Diccionarios": {
            "explicacion": "Los diccionarios almacenan pares clave-valor. Son útiles para representar datos estructurados.",
            "ejemplos": [
                "persona = {'nombre': 'Juan', 'edad': 25}",
                "precios = {'manzana': 1.5, 'banana': 0.8}",
                "valor = precios['manzana']",
                "mi_dict = {}",
                "mi_dict['clave'] = 'valor'"
            ],
            "consejos": [
                "Las claves deben ser inmutables",
                "Acceso rápido por clave",
                "Útiles para datos estructurados",
                "Puedes anidar diccionarios"
            ]
        },
        "Funciones Básicas": {
            "explicacion": "Las funciones agrupan código reutilizable. Pueden recibir parámetros y devolver valores.",
            "ejemplos": [
                "def saludar(nombre):",
                "    return f'Hola, {nombre}'",
                "",
                "def suma(a, b):",
                "    return a + b",
                "",
                "def es_mayor_edad(edad):",
                "    return edad >= 18"
            ],
            "consejos": [
                "Usa 'def' para definir funciones",
                "La indentación es importante (4 espacios)",
                "Usa 'return' para devolver valores",
                "Puedes tener parámetros por defecto"
            ]
        },
        "Recursión": {
            "explicacion": "La recursión es cuando una función se llama a sí misma. Es útil para problemas que se pueden dividir en subproblemas.",
            "ejemplos": [
                "def factorial(n):",
                "    if n == 0:",
                "        return 1",
                "    return n * factorial(n-1)",
                "",
                "def fibonacci(n):",
                "    if n <= 1:",
                "        return n",
                "    return fibonacci(n-1) + fibonacci(n-2)"
            ],
            "consejos": [
                "Siempre necesitas un caso base",
                "Cada llamada debe acercarse al caso base",
                "Puede ser menos eficiente que iteración",
                "Útil para problemas matemáticos"
            ]
        },
        "Funciones Lambda": {
            "explicacion": "Las funciones lambda son funciones anónimas de una sola línea. Se usan para operaciones simples.",
            "ejemplos": [
                "cuadrado = lambda x: x**2",
                "es_par = lambda x: x % 2 == 0",
                "multiplicar = lambda a, b: a * b",
                "numeros = [1, 2, 3, 4, 5]",
                "cuadrados = list(map(lambda x: x**2, numeros))"
            ],
            "consejos": [
                "Solo para operaciones simples",
                "Una sola expresión",
                "Útiles como argumentos de otras funciones",
                "No pueden tener múltiples líneas"
            ]
        },
        "Manejo de Excepciones": {
            "explicacion": "El manejo de excepciones permite controlar errores en tiempo de ejecución.",
            "ejemplos": [
                "try:",
                "    resultado = 10 / 0",
                "except ZeroDivisionError:",
                "    resultado = 'Error: División por cero'",
                "",
                "try:",
                "    numero = int('abc')",
                "except ValueError:",
                "    numero = 'Error: No es un número'"
            ],
            "consejos": [
                "Usa try/except para capturar errores",
                "Especifica el tipo de excepción",
                "Maneja solo las excepciones que esperas",
                "No uses except sin especificar tipo"
            ]
        },
        "Clases y Objetos": {
            "explicacion": "La POO organiza el código en clases que representan objetos del mundo real.",
            "ejemplos": [
                "class Persona:",
                "    def __init__(self, nombre, edad):",
                "        self.nombre = nombre",
                "        self.edad = edad",
                "    ",
                "    def saludar(self):",
                "        return f'Hola, soy {self.nombre}'",
                "",
                "p = Persona('Juan', 25)"
            ],
            "consejos": [
                "Usa 'class' para definir clases",
                "__init__ es el constructor",
                "self se refiere a la instancia",
                "Los métodos deben tener self como primer parámetro"
            ]
        },
        "Herencia": {
            "explicacion": "La herencia permite crear clases que heredan atributos y métodos de otras clases.",
            "ejemplos": [
                "class Animal:",
                "    def __init__(self, nombre):",
                "        self.nombre = nombre",
                "    ",
                "    def hacer_sonido(self):",
                "        return 'Sonido'",
                "",
                "class Perro(Animal):",
                "    def hacer_sonido(self):",
                "        return 'Guau'"
            ],
            "consejos": [
                "Usa paréntesis para heredar",
                "Puedes sobrescribir métodos",
                "super() llama al método de la clase padre",
                "Promueve la reutilización de código"
            ]
        },
        "Polimorfismo": {
            "explicacion": "El polimorfismo permite que diferentes clases respondan de manera diferente al mismo método.",
            "ejemplos": [
                "class Forma:",
                "    def area(self):",
                "        pass",
                "",
                "class Circulo(Forma):",
                "    def area(self):",
                "        return 3.14 * self.radio**2",
                "",
                "class Cuadrado(Forma):",
                "    def area(self):",
                "        return self.lado**2"
            ],
            "consejos": [
                "Mismo método, diferentes implementaciones",
                "Se logra con herencia y sobrescritura",
                "Permite código más flexible",
                "Facilita la extensibilidad"
            ]
        },
        "Encapsulamiento": {
            "explicacion": "El encapsulamiento protege los datos y métodos de una clase.",
            "ejemplos": [
                "class CuentaBancaria:",
                "    def __init__(self, saldo):",
                "        self.__saldo = saldo  # privado",
                "    ",
                "    def depositar(self, monto):",
                "        self.__saldo += monto",
                "    ",
                "    def obtener_saldo(self):",
                "        return self.__saldo"
            ],
            "consejos": [
                "_atributo = protegido",
                "__atributo = privado",
                "Controla el acceso a los datos",
                "Mejora la seguridad del código"
            ]
        },
        "Magic Methods": {
            "explicacion": "Los Magic Methods permiten definir cómo se comportan los objetos con operadores.",
            "ejemplos": [
                "class Punto:",
                "    def __init__(self, x, y):",
                "        self.x = x",
                "        self.y = y",
                "    ",
                "    def __str__(self):",
                "        return f'Punto({self.x}, {self.y})'",
                "    ",
                "    def __add__(self, otro):",
                "        return Punto(self.x + otro.x, self.y + otro.y)"
            ],
            "consejos": [
                "Empiezan y terminan con __",
                "__init__ es el constructor",
                "__str__ para representación en string",
                "__add__ para suma de objetos"
            ]
        },
        "Juego de Consola": {
            "explicacion": "Práctica final aplicando todos los conceptos de POO aprendidos.",
            "ejemplos": [
                "import random",
                "",
                "class Juego:",
                "    def __init__(self):",
                "        self.numero = random.randint(1, 100)",
                "    ",
                "    def jugar(self):",
                "        # lógica del juego",
                "        pass"
            ],
            "consejos": [
                "Usa todas las técnicas de POO",
                "Implementa herencia y polimorfismo",
                "Aplica encapsulamiento",
                "Usa Magic Methods cuando sea apropiado"
            ]
        },
        "Evaluación de Estructuras de Datos": {
            "explicacion": "Demuestra tu dominio de todas las estructuras de datos de Python.",
            "ejemplos": [
                "def procesar_datos(nombres):",
                "    return {nombre: len(nombre) for nombre in nombres}",
                "",
                "def filtrar_pares(numeros):",
                "    return tuple(n for n in numeros if n % 2 == 0)",
                "",
                "def contar_vocales(texto):",
                "    vocales = {'a', 'e', 'i', 'o', 'u'}",
                "    return {v: texto.lower().count(v) for v in vocales}"
            ],
            "consejos": [
                "Combina diferentes estructuras",
                "Usa comprensiones de listas/diccionarios",
                "Optimiza el rendimiento",
                "Maneja casos edge"
            ]
        },
        "Evaluación de Funciones": {
            "explicacion": "Demuestra tu comprensión de funciones avanzadas y manejo de errores.",
            "ejemplos": [
                "def invertir_lista(lista):",
                "    if len(lista) <= 1:",
                "        return lista",
                "    return [lista[-1]] + invertir_lista(lista[:-1])",
                "",
                "es_palindromo = lambda texto: texto.lower() == texto.lower()[::-1]",
                "",
                "def dividir_lista(lista, divisor):",
                "    try:",
                "        return [x / divisor for x in lista]",
                "    except ZeroDivisionError:",
                "        return 'Error: División por cero'"
            ],
            "consejos": [
                "Combina recursión y iteración",
                "Usa lambdas para operaciones simples",
                "Maneja excepciones apropiadamente",
                "Optimiza el rendimiento"
            ]
        },
        "Evaluación de POO": {
            "explicacion": "Demuestra tu dominio completo de Programación Orientada a Objetos.",
            "ejemplos": [
                "class Biblioteca:",
                "    def __init__(self):",
                "        self.libros = []",
                "    ",
                "    def agregar_libro(self, libro):",
                "        self.libros.append(libro)",
                "    ",
                "    def buscar_libro(self, titulo):",
                "        for libro in self.libros:",
                "            if libro.titulo == titulo:",
                "                return libro",
                "        return None"
            ],
            "consejos": [
                "Diseña clases bien estructuradas",
                "Implementa herencia apropiadamente",
                "Usa encapsulamiento para proteger datos",
                "Aplica polimorfismo cuando sea útil"
            ]
        },
        "Proyecto Final Integrador": {
            "explicacion": "Proyecto final que integra todos los conocimientos del curso.",
            "ejemplos": [
                "class SistemaEducativo:",
                "    def __init__(self):",
                "        self.estudiantes = []",
                "    ",
                "    def agregar_estudiante(self, estudiante):",
                "        if estudiante not in self.estudiantes:",
                "            self.estudiantes.append(estudiante)",
                "    ",
                "    def obtener_promedio_general(self):",
                "        if not self.estudiantes:",
                "            return 0",
                "        return sum(e.promedio() for e in self.estudiantes) / len(self.estudiantes)"
            ],
            "consejos": [
                "Integra todos los conceptos aprendidos",
                "Usa estructuras de datos apropiadas",
                "Implementa manejo de excepciones",
                "Aplica principios de POO",
                "Optimiza el rendimiento"
            ]
        }
    };

    window.abrirModulo = function(moduloId) {
        fetch('/ejercicios.json').then(r => r.json()).then(json => {
            const modulo = json.modulos[moduloId];
            moduloActual = moduloId;
            renderModulo(modulo, moduloId);
        });
    }

    function renderModulo(modulo, moduloId) {
        modulosDiv.classList.add('oculto');
        contenido.classList.remove('oculto');
        
        let html = `
            <h2>📚 ${modulo.nombre}</h2>
            <p style="color: #666; margin-bottom: 20px;">${modulo.descripcion}</p>
            <div style="margin-bottom: 20px;">
                <button onclick="volverAModulos()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">⬅️ Volver a Módulos</button>
            </div>
            <h3>🎯 Temas del Módulo:</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 30px;">
        `;
        
        modulo.temas.forEach((tema, i) => {
            html += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #f8f9fa; cursor: pointer;" onclick="abrirTema(${moduloId}, ${i})">
                    <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${tema.nombre}</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9em;">${tema.teoria.substring(0, 100)}...</p>
                    <div style="margin-top: 10px; color: #3498db; font-size: 0.8em;">📝 ${tema.ejercicios.length} ejercicios</div>
                </div>
            `;
        });
        
        html += '</div>';
        contenido.innerHTML = html;
    }

    window.abrirTema = function(moduloId, temaId) {
        fetch('/ejercicios.json').then(r => r.json()).then(json => {
            const modulo = json.modulos[moduloId];
            const tema = modulo.temas[temaId];
            temaActual = temaId;
            renderTema(tema, moduloId, temaId);
        });
    }

    function renderTema(tema, moduloId, temaId) {
        contenido.classList.remove('oculto');
        
        let html = `
            <h2>📚 ${tema.nombre}</h2>
            <div style="margin-bottom: 20px;">
                <button onclick="abrirModulo(${moduloId})" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">⬅️ Volver al Módulo</button>
            </div>
            <div style="background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #17a2b8;">
                <h3>Teoría:</h3>
                <p>${tema.teoria}</p>
            </div>
        `;

        // Agregar ayuda de sintaxis si existe
        if (ayudaSintaxis[tema.nombre]) {
            const ayuda = ayudaSintaxis[tema.nombre];
            html += `
                <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #007bff;">
                    <h3>💡 Ayuda de Sintaxis:</h3>
                    <p><strong>${ayuda.explicacion}</strong></p>
                    <h4>Ejemplos:</h4>
                    ${ayuda.ejemplos.map(ej => `<div style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; margin: 5px 0;">${ej}</div>`).join('')}
                    <h4>Consejos:</h4>
                    <ul>
                        ${ayuda.consejos.map(consejo => `<li>${consejo}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        tema.ejercicios.forEach((ej, i) => {
            html += `
                <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background: #fafafa;">
                    <h3>🎯 Ejercicio ${i+1}</h3>
                    <p><strong>Enunciado:</strong> ${ej.enunciado}</p>
                    <div style="margin: 15px 0;">
                        <textarea id="codigo${i}"></textarea>
                    </div>
                    <button onclick="verificarEjercicio(${moduloId}, ${temaId}, ${i})" style="margin: 10px 5px 10px 0; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">✅ Verificar</button>
                    <button onclick="limpiarEditor(${i})" style="margin: 10px 5px 10px 0; padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Limpiar</button>
                    <div id="resultado${i}"></div>
                </div>
            `;
        });
        
        contenido.innerHTML = html;

        // Inicializar editores CodeMirror
        setTimeout(() => {
            tema.ejercicios.forEach((ej, i) => {
                const textarea = document.getElementById('codigo'+i);
                const editor = CodeMirror.fromTextArea(textarea, {
                    mode: 'python',
                    theme: 'monokai',
                    lineNumbers: true,
                    indentUnit: 4,
                    tabSize: 4,
                    lineWrapping: true,
                    extraKeys: {
                        "Tab": function(cm) {
                            cm.replaceSelection("    ", "end");
                        }
                    }
                });
                editores.push(editor);
            });
        }, 100);
    }

    window.verificarEjercicio = function(moduloId, temaId, indiceEj) {
        fetch('/ejercicios.json').then(r => r.json()).then(json => {
            const modulo = json.modulos[moduloId];
            const tema = modulo.temas[temaId];
            const ejercicio = tema.ejercicios[indiceEj];
            const editor = editores[indiceEj];
            const codigo = editor.getValue();
            
            const resultado = document.getElementById('resultado'+indiceEj);
            resultado.innerHTML = '<em>Verificando...</em>';
            
            fetch('/verificar', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({codigo: codigo, test: ejercicio.test})
            })
            .then(r => r.json())
            .then(res => {
                if(res.ok) {
                    resultado.innerHTML = '✅ <span style="color: #28a745; font-weight: bold;">¡Correcto! Tu código funciona perfectamente.</span>';
                } else {
                    resultado.innerHTML = `❌ <span style="color: #dc3545; font-weight: bold;">Incorrecto. ${res.error ? 'Error: ' + res.error : 'Revisa tu código.'}</span>`;
                }
            })
            .catch(err => {
                resultado.innerHTML = '❌ <span style="color: #dc3545; font-weight: bold;">Error de conexión. Intenta de nuevo.</span>';
            });
        });
    }

    window.limpiarEditor = function(indiceEj) {
        const editor = editores[indiceEj];
        editor.setValue('');
        document.getElementById('resultado'+indiceEj).innerHTML = '';
    }

    window.volverAModulos = function() {
        contenido.classList.add('oculto');
        modulosDiv.classList.remove('oculto');
        // Limpiar editores
        editores.forEach(editor => {
            if (editor) editor.toTextArea();
        });
        editores = [];
        moduloActual = null;
        temaActual = null;
    }
}); 