import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:8000/api/tasks/'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })
  const [editingId, setEditingId] = useState(null)

  // ============================================================
  // ROL DE REACT EN LA ARQUITECTURA:
  // - Gestiona el estado de la interfaz (useState)
  // - Realiza peticiones HTTP al backend (fetch)
  // - Renderiza componentes reutilizables de forma declarativa
  // - Maneja la interactividad del usuario (eventos, formularios)
  // ============================================================

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error al cargar las tareas')
      const data = await response.json()
      // DRF puede devolver paginación: { results: [...] }
      setTasks(data.results || data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      const url = editingId ? `${API_URL}${editingId}/` : API_URL
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Error al guardar la tarea')
      
      setFormData({ title: '', description: '', priority: 'medium' })
      setEditingId(null)
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      await fetch(`${API_URL}${task.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      })
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority
    })
    setEditingId(task.id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta tarea?')) return
    try {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' })
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const priorityLabel = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  }

  const priorityClass = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high'
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gestor de Tareas</h1>
        <p className="subtitle">React + Django | Arquitectura Full-Stack</p>
      </header>

      <main className="main">
        {/* Formulario */}
        <section className="form-section">
          <h2>{editingId ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              placeholder="Título de la tarea *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Descripción (opcional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Prioridad Baja</option>
              <option value="medium">Prioridad Media</option>
              <option value="high">Prioridad Alta</option>
            </select>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Actualizar' : 'Crear Tarea'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ title: '', description: '', priority: 'medium' })
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Lista de tareas */}
        <section className="list-section">
          <h2>Mis Tareas ({tasks.length})</h2>
          
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">Cargando tareas...</div>}
          
          {!loading && tasks.length === 0 && (
            <p className="empty">No hay tareas. ¡Crea la primera!</p>
          )}

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                  />
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    <span className={`badge ${priorityClass[task.priority]}`}>
                      {priorityLabel[task.priority]}
                    </span>
                  </div>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="btn-edit">Editar</button>
                  <button onClick={() => handleDelete(task.id)} className="btn-delete">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>
          Frontend: <strong>React</strong> (UI e interactividad) · 
          Backend: <strong>Django + DRF</strong> (API REST y lógica de negocio)
        </p>
      </footer>
    </div>
  )
}

export default App
