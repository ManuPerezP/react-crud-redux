import React from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

//redux
import { useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from "../actions/productoActions";

const Producto = ({ producto }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmarElimianarProducto = id =>{
    //

    Swal.fire({
      title: '¿Estas Seguro?',
      text: "No hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar de todas formas!'
    }).then((result) => {
      if (result.isConfirmed) {
        //
        dispatch(borrarProductoAction(id));


      }
    })

  }

  const redireccionaEdicion = producto =>{
      dispatch(obtenerProductoEditar(producto));
      history.push(`/productos/editar/${producto.id}`);
  }

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">$ {producto.precio}</span>
      </td>
      <td className="acciones">
        <button
          onClick={()=>redireccionaEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={()=>confirmarElimianarProducto(producto.id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
