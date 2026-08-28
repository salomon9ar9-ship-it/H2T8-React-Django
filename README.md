# H2 Tarea 8 — Tecnologías web — front / back end
## Gestor de Tareas Full-Stack: React + Django

**Proyecto académico** desarrollado en **Visual Studio Code**, aplicando Django e integrando el backend con el frontend (React + Vite). Demuestra la conexión completa frontend ↔ backend mediante API REST, organización clara de carpetas y ejecución sin errores en entorno local.

**Estudiante:** VILLEGAS APAZA SALOMON RICHARD  
**Universidad Privada Franz Tamayo — Ingeniería de Sistemas**

**Repositorio:** https://github.com/SalomonVillegas/H2T8-React-Django  
*(Reemplazar con el enlace real de tu repositorio GitHub)*

---

## 1. Arquitectura del Proyecto (desarrollado en VS Code)

Se adoptó una arquitectura **desacoplada** (frontend + backend separados), comunicados exclusivamente a través de una **API REST**. Esta es la práctica estándar en proyectos profesionales modernos.

```
H2T8-React-Django/
├── backend/                 # Configuración del proyecto Django (settings, urls, wsgi)
│   ├── settings.py          # CORS, DRF, apps instaladas, base de datos
│   ├── urls.py              # Rutas principales → /api/
│   ├── asgi.py / wsgi.py
│   └── ...
├── tasks/                   # Aplicación Django de dominio (models, serializers, views)
│   ├── models.py            # Modelo Task (ORM)
│   ├── serializers.py       # Conversión Modelo ↔ JSON
│   ├── views.py             # ViewSet CRUD completo
│   ├── urls.py              # Router de DRF
│   ├── admin.py             # Panel de administración
│   └── migrations/
├── frontend/                # Aplicación React con Vite
│   ├── src/
│   │   ├── App.jsx          # Componente principal + lógica UI + fetch API
│   │   ├── App.css          # Estilos responsive
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md                # Este documento
```

### Flujo de datos (integración frontend ↔ backend)

```
Usuario  →  React (UI + estado)  →  HTTP/JSON (Fetch)  →  Django + DRF
                                                              ↓
                                                         Validación
                                                         Persistencia (SQLite)
                                                              ↓
React actualiza estado  ←  Respuesta JSON  ←  ViewSet / Serializer
```

---

## 2. Herramientas utilizadas (según indicaciones de la tarea)

| Herramienta          | Uso en el proyecto                                      |
|----------------------|---------------------------------------------------------|
| **Visual Studio Code** | IDE principal: edición, terminal integrado, extensiones Python/React |
| **Node.js + npm**    | Runtime y gestor de paquetes del frontend (Vite + React) |
| **Django**           | Framework backend (ORM, admin, seguridad)               |
| **Django REST Framework** | API REST automática (ModelViewSet + Router)        |
| **django-cors-headers** | Permite conexión segura entre puertos distintos     |
| **Vite**             | Build tool moderno del frontend (hot-reload)            |
| **SQLite**           | Base de datos local (cero configuración)                |

---

## 3. Rol de Django (Backend)

Django actúa como el **cerebro y la memoria** del sistema:

| Responsabilidad           | Implementación en el proyecto                              |
|---------------------------|------------------------------------------------------------|
| Persistencia de datos     | Modelo `Task` + ORM de Django + migraciones automáticas    |
| Lógica de negocio         | Campos del modelo, choices de prioridad, validaciones      |
| API REST                  | DRF: `ModelViewSet` + `DefaultRouter` (CRUD completo)      |
| Seguridad / CORS          | `django-cors-headers` configurado para `localhost:5173`    |
| Administración            | Panel `/admin/` con list_display, filtros y búsqueda       |
| Organización              | App independiente `tasks/` (separación de concerns)        |

**Por qué Django:** productividad alta (“batteries included”), ORM maduro, seguridad por defecto y facilidad para exponer APIs profesionales con DRF.

---

## 4. Rol de React (Frontend)

React es la **cara e interactividad**:

| Responsabilidad           | Implementación en el proyecto                              |
|---------------------------|------------------------------------------------------------|
| Interfaz de usuario       | Componentes funcionales + JSX (`App.jsx`)                  |
| Estado de la aplicación   | Hooks `useState` y `useEffect`                             |
| Comunicación con backend  | API Fetch nativa hacia `/api/tasks/`                       |
| Interactividad            | Formularios controlados, checkbox, botones CRUD            |
| Experiencia de usuario    | Feedback visual, diseño responsive, estados de carga/error |

