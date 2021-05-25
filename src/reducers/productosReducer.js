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
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";

//cada reducer tiene que tener si propio state
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoaliminar: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };
    case PRODUCTO_EDITADO_ERROR:
    case OBTENER_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:  
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
case DESCARGA_PRODUCTOS_EXITO:
    return {
        ...state,
        loading: false,
        error: false,
        productos: action.payload,
        productoaliminar: null
    }
case OBTENER_PRODUCTO_ELIMINAR:
    return{
        ...state,
        productoaliminar: action.payload
    }
case OBTENER_PRODUCTO_EXITO:
    return {
        ...state,
        productos: state.productos.filter(producto=>producto.id !== state.productoaliminar)
    } 
case OBTENER_PRODUCTO_EDITAR:
    return {
        ...state,
        productoeditar: action.payload
    }
case PRODUCTO_EDITADO_EXITO:
    return {
        ...state,
        productoeditar: null,
        productos: state.productos.map(producto=>producto.id === action.payload.id ? action.payload : producto)
    }
    default:
      return state;
  }
}
