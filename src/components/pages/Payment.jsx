import { Link } from "react-router-dom"

const Payment = () => {
  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10 text-center">
        <h1 className="text-4xl mb-6">Tu pago se ha procesado con éxito!!!</h1>
        <Link to="/productos" className="button bg-gradient">
          Ver más productos
        </Link>
      </section>
    </div>
  )
}

export default Payment
