import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../../../../constants/env"
import { token } from "../../../../helpers/auth"
import useFetch from "../../../../hooks/useFetch"
import Loader from "../../../atoms/Loader"

const Table = () => {
  const { data, loading, error } = useFetch("public/products")

  const deleteProduct = (product) => {
    if (window.confirm("Estás seguro de eliminar?")) {
      axios
        .delete(`${API_URL}/admin/products/${product.id}`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then(() => alert("Producto eliminado"))
    }
  }

  if (loading) return <Loader />
  if (error) return <div>{error?.message}</div>

  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Productos</h1>
        <div className="pt-1 mb-12 pb-1">
          <Link className="bg-gradient button" to="/admin/productos/crear">
            Agregar producto
          </Link>
        </div>
        <table className="overflow-x-scroll">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4}>No existen productos actualmente</td>
              </tr>
            )}
            {data.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.product_name}</td>
                <td>{prod.price}</td>
                <td>
                  <Link to={`/admin/productos/editar/${prod.id}`}>Editar</Link>
                </td>
                <td>
                  <a
                    className="text-red-600 hover:cursor-pointer"
                    onClick={() => deleteProduct(prod)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Table
