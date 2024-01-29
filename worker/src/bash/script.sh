#!/bin/bash

# Verifica que se haya proporcionado una URL como argumento
if [ $# -ne 1 ]; then
    echo "Uso: $0 <URL del repositorio de GitHub>"
    exit 1
fi

random_number=$((RANDOM % 10000 + 1))

# Directorio donde se clonará el repositorio
directory="repo_$random_number"

# Clona el repositorio en el directorio generado

# Clonar el repositorio de GitHub
#echo "Clonando el repositorio desde $1..."
git clone "$1" "$directory"
if [ $? -ne 0 ]; then
    echo "Error al clonar el repositorio."
    exit 1
fi

# Entrar en el directorio del repositorio
#repo_name=$(basename "$1" .git)
cd "$directory" || exit

# Comprobar si existe el archivo setup.py
#if [ ! -f "setup.py" ]; then
#    echo "No se encontró setup.py en el repositorio."
#    exit 1
#fi

# Instalar dependencias (opcional)
#echo "Instalando dependencias..."
#pip install -r requirements.txt

# Compilar el proyecto
#echo "Compilando el proyecto..."
#python3 setup.py install

# Ejecutar el proyecto (puedes ajustar esto según cómo deba ejecutarse tu proyecto)
#echo "Ejecutando el proyecto..."
python3 main.py

# Salir del directorio del repositorio
cd ..

#echo "Eliminando el repositorio clonado..."
rm -rf "$directory"