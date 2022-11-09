import { AiFillStar } from "react-icons/ai"
import { formatRating } from "../../helpers/number"

const ProductRating = ({ rating = 0, className }) => {
  const missingStars = 5 - rating

  return (
    <div className={`${className ? className : ""} flex items-center`}>
      {[...Array(rating)].map((star, i) => {
        const starIndex = i + 1
        return (
          <AiFillStar key={starIndex} className="w-5 h-5 text-yellow-300" />
        )
      })}
      {[...Array(missingStars)].map((star, i) => {
        const starIndex = i + 1
        return <AiFillStar key={starIndex} className="w-5 h-5 text-gray-200" />
      })}
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
        {formatRating(rating)}
      </span>
    </div>
  )
}

export default ProductRating
