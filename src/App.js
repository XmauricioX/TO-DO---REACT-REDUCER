import { useReducer, useEffect } from 'react';
import { tareasReducer } from "./reducers/tareasReducer"
import './App.css';
import { useForm } from './hooks/useForm';



const init = () => {
  /*reurn [
    {
      id : new Date().getTime(),
      descripcion : "Aprender initialState",
      terminada : false
    }
  ] */
  return JSON.parse(localStorage.getItem('tareas')) || []
}



function App() {

  
  const [tareas, dispatch] = useReducer(tareasReducer, [], init)

  

  const [ {descripcion}, handleInputChange, reset ] = useForm({
    descripcion : ''
  })

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])

  const handleSubmit = (e) => {

      e.preventDefault();

      if(descripcion.trim().length < 1){
        return
      }

      let nuevaTarea = {
        id : new Date().getTime(),
        descripcion,
        terminada : false
      }
    
      const agregarTarea = {
        type : "agregar",
        payload : nuevaTarea
      }
      
      dispatch(agregarTarea)

      reset()

  }

  const handleDelete = (id) => {

    const borrarTarea = {
      type : "borrar",
      payload : id
    }

    dispatch(borrarTarea)

  }

  const handleFinish = (id) => {
    const tacharTarea = {
      type : "tachar",
      payload : id
    }

    dispatch(tacharTarea)

  }

  return (
    <div className="App">
      <h1>TAREAS APP</h1>

      <h2>
        Total de tareas: {tareas.length}
      </h2>
      <hr />

      <div className='row'>

        <div className='col-7'>

          <ul className='list-group list-group-flush px-4'>
            {
              tareas.map(({descripcion, terminada, id}, i) => (
                <li
                  key = {descripcion + i} 
                  className='d-flex justify-content-between align-items-center'
                >

                <p className={ terminada && 'text-decoration-line-through'} >
                  {/* el && es un if minificado, si se cumple la condicion se ejecuta lo que sigue, si no se cumple no se ejecuta*/ }
                  { i + 1 } . { descripcion }
                </p>

                <div>
                  <button onClick={ ()=> handleFinish(id)}  className='btn btn-sm me-4 mb-1'>
                   <i className= {terminada? "fas fa-eraser btn btn-danger" : "fas fa-check btn btn-success"}></i>
                  </button>
                  <button onClick={ ()=> handleDelete(id) } className='btn btn-sm btn-danger mb-1'>
                    <i className='fas fa-trash-alt'></i>
                  </button>
                </div>
                </li>
              ))
            }
          </ul>        

        </div>

        <div className='col-5'>

          <h2>
            Agregar Tareas
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Quiero Aprender...'
              autoComplete='off'
              className='form-control'
              name='descripcion'
              onChange={handleInputChange}
              value={descripcion}
              >
            </input>

            <button type='submit' className='btn btn-primary w-100 mt-2'>
              Agregar La Tarea
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

export default App;
