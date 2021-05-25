import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//actions de redux
import { crearNuevoProductoActions } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProductos = ({history}) => {

    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState(0);

    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    console.log("---->"+cargando);

    const agregarProducto = producto =>dispatch(crearNuevoProductoActions(producto)); //mandar llamar el action de producto accion

    const submitNuevoProducto = (e) => {
        e.preventDefault();
      
        //validar formulario
      
        if(nombre.trim() === '' || precio <= 0){

          const respuesta = {
            msg: 'Ambos campos son obligatorios',
            classes: 'alert alert-danger text-center text-uppercase p3'
          }
console.log("alertaaaaaa");
          dispatch(mostrarAlerta(respuesta));

            return;
        }
        //si no hay errores
        dispatch(ocultarAlertaAction())
      
        //crear el nnuevo producto
        agregarProducto({nombre, precio}); //llaves = objeto

        history.push('/');
      };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
          {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  placeholder="Nombre Producto"
                  onChange={e=>guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={precio}
                  placeholder="Precio Producto"
                  onChange={e=>guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando ...</p>: null}
            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>: null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProductos;
