import React, { useState, useEffect } from 'react'
import Style from './Todo.module.css'

const Todo = () => {
  const Cards = (props) => {
    return (
      <div className={Style.containerCard}>
        <fieldset className={Style.task}>
          {props.descricao}

          <section>
            <button
              onClick={() => props.onClick(props.taskId)}
              className={Style.btn}
            >
              {props.status}
            </button>
            <button className={Style.btn} onClick={() => handleDeleteTask(props.taskId)}>Excluir</button>
          </section>
        </fieldset>
      </div>
    );
  };

  const tasks = [
    {
      id: 1,
      title: 'Buy groceries',
      descricao: 'Tarefa 1',
      status: 'pending',
    },
   
    {
      id: 2,
      title: 'Buy groceries',
      descricao: 'Tarefa 2',
      status: 'pending',
    },
   
    {
      id: 3,
      title: 'Buy groceries',
      descricao: 'Tarefa 3',
      status: 'pending'
    },

    {
      id: 4,
      title: 'Buy groceries',
      descricao: 'Tarefa 4',
      status: 'doing'
    },

    {
      id: 5,
      title: 'Buy groceries',
      descricao: 'Tarefa 5',
      status: 'doing'
    },

    {
      id: 6,
      title: 'Buy groceries',
      descricao: 'Tarefa 6',
      status: 'doing'
    },

    {
      id: 7,
      title: 'Buy groceries',
      descricao: 'Tarefa 7',
      status: "done"
    },

    {
      id: 8,
      title: 'Buy groceries',
      descricao: 'Tarefa 8',
      status: 'done'
    },

    {
      id: 9,
      title: 'Buy gros',
      descricao: 'Tarefa 9',
      status: "done"
    }
  ]

 

  const [input, setInput] = useState('');
  const [t, setTasks] = useState([])

  const pending = t.filter((task) => task.status === 'pending');
  const doing = t.filter((task) => task.status === 'doing');
  const done = t.filter((task) => task.status === 'done');


  const handleSetvalue = (value) => {
      setInput(value)
  }

  const handleFillTasks = () => {
    setTasks(tasks)
    console.log(t)
  
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleAddTask = () => {
    if (input === '' || input === null) {
      alert('Digite um valor!');
    } else {
      const task = {
        id: tasks.length + 1,
        title: input,
        descricao: input,
        status: 'pending',
      };
  
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };
  
  const handleAction = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === 'pending'
                  ? 'doing'
                  : task.status === 'doing'
                  ? 'done'
                  : 'pending',
            }
          : task
      )
    );
  };
  

  useEffect(() => {
    handleFillTasks()
    console.log(localStorage.getItem('email'))
  }, [])
  

  return (
    <div className={Style.container}>
      <section className='top-todo'>
        <h2>To do List</h2>
        <input type="text" placeholder='Enter a task'className={Style.input} onChange={(value) => handleSetvalue(value.target.value)} />
        <button onClick={() => handleAddTask()}>Add Todo</button>
        <button onClick={() => handleAddTask()}>Save</button>
      </section>
        

      <section className={Style.cards}>
            <section>
                <p>A fazer</p>
                {
                  pending.map((task) => {
                    return (
                     <Cards 
                     key={task.id}
                     taskId={task.id}
                     descricao={task.descricao} 
                     status="Iniciar" 
                     onClick={handleAction}
                
                     
                     />)
                  }) 
                
              
                }
            </section>

            <section >
                <p>Fazendo</p>
                {
                  doing.map((task) => {
                    return (
                     <Cards 
                     key={task.id}
                     taskId={task.id}
                     descricao={task.descricao} 
                     status="Finalizar"
                     onClick={handleAction}
                     
                     />)
                  })
                }
            </section>
            
            <section>
                <p>Feito</p>
                {
                  done.map((task) => {
                    return (
                     <Cards 
                     key={task.id}
                     taskId={task.id}
                     descricao={task.descricao} 
                     onClick={handleAction}
                     status="Retomar"/>)
                  })
                }
            </section>
      </section>
       

    </div>

  )
}

export default Todo