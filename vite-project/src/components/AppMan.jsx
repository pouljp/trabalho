import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import TaskDetails from './TaskDetails.jsx';
import axios from 'axios';

function AppMan() {
  const [tasks, setTasks] = useState([]);  // Começamos com a lista vazia
  const [loading, setLoading] = useState(true);  // Controle de carregamento
  const [error, setError] = useState(null);  // Controle de erro
  const navigate = useNavigate();

  // Função para buscar as tarefas da API quando o componente é montado
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        const tasksWithDetails = response.data.map(task => ({
          ...task,
          description: `Descrição da Tarefa ${task.id}`,  // Simulando uma descrição
          status: task.completed ? 'Concluída' : 'Pendente'  // Definindo o status baseado no campo "completed"
        }));
        setTasks(tasksWithDetails);
        setLoading(false);  // Tarefas carregadas com sucesso
      })
      .catch(error => {
        console.error('Erro ao carregar tarefas da API:', error);
        setError('Erro ao carregar tarefas. Tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  // Função para adicionar uma nova tarefa localmente
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);  // Adiciona a nova tarefa ao estado local
    navigate('/');  // Redireciona para a lista de tarefas após adicionar
  };

  // Função para editar uma tarefa no estado local
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task  // Atualiza somente a tarefa correspondente
    ));
    navigate('/');  // Redireciona para a lista de tarefas após editar
  };

  // Função para excluir uma tarefa
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));  // Remove a tarefa do estado local
  };

  return (
    <div>
      {loading && <p>Carregando tarefas...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} deleteTask={deleteTask} />} />
          <Route path="/add" element={<TaskForm addTask={addTask} />} />
          <Route path="/edit/:id" element={<TaskDetails tasks={tasks} editTask={editTask} />} />
        </Routes>
      )}
    </div>
  );
}

export default AppMan;
