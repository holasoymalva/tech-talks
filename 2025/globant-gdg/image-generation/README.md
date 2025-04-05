# 🎨 AI Image Generation App

Una aplicación web construida con Streamlit que permite generar imágenes usando la API de Stable Diffusion XL.

## 🚀 Características

- Interfaz de usuario intuitiva y amigable
- Generación de imágenes a partir de descripciones textuales
- Soporte para prompts negativos
- Múltiples opciones de dimensiones de imagen
- Configuración personalizable de pasos de generación
- Descarga directa de imágenes generadas
- Interfaz completamente en español

## 📋 Requisitos Previos

- Python 3.7 o superior
- Una API key de Stable Diffusion (puedes obtenerla en [stability.ai](https://stability.ai))

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/holasoymalva/ai-image-generation.git
cd ai-image-generation
```

2. Crea y activa un entorno virtual:

En Windows:
```bash
python -m venv venv
.\venv\Scripts\activate
```

En macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Crea un archivo `.env` basado en el ejemplo:
```bash
cp .env.example .env
```

5. Edita el archivo `.env` y añade tu API key de Stable Diffusion:
```
STABILITY_API_KEY=tu_api_key_aqui
```

## 💻 Uso

1. Inicia la aplicación:
```bash
streamlit run app.py
```

2. Abre tu navegador y ve a `http://localhost:8501`

3. En la interfaz:
   - Ingresa tu API key de Stable Diffusion en la barra lateral
   - Escribe una descripción de la imagen que deseas generar
   - (Opcional) Añade un prompt negativo para excluir elementos no deseados
   - Ajusta los parámetros de generación según necesites
   - Haz clic en "🚀 Generar Imagen"

## 🎛️ Configuraciones Disponibles

- **Dimensiones de imagen soportadas**:
  - 1024x1024
  - 1152x896
  - 1216x832
  - 1344x768
  - 1536x640
  - 640x1536
  - 768x1344
  - 832x1216
  - 896x1152

- **Pasos de generación**: 20-50 (por defecto: 30)

## 📦 Dependencias

- streamlit==1.24.0
- Pillow==9.5.0
- requests==2.31.0
- python-dotenv==1.0.0

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, siente libre de:

1. Fork el proyecto
2. Crear una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👏 Agradecimientos

- [Stable Diffusion](https://stability.ai) por proporcionar la API de generación de imágenes
- [Streamlit](https://streamlit.io) por el framework de la interfaz de usuario
