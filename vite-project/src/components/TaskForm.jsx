import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 1000),  // Gerar ID aleatório temporário
      title,
      description,
      status,
    };
    addTask(newTask);
    navigate('/');  // Redirecionar após adicionar a tarefa
  };

  return (
    <form onSubmit={handleSubmit} className="task-item">
      <h1>Adicionar Tarefa</h1>
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
        <button type="submit" className="save-button">Adicionar</button>
      </div>
    </form>
  );
}

export default TaskForm;
