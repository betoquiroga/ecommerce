import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../../constants/env"
import { CartContext } from "../../context/CartContext"

const Product = () => {
  const params = useParams()
  const { dispatch } = useContext(CartContext)
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`${API_URL}/public/products/${params.id}`).then((resp) => {
      setProduct(resp.data.data)
    })
  }, [])

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    })
  }

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    })
  }

  return (
    <div>
      <h1 className="text-3xl">Producto: {product?.product_name}</h1>
      <p>{JSON.stringify(product)}</p>
      <button className="bg-gradient" onClick={addToCart}>
        AGREGAR AL CARRITO
      </button>
      <button className="bg-gradient" onClick={removeFromCart}>
        QUITAR DEL CARRITO
      </button>
    </div>
  )
}

export default Product
