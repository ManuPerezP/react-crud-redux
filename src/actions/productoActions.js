import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  OBTENER_PRODUCTO_EXITO,
  OBTENER_PRODUCTO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";

import Swal from "sweetalert2";
//crear nuevos productos

export function crearNuevoProductoActions(producto) {
  return async (dispatch) => {
    console.log(producto);
    dispatch(agregarProducto());

    try {
      //insertar en la api
      await clienteAxios.post("/productos", producto);
      //si todo sale bien, actualizar state
      dispatch(agregarProductoExito(producto));

      //alerta success
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      dispatch(agregarProductoError(true));

      //alerta error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo.",
      });
    }
  };
}

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
        setTimeout(async()=>{
          const respuesta = await clienteAxios.get("/productos");
          dispatch(descargaProductosExitosa(respuesta.data));
        }, 3000);
    } catch (error) {
      dispatch(descargaProductoError());

      //alerta error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo.",
      });
    }
  };
}

export function borrarProductoAction(id){
  return async(dispatch)=>{

     dispatch(obtenerProductoEliminar(id));

    try{
        const resultado = await clienteAxios.delete(`/productos/${id}`);
        console.log(resultado);
        dispatch(eliminarProductoExito());

        Swal.fire(
          'Eliminado!',
          'Se eliminó.',
          'Exito'
        )
    }catch(error){
      console.log(error);
      dispatch(eliminarProductoError());
    }
  }
}

// Colocar producto en edición
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
      dispatch( obtenerProductoEditarAction(producto) )
  }
}

const obtenerProductoEditarAction = producto =>({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})


export function editarProductoAction(producto){
  return async (dispatch)=>{
    dispatch(editarProducto());

    try{
        await clienteAxios.put(`/productos/${producto.id}`,producto);
        dispatch(editarProductoExito(producto))
    }catch(error){
      console.log(error);
      dispatch( editarProductoError() );
    }
  }
}

const editarProducto = () =>({
  type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto)=>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
})

const eliminarProductoError = ()=>({
  type: OBTENER_PRODUCTO_ERROR,
  payload: true
})

const eliminarProductoExito = ()=>({
  type: OBTENER_PRODUCTO_EXITO
})


const obtenerProductoEliminar = (id)=>({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const agregarProducto = () => ({ 
  type: AGREGAR_PRODUCTO, 
  payload: true
 });

//si se guarda en la bd
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//si hubo im eror
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});


const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductoError = ()=>({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});