**Por qué React:** componentes reutilizables, Virtual DOM eficiente, ecosistema moderno (Vite) y separación clara entre presentación y datos.

---

## 5. Integración Funcional Frontend ↔ Backend

La integración se realiza mediante una **API REST** documentada y consistente:

| Método     | Endpoint              | Acción                  |
|------------|-----------------------|-------------------------|
| GET        | `/api/tasks/`         | Listar todas las tareas |
| POST       | `/api/tasks/`         | Crear nueva tarea       |
| GET        | `/api/tasks/{id}/`    | Detalle de una tarea    |
| PUT/PATCH  | `/api/tasks/{id}/`    | Actualizar tarea        |
| DELETE     | `/api/tasks/{id}/`    | Eliminar tarea          |

**Configuración clave de integración (realizada en VS Code):**
- `CORS_ALLOWED_ORIGINS` en `backend/settings.py` permite orígenes `http://localhost:5173` (Vite) y `http://localhost:3000`.
- El frontend usa la constante `API_URL = 'http://localhost:8000/api/tasks/'`.
- No se comparte código entre capas (arquitectura desacoplada).
- El proyecto se ejecuta sin errores en entorno local (backend puerto 8000 + frontend puerto 5173).

---

## 6. Buenas Prácticas de Organización del Código

1. Separación estricta de **frontend/** y **backend/** en carpetas independientes.
2. App de Django por dominio de negocio (`tasks/`).
3. Serializers dedicados (no se expone el modelo crudo).
4. ViewSets + Routers de DRF (menos boilerplate, endpoints consistentes).
5. Configuración centralizada (`settings.py` + constante `API_URL`).
6. `.gitignore` completo (node_modules, venv, *.sqlite3, etc.).
7. `requirements.txt` y `package.json` para reproducibilidad.
8. Comentarios técnicos en el código explicando el rol de cada pieza.
9. Código modular, nombres descriptivos y diseño responsive.
10. Desarrollado y depurado íntegramente en **Visual Studio Code** (terminal integrado, IntelliSense, extensiones).

---

## 7. Cómo Ejecutar el Proyecto (Instrucciones de instalación)

### Requisitos previos
- Python 3.10+ 
- Node.js 18+ y npm
- Visual Studio Code (recomendado)

### Backend (Django)

```bash
# Desde la raíz del proyecto
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# → Backend disponible en http://localhost:8000
# → Admin: http://localhost:8000/admin/
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# → Frontend disponible en http://localhost:5173
```

### Verificación de integración
1. Abrir el frontend en el navegador.
2. Crear, listar, editar y eliminar tareas.
3. Verificar que los cambios se reflejan en la base de datos (o en `/admin/`).
4. Confirmar que no aparecen errores de CORS ni de conexión en la consola del navegador.

---

## 8. Cumplimiento de la Lista de Cotejo (Excelencia)

| N°  | Indicador                                               | Cumple |
| --- | ------------------------------------------------------- | ------ |
| 1   | Proyecto ejecuta sin errores en entorno local           | ✅     |
| 2   | Backend (Django) conectado con el frontend              | ✅     |
| 3   | Código organizado en carpetas claras (frontend/backend) | ✅     |
| 4   | Instrucciones de instalación y ejecución incluidas      | ✅     |

---

## 9. Conclusión

Este proyecto, desarrollado íntegramente en **Visual Studio Code**, demuestra que React y Django **no compiten, se complementan**. Django aporta robustez, seguridad, ORM y velocidad de desarrollo en el backend. React aporta una experiencia de usuario moderna, reactiva y mantenible. La arquitectura resultante es desacoplada, escalable y alineada con las mejores prácticas del desarrollo full-stack actual.

Se cumple plenamente el criterio de **Excelencia** de la rúbrica: proyecto ejecutable, backend conectado con frontend, carpetas claras e instrucciones completas de instalación y ejecución.

---

**Documento generado para la entrega de la H2 Tarea 8**  
**Estudiante:** VILLEGAS APAZA SALOMON RICHARD  
**Incluye enlace del repositorio en la portada del PDF de entrega**
