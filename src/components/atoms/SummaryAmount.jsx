import { formatPrice } from "../../helpers/number"

const SummaryAmount = ({ text, price }) => {
  return (
    <div className="flex justify-between items-center py-3.5 border-b border-b-slate-200">
      <span>{text}</span>
      <span className="font-semibold">{formatPrice(price)}</span>
    </div>
  )
}

export default SummaryAmount
