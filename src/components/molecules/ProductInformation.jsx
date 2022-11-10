import { TbTruckDelivery } from "react-icons/tb"
import { BiStore } from "react-icons/bi"

const ProductInformation = ({ description, deliveryAvailable }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descripción del producto</h2>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">
          Disponibilidad y tiempos de entrega
        </p>
        <div className="flex items-center gap-2 text-gray-500">
          {deliveryAvailable ? (
            <TbTruckDelivery className="text-xl" />
          ) : (
            <BiStore className="text-xl" />
          )}
          <p>
            {deliveryAvailable
              ? "Disponible para despacho a domicilio"
              : "Disponible para recojo en tienda"}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProductInformation
