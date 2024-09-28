import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function TaskDetails() {
  const { id } = useParams();  // Captura o ID da tarefa
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de carregamento da tarefa (ou use uma API real)
    axios.get(`/api/tasks/${id}`)
      .then(response => setTitle(response.data.title))  // Exemplo com chamada API
      .catch(error => console.error('Erro ao carregar tarefa', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviando os dados atualizados para a API (usando PUT ou PATCH)
    axios.put(`/api/tasks/${id}`, { title })
      .then(() => {
        console.log('Tarefa atualizada com sucesso');
        navigate('/');  // Redireciona para a lista de tarefas
      })
      .catch(error => console.error('Erro ao atualizar tarefa', error));
        // Salvar tarefas no localStorage ao adicionar ou editar
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);
      
      // Carregar tarefas do localStorage ao inicializar
      useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
          setTasks(storedTasks);
        }
      }, []);
      // A descrição já está sendo simulada ao buscar as tarefas da API
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      const tasksWithDetails = response.data.map(task => ({
        ...task,
        description: `Descrição da Tarefa ${task.id}`,  // Simulando uma descrição
        status: task.completed ? 'Concluída' : 'Pendente'  // Status baseado no campo "completed"
      }));
      setTasks(tasksWithDetails);
    })
    .catch(error => console.error('Erro ao carregar tarefas da API:', error));


  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Tarefa {id}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da Tarefa"
      />
      <button type="submit">Salvar</button>
    </form>
  );
}

export default TaskDetails;
