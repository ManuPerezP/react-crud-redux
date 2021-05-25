import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router';

const EditarProductos = ()=>{

    const dispatch = useDispatch();
    const history = useHistory();

    const [producto, guardarProductoEditar] = useState({
        nombre: '',
        precio: ''
    });

    const productoEditar = useSelector(state=>state.productos.productoeditar);
    console.log("--->",productoEditar);

    useEffect(()=>{
        guardarProductoEditar(productoEditar);
    },[productoEditar]);


    const onChange = e =>{
        guardarProductoEditar({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio} = producto;

    const submitEditarProducto = e =>{
        e.preventDefault();
        
        dispatch(editarProductoAction(producto)); //las funciones las llamas con el dispatch

        history.push('/');
    }

        return(
            <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4 font-weight-bold">
                                        Editar Producto
                                </h2>
    
                                <form onSubmit={submitEditarProducto}>
                                    <div className="form-group">
                                        <label>Nombre Producto</label>  
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            placeholder="Nombre Producto"
                                            value={nombre}
                                            onChange={onChange}
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label>Precio Producto</label>  
                                        <input 
                                            type="number"
                                            className="form-control"
                                            name="precio"
                                            placeholder="Precio Producto"
                                            value={precio}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                    >Guardar Cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        )
    
}

export default EditarProductos;
