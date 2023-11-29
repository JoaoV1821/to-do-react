import React, { useState, useEffect } from 'react'
import Style from './Todo.module.css'
import { getTasks } from '../../services/API';
import { postTodo } from '../../services/API';
import { deleteTask } from '../../services/API';
import { updateStatus } from '../../services/API';

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

  
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([])
  const [newTasks, setNewTasks] = useState([]);

  const pending = tasks.filter((task) => task.status === 'pending');
  const doing = tasks.filter((task) => task.status === 'doing');
  const done = tasks.filter((task) => task.status === 'done');


  const handleGetTasks = async () => {
    console.log(localStorage.getItem('email'))
    await getTasks(localStorage.getItem('email')).then((response) => {
      setTasks(response['tasks']);
    }).catch((error) => {
      console.log(error.message);
    })

  }


  const handleDelete = async (id) => {
      await deleteTask(id).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error.message);
      })
  }


  const handleSetvalue = (value) => {
      setInput(value)
  }


  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
    handleDelete(taskId);
  };


  const handleAddTask = () => {
    if (input === '' || input === null) {
      alert('Digite um valor!');
    } else {
      const task = {
        email: localStorage.getItem('email'),
        descricao: input,
        status: 'pending',
      };
  
      setTasks((prevTasks) => [...prevTasks, task]);
      handleSaveTask(task)
    }
  };


  const handleSaveTask =  async (task) => {
    await postTodo(task).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error.message);
    })
  }


  const handleSetStatus = async (object) => {
      await updateStatus(object).then((response) => {
         console.log(response);
      }).catch((error) => {
        console.log(error.message);
      })
  }
 
  const handleAction = async (taskId) => {
    const object = {
      email: localStorage.getItem('email'),
      id: taskId,
      status: '',
    };
  
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedStatus;
  
          switch (task.status) {
            case 'pending':
              updatedStatus = 'doing';
              break;
            case 'doing':
              updatedStatus = 'done';
              break;
            case 'done':
              updatedStatus = 'pending';
              break;
          }
  
          object.status = updatedStatus;
  
          // Atualizar o status da tarefa via API
          handleSetStatus(object).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error.message);
          });
  
          // Atualizar o status da tarefa no estado local
          return {
            ...task,
            status: updatedStatus,
          };
        }
  
        return task;
      });
  
      return updatedTasks;
    });
  };
  

  useEffect(() => {
    handleGetTasks()
  }, [])
  

  return (
    <div className={Style.container}>
      <section className='top-todo'>
        <h2>To do List</h2>
        <input type="text" placeholder='Enter a task'className={Style.input} onChange={(value) => handleSetvalue(value.target.value)} />
        <button onClick={() => handleAddTask()}>Add Todo</button>

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