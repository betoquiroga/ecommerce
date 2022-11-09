import axios from "axios"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../../../env"
import { CartContext } from "../../context/CartContext"
import { token } from "../../helpers/Auth"
import SummaryAmount from "../Atoms/SummaryAmount"
import PaypalPayment from "./PaypalPayment"

const OrderSummary = ({ total, order, setOrder }) => {
  const { state } = useContext(CartContext)

  const iva = total * 0.18
  const subtotal = total * 0.82
  const shipping = 5

  const handleOrder = () => {
    const products = state.cart.map((p) => {
      return {
        product_id: p.id,
        amount: 1,
        unit_price: p.price,
      }
    })
    const data = {
      products,
    }
    axios
      .post(`${API_URL}/private/purchase-orders`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenEDcommerce")}`,
        },
      })
      .then((r) => {
        setOrder(r.data.data)
      })
  }

  return (
    <section className="bg-slate-100/60 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Resumen de compra</h2>
      <div className="mb-4">
        <SummaryAmount text="Subtotal" price={subtotal} />
        <SummaryAmount text="Costo de envío" price={shipping} />
        <SummaryAmount text="IVA" price={iva} />
        <SummaryAmount text="Total" price={total + shipping} />
      </div>
      {token() && !order && state.cart.length > 0 && (
        <button
          className="bg-sky-600 hover:bg-sky-700 transition-colors w-full text-base"
          onClick={handleOrder}
        >
          Pagar (PayPal)
        </button>
      )}
      {!token() && state.cart.length > 0 && (
        <>
          <Link
            to="/login"
            className="button bg-sky-600 hover:bg-sky-700 transition-colors w-full text-base text-center"
          >
            Iniciar sesión
          </Link>
          <p className="text-xs italic text-center text-gray-500">
            *Para poder pagar debes iniciar sesión primero
          </p>
        </>
      )}
      {order && <PaypalPayment value={total} order={order} />}
    </section>
  )
}

export default OrderSummary
