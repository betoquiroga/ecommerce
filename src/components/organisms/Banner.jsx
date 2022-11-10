const Banner = () => {
  return (
    <section className="bg-gray-900 relative pt-20 pb-20 px-8">
      <div className="max-w-256 mx-auto grid grid-cols-3 items-center px-8 lg:px-0">
        <div className="col-span-2 text-white">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">
            <span className="block mb-1">Bienvenido a</span>
            <span className="text-cyan-500 text-4xl lg:text-6xl">
              EDcommerce
            </span>
          </h1>
          <p className="text-lg">Donde comprar es sinónimo de gastar plata</p>
        </div>
        <div className="max-w-xs">
          <img src="/cartas.png" alt="Agregar al carrito" />
        </div>
      </div>
    </section>
  )
}

export default Banner
