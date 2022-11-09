import useFetch from "../../hooks/useFetch"
import Loader from "../atoms/Loader"
import ProductCard from "./ProductCard"

const RelatedProducts = ({ title = "También te puede interesar" }) => {
  const { data, loading, error } = useFetch("public/products")

  if (loading) return <Loader />

  if (error) return <div>{error?.message}</div>

  const relatedProducts = data.slice(0, 4)

  return (
    <section className="pb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
