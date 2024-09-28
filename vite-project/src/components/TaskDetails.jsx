import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails({ tasks, editTask }) {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');

  useEffect(() => {
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status || 'Pendente');
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(parseInt(id), { title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="task-item">
      <h1>Editar Tarefa</h1>
      <div className="task-title">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Título da Tarefa" 
        />
      </div>
      <div className="task-description">
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descrição da Tarefa" 
        />
      </div>
      <div className="task-actions">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button type="submit" className="save-button">Salvar</button>
      </div>
    </form>
  );
}

export default TaskDetails;
