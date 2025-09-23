# 🎮 Game-ClinicaColombia

**Game-ClinicaColombia** es una aplicación web gamificada desarrollada para **Clínica Colombia ES**, diseñada con el fin de **informar, educar y evaluar** a los usuarios sobre sus **derechos y deberes** como pacientes.  

Este proyecto surge de la necesidad de la clínica de ofrecer un formato dinámico y atractivo que, además de enseñar, permita obtener **retroalimentación en tiempo real** sobre:  
- Preguntas en las que los usuarios fallan con mayor frecuencia.  
- Puntaje total obtenido por cada partida.  
- Tiempos de respuesta de cada jugador.  

El sistema combina **tecnologías web modernas** con **automatización de flujos de datos** para entregar resultados útiles de forma automática.

---

## 🚀 Características principales
- 🧑‍⚕️ **Enfoque educativo:** Preguntas sobre derechos y deberes.  
- 🎯 **Sistema de puntuación:** Cada partida genera un puntaje final.  
- ⏱️ **Análisis de tiempos:** Registro del tiempo de respuesta por partida.  
- 📊 **Retroalimentación:** Identificación de temas con mayor índice de fallos.  
- ☁️ **Base de datos en la nube (Firebase):** Resultados centralizados y seguros.  
- 🔄 **Automatización con n8n:** Extracción y transformación de datos en reportes (Excel/Google Sheets).  
- 📱 **Diseño responsivo:** Optimizado para móviles, tablets y escritorio.  

---

## 🛠️ Tecnologías utilizadas

### Frontend
- **React** – Librería para construir interfaces dinámicas y modulares.  
- **Tailwind CSS** – Framework CSS para diseño rápido y responsivo.  

### Backend / Base de datos
- **Firebase Firestore** – Base de datos en la nube para almacenar partidas, puntajes y tiempos de respuesta.  
- **Firebase SDK** – Integración directa entre la app y la base de datos.  

### Automatización
- **n8n** – Herramienta de automatización que conecta Firebase con servicios externos.  
  - Extracción de datos desde Firestore.  
  - Procesamiento y cálculo de métricas.  
  - Exportación a **Excel o Google Sheets** para informes.  

### Otros
- **Node.js** – Entorno de ejecución para dependencias y herramientas.  
- **GitHub** – Control de versiones y portafolio del proyecto.  

---

## ⚙️ Flujo del proyecto

1. **Interacción del usuario**  
   - El jugador responde un quiz/juego con preguntas sobre derechos y deberes.  
   - Al finalizar, obtiene un **puntaje total** y se registra su **tiempo de respuesta**.  

2. **Almacenamiento de datos (Firebase)**  
   - Se guarda la información en Firestore:  
     - Nombre del usuario.  
     - Área (dependencia).  
     - Puntaje total.  
     - Preguntas correctas/incorrectas.  
     - Tiempo de respuesta.  

3. **Automatización (n8n)**  
   - Conexión directa a Firebase.  
   - Extracción periódica de registros.  
   - Generación de reportes en **Excel o Google Sheets** con:  
     - Promedio de puntajes.  
     - Preguntas con más errores.  
     - Análisis de tiempos.  

4. **Informe final**  
   - El área administrativa de la clínica recibe reportes claros y accionables.  

---
---

## 🔮 Futuras mejoras
- Implementar autenticación de usuarios con Firebase Auth.  
- Crear dashboard en tiempo real con gráficos (React + Chart.js).  
- Exportación automática de reportes en PDF.  
- Soporte multilenguaje.  

---

## 👨‍💻 Autor
**Juan José Borrero Gutiérrez**  
Web & Mobile Developer | Full Stack | Automatización con n8n  
[GitHub](https://github.com/juanjosbg/Game-ClinicaColombia) | [LinkedIn](https://linkedin.com/in/tu-link)  

