# 🐍 Plataforma de Ejercicios - Curso Digital House Python

Una plataforma interactiva para practicar ejercicios de Python específicamente diseñada para el curso de Digital House.

## 📋 Características

- **Ejercicios por tema**: Cada módulo del curso tiene sus propios ejercicios
- **Validación automática**: El sistema verifica tu código automáticamente
- **Ayuda de sintaxis**: Ejemplos y consejos específicos para cada tema
- **Editor con resaltado**: Editor de código con sintaxis de Python
- **Progresión estructurada**: Ejercicios organizados según el curso

## 🎯 Temas Incluidos

### Módulo 1 - Introducción
- Conceptos básicos de Python
- Variables y tipos de datos

### Módulo 2 - Estructuras de Datos
- **Strings (Cadenas)**: Concatenación, métodos, manipulación
- **Listas**: Agregar, quitar, ordenar elementos
- **Tuplas**: Colecciones inmutables
- **Conjuntos**: Elementos únicos, operaciones de conjunto
- **Diccionarios**: Pares clave-valor

### Módulo 3 - Funciones de Python
- **Funciones Básicas**: Definición, parámetros, return
- **Recursión**: Funciones que se llaman a sí mismas
- **Funciones Lambda**: Funciones anónimas
- **Manejo de Excepciones**: try/except, control de errores

### Módulo 4 - Programación Orientada a Objetos
- **Clases y Objetos**: Definición de clases, atributos, métodos
- **Herencia**: Clases que heredan de otras
- **Magic Methods**: Métodos especiales (__init__, __str__, etc.)

## 🚀 Cómo usar

1. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Ejecutar la aplicación**:
   ```bash
   python app.py
   ```

3. **Abrir en el navegador**:
   Ve a [http://localhost:5000](http://localhost:5000)

4. **Practicar**:
   - Selecciona un tema
   - Lee la teoría y ejemplos
   - Resuelve los ejercicios
   - Verifica tu código

## 📁 Estructura del Proyecto

```
mi_app_ejercicios/
├── app.py              # Aplicación Flask principal
├── ejercicios.json     # Ejercicios y temas
├── requirements.txt    # Dependencias
├── templates/
│   └── index.html      # Página web principal
├── static/
│   └── main.js         # Lógica del frontend
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Usadas

- **Backend**: Python + Flask
- **Frontend**: HTML + JavaScript + CodeMirror
- **Editor**: CodeMirror con resaltado de sintaxis Python
- **Validación**: Ejecución segura de código Python

## 📝 Agregar Nuevos Ejercicios

Para agregar nuevos ejercicios, edita el archivo `ejercicios.json`:

```json
{
  "nombre": "Nuevo Tema",
  "teoria": "Explicación del tema",
  "ejercicios": [
    {
      "enunciado": "Descripción del ejercicio",
      "test": "código_python_para_verificar"
    }
  ]
}
```

## 🎓 Consejos para Aprender

1. **Practica regularmente**: Dedica tiempo diario a los ejercicios
2. **Lee la teoría**: Antes de resolver, entiende los conceptos
3. **Usa la ayuda**: Revisa los ejemplos y consejos
4. **Experimenta**: Modifica el código y prueba diferentes soluciones
5. **Progresión**: Completa los temas en orden para mejor comprensión

## 🔧 Personalización

- **Agregar temas**: Edita `ejercicios.json`
- **Cambiar estilos**: Modifica el CSS en `templates/index.html`
- **Mejorar validación**: Edita la función de verificación en `app.py`

¡Disfruta aprendiendo Python con esta plataforma interactiva! 🐍✨ 