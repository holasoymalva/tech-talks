# app.py
import streamlit as st
import requests
import io
from PIL import Image
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Dimensiones permitidas para SDXL
ALLOWED_DIMENSIONS = [
    "1024x1024",
    "1152x896",
    "1216x832",
    "1344x768",
    "1536x640",
    "640x1536",
    "768x1344",
    "832x1216",
    "896x1152"
]

def main():
    st.title("🎨 Generador de Imágenes con IA")
    st.write("Genera imágenes increíbles usando Inteligencia Artificial")

    # Sidebar para configuraciones
    st.sidebar.title("⚙️ Configuración")
    
    # Input para el API key
    api_key = st.sidebar.text_input("Ingresa tu API Key de Stable Diffusion", type="password")
    
    # Configuraciones de generación
    steps = st.sidebar.slider("Pasos de generación", min_value=20, max_value=50, value=30)
    
    # Selector de dimensiones
    selected_dimensions = st.sidebar.selectbox(
        "Selecciona las dimensiones de la imagen",
        ALLOWED_DIMENSIONS,
        index=0  # Por defecto selecciona 1024x1024
    )
    
    # Separar las dimensiones seleccionadas
    width, height = map(int, selected_dimensions.split('x'))
    
    # Área principal
    prompt = st.text_area(
        "Describe la imagen que quieres generar", 
        placeholder="Por ejemplo: Un paisaje futurista con edificios flotantes y naves espaciales, estilo cyberpunk"
    )
    
    negative_prompt = st.text_area(
        "Prompt negativo (opcional)", 
        placeholder="Elementos que NO quieres que aparezcan en la imagen"
    )

    # Botón de generación
    if st.button("🚀 Generar Imagen"):
        if not api_key:
            st.error("⚠️ Por favor, ingresa tu API Key en la barra lateral")
            return
        
        if not prompt:
            st.error("⚠️ Por favor, describe la imagen que quieres generar")
            return
            
        try:
            with st.spinner("🎨 Generando tu imagen... Por favor espera"):
                # Llamada a la API de Stable Diffusion
                response = generate_image(
                    api_key=api_key,
                    prompt=prompt,
                    negative_prompt=negative_prompt,
                    steps=steps,
                    width=width,
                    height=height
                )
                
                if response.status_code == 200:
                    # Convertir la respuesta en imagen
                    image = Image.open(io.BytesIO(response.content))
                    # Mostrar la imagen
                    st.image(image, caption="Imagen generada")
                    
                    # Botón para descargar la imagen
                    buf = io.BytesIO()
                    image.save(buf, format="PNG")
                    st.download_button(
                        label="📥 Descargar imagen",
                        data=buf.getvalue(),
                        file_name="imagen_generada.png",
                        mime="image/png"
                    )
                else:
                    st.error(f"❌ Error al generar la imagen: {response.text}")
                    
        except Exception as e:
            st.error(f"❌ Ocurrió un error: {str(e)}")

def generate_image(api_key, prompt, negative_prompt="", steps=30, width=1024, height=1024):
    """
    Genera una imagen usando la API de Stable Diffusion
    """
    url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"
    
    headers = {
        "Accept": "image/png",
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Crear la lista de prompts
    text_prompts = [{"text": prompt, "weight": 1}]
    
    # Agregar prompt negativo solo si no está vacío
    if negative_prompt.strip():
        text_prompts.append({"text": negative_prompt, "weight": -1})
    
    payload = {
        "text_prompts": text_prompts,
        "cfg_scale": 7,
        "steps": steps,
        "width": width,
        "height": height,
        "samples": 1
    }
    
    return requests.post(url, headers=headers, json=payload)

if __name__ == "__main__":
    main()