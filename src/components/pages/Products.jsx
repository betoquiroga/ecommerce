import { useEffect } from "react"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import Loader from "../atoms/Loader"
import ProductCard from "../molecules/ProductCard"

const Products = () => {
  const { data, loading, error } = useFetch("public/products")
  const [result, setResult] = useState([])

  useEffect(() => {
    if (data) setResult(data)
  }, [data])

  const handleFilter = (e) => {
    const filterValue = e.target.value.toLocaleLowerCase()

    setResult(
      data.filter((p) =>
        JSON.stringify(p).toLocaleLowerCase().includes(filterValue)
      )
    )
  }

  if (loading) return <Loader />
  if (error) return <div>{error?.message}</div>

  return (
    <section className="py-16 max-w-256 m-auto">
      <h1 className="text-3xl mb-6">Explora nuestros productos</h1>
      <input
        onChange={handleFilter}
        type="text"
        placeholder="Filtro de productos"
        className="mb-4"
      />
      <div className="grid grid-cols-4 gap-6">
        {result.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
