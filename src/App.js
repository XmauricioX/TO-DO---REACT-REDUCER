import { useReducer } from 'react';
import {tareasReducer} from "./reducers/tareasReducer"
import './App.css';
import { useForm } from './hooks/useForm';

const initialState = [
  {
    id : new Date().getTime(),
    descripcion : "Aprender initialState",
    terminada : false
  }
]


function App() {

  
  const [tareas, dispatch] = useReducer(tareasReducer, initialState)
  
  const handleSubmit = (e) => {
    
      e.preventDefault();

      let nuevaTarea = {
        id : new Date().getTime(),
        descripcion : "Aprender React",
        terminada : false
      }
    
      const agregarTarea = {
        type : "agregar",
        payload : nuevaTarea
      }
      
      dispatch(agregarTarea)

  }

  useForm({
    descripcion : ""
  })

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
              tareas.map(({descripcion,terminada}, i) => (
                <li
                  key = {descripcion + i} 
                  className='d-flex justify-content-between align-items-center'
                >
                  <p>
                    { i + 1 } . { descripcion }
                  </p>

                  <button className='btn btn-sm btn-danger mb-1'>
                    <i className='fas fa-trash-alt'></i>
                  </button>

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
