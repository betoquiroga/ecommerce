import { token } from "../../../helpers/auth"
import useFetch from "../../../hooks/useFetch"
import Loader from "../../atoms/Loader"

const Sales = () => {
  const { data, loading, error } = useFetch("admin/invoices", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })

  if (loading) return <Loader />

  if (error) return <div>{error?.message}</div>

  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Ventas</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID de la compra</th>
              <th>Email del usuario</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.invoice.id}>
                <td>{new Date(p.invoice.created_at).toString()}</td>
                <td>{p.invoice.id}</td>
                <td>{p.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Sales
