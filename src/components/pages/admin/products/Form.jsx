import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../../../constants/env"
import { token } from "../../../../helpers/auth"
import Loader from "../../../atoms/Loader"

const Form = () => {
  const nav = useNavigate()
  const params = useParams()

  const [hasDelivery, setHasDelivery] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params?.id) {
      setLoading(true)
      axios
        .get(`${API_URL}/public/products/${params.id}`)
        .then((data) => {
          setProduct(data.data.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  useEffect(() => {
    if (!product) return
    setIsNew(product.features.stats.isNew)
    setHasDelivery(product.features.stats.hasDelivery)
  }, [product])

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

    if (!params.id) {
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
    } else {
      axios
        .put(`${API_URL}/admin/products/${params.id}`, body, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then(() => {
          nav("/admin/productos")
        })
        .catch((err) => setError(err))
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">
          {`${params.iD ? "Editar" : "Crear"}`} producto
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="productName">Nombre del producto</label>
              <input
                type="text"
                name="productName"
                defaultValue={product && product.product_name}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                name="price"
                required
                defaultValue={product && product.price}
              />
            </div>
            <div>
              <label htmlFor="price">Vendidos</label>
              <input
                type="number"
                name="sold"
                step="1"
                required
                defaultValue={product && product.features.stats.sold}
              />
            </div>
            <div>
              <label htmlFor="image1">Imagen 1</label>
              <input
                type="text"
                name="image1"
                required
                defaultValue={product && product.images[0]}
              />
            </div>
            <div>
              <label htmlFor="color">Marca</label>
              <input
                type="text"
                name="brand"
                required
                defaultValue={product && product.features.details.brand}
              />
            </div>
            <div>
              <label htmlFor="color">Modelo</label>
              <input
                type="text"
                name="model"
                required
                defaultValue={product && product.features.details.model}
              />
            </div>
            <div>
              <label htmlFor="color">Color</label>
              <input
                type="text"
                name="color"
                required
                defaultValue={product && product.features.details.color}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="color">Año</label>
                <input
                  type="text"
                  name="year"
                  required
                  defaultValue={product && product.features.details.year}
                />
              </div>
              <div>
                <p htmlFor="delivery">Rating</p>
                <input
                  type="number"
                  name="rating"
                  required
                  defaultValue={product && product.features.stats.rating}
                  min="1"
                  max="5"
                  step="1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                required
                defaultValue={product && product.description}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Categoría</label>
              <select
                name="category"
                className="outline-none h-9 rounded"
                defaultValue={
                  product ? product.features.details.category : "Otros"
                }
              >
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
