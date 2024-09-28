import React from 'react';
import { Link } from 'react-router-dom';

function TaskList({ tasks, deleteTask }) {
  // Inverter a ordem das tarefas para exibir as mais recentes primeiro
  const pendingTasks = tasks.filter(task => task.status === 'Pendente').reverse();
  const completedTasks = tasks.filter(task => task.status === 'Concluída').reverse();

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="add-task">
        <Link to="/add" className="add-button">+</Link>
      </div>
      <div className="task-lists">
        {/* Coluna de Tarefas Pendentes */}
        <div className="task-column">
          <h2>Pendentes</h2>
          <div className="task-list">
            {pendingTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-actions">
                  <Link to={`/edit/${task.id}`}>Editar</Link>
                  <button onClick={() => deleteTask(task.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de Tarefas Concluídas */}
        <div className="task-column">
          <h2>Concluídas</h2>
          <div className="task-list">
            {completedTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-actions">
                  <Link to={`/edit/${task.id}`}>Editar</Link>
                  <button onClick={() => deleteTask(task.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;
