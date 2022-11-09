const ProductDetailItem = ({ type, value }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{type}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  )
}

export default ProductDetailItem
