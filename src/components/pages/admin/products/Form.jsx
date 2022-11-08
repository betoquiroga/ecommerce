import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../../../constants/env"
import { token } from "../../../../helpers/auth"

const Form = () => {
  const nav = useNavigate()
  const params = useParams()

  const [hasDelivery, setHasDelivery] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const [error, setError] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      product_name: e.target.productName.value,
      price: Number(e.target.price.value),
      images: [e.target.image1.value],
      description: e.target.description.value,
      features: {
        details: {
          color: e.target.color.value,
          brand: e.target.brand.value,
          model: e.target.model.value,
          year: e.target.year.value,
          category: e.target.category.value,
        },
        stats: {
          rating: Number(e.target.rating.value),
          sold: Number(e.target.sold.value),
          isNew,
          hasDelivery,
        },
      },
    }
    axios
      .post(`${API_URL}/admin/products`, body, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then(() => {
        nav("/admin/productos")
      })
      .catch((err) => setError(err))
  }

  return (
    <div className="pt-16 max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">
          {`${params.productID ? "Editar" : "Crear"}`} producto
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="productName">Nombre del producto</label>
              <input type="text" name="productName" required />
            </div>
            <div>
              <label htmlFor="price">Precio</label>
              <input type="number" name="price" required />
            </div>
            <div>
              <label htmlFor="price">Vendidos</label>
              <input type="number" name="sold" step="1" required />
            </div>
            <div>
              <label htmlFor="image1">Imagen 1</label>
              <input type="text" name="image1" required />
            </div>
            <div>
              <label htmlFor="color">Marca</label>
              <input type="text" name="brand" required />
            </div>
            <div>
              <label htmlFor="color">Modelo</label>
              <input type="text" name="model" required />
            </div>
            <div>
              <label htmlFor="color">Color</label>
              <input type="text" name="color" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="color">Año</label>
                <input type="text" name="year" required />
              </div>
              <div>
                <p htmlFor="delivery">Rating</p>
                <input
                  type="number"
                  name="rating"
                  required
                  min="1"
                  max="5"
                  step="1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea type="text" name="description" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Categoría</label>
              <select name="category" className="outline-none h-9 rounded">
                <option value="Otros" disabled selected>
                  Selecciona una categoría
                </option>
                <option value="Tecnología">Tecnología</option>
                <option value="Hogar">Hogar</option>
                <option value="Deportes">Deportes</option>
                <option value="Moda">Moda</option>
                <option value="Juguetes">Juguetes</option>
              </select>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="mb-2">Envio a domicilio</p>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1">
                    <span>Si</span>
                    <input
                      type="radio"
                      name="delivery"
                      className="mt-1"
                      onChange={() => setHasDelivery(true)}
                      checked={hasDelivery}
                    />
                  </label>
                  <label className="flex items-center gap-1">
                    <span>No</span>
                    <input
                      type="radio"
                      name="no-delivery"
                      className="mt-1"
                      onChange={() => setHasDelivery(false)}
                      checked={!hasDelivery}
                    />
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-2">Nuevo</p>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1">
                    <span>Si</span>
                    <input
                      type="radio"
                      name="new"
                      className="mt-1"
                      onChange={() => setIsNew(true)}
                      checked={isNew}
                    />
                  </label>
                  <label className="flex items-center gap-1">
                    <span>No</span>
                    <input
                      type="radio"
                      name="old"
                      className="mt-1"
                      onChange={() => setIsNew(false)}
                      checked={!isNew}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="bg-gradient">
            Guardar
          </button>
          <p>{error && JSON.stringify(error)}</p>
        </form>
      </section>
    </div>
  )
}

export default Form
