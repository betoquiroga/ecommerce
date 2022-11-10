import { useContext } from "react"
import { useParams } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import useFetch from "../../hooks/useFetch"
import Badge from "../atoms/Badge"
import BuyButton from "../atoms/BuyButton"
import Loader from "../atoms/Loader"
import ProductRating from "../atoms/ProductRating"
import PriceDetails from "../molecules/PriceDetails"
import ProductDetails from "../molecules/ProductDetails"
import ProductInformation from "../molecules/ProductInformation"
import RelatedProducts from "../molecules/RelatedProducts"
import ShareProduct from "../molecules/ShareProduct"

const Product = () => {
  const { state, dispatch } = useContext(CartContext)
  const params = useParams()
  const { data, loading, error } = useFetch(`public/products/${params.id}`)

  if (loading) return <Loader />
  if (error) return <div>{error?.message}</div>

  const { rating, sold, isNew, hasDelivery } = data.features.stats

  return (
    <div className="max-w-256 m-auto">
      <section className="py-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="rounded-lg overflow-hidden mb-5">
              <img
                className="align-middle"
                src={data.images[0]}
                alt={data.product_name}
              />
            </div>
            <ProductDetails details={data.features.details} isNew={isNew} />
          </div>
          <div>
            <span className="block text-gray-500 text-sm mb-2">
              {isNew ? "Nuevo" : "Usado"} | {sold} vendidos
            </span>
            <h1 className="text-xl lg:text-2xl font-semibold leading-7 lg:leading-6 text-gray-800 mb-4">
              {data.product_name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <ProductRating rating={rating} />
              {sold > 300 && <Badge text="Lo mas vendido" />}
              {isNew && <Badge text="Nuevo" color="bg-purple-500" />}
            </div>
            <PriceDetails price={data.price} />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <BuyButton text="Comprar ahora" />
              {!state.cart.find((p) => p.id === data.id) ? (
                <BuyButton
                  text="Agregar al carrito"
                  onClick={() => {
                    dispatch({ type: "ADD_TO_CART", payload: data })
                  }}
                  isGhost
                />
              ) : (
                <BuyButton
                  text="Quitar del carrito"
                  onClick={() => {
                    dispatch({ type: "REMOVE_FROM_CART", payload: data })
                  }}
                  isGhost
                />
              )}
            </div>
            <ProductInformation
              description={data.description}
              deliveryAvailable={hasDelivery}
            />
            <ShareProduct id={data.id} />
          </div>
        </div>
      </section>
      <RelatedProducts />
    </div>
  )
}

export default Product
