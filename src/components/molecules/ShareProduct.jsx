import { BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs"
import { BASE_URL } from "../../constants/env"
import ShareItem from "../atoms/ShareItem"

const ShareProduct = ({ id }) => {
  const URL = `https://${BASE_URL}/products/${id}`
  return (
    <div>
      <p className="text-lg font-semibold mb-2">Comparte este producto</p>
      <div className="flex gap-2">
        <ShareItem
          icon={BsWhatsapp}
          url={`https://api.whatsapp.com/send?text=${URL}`}
        />
        <ShareItem
          icon={BsFacebook}
          url={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}
        />
        <ShareItem
          icon={BsTwitter}
          url={`https://twitter.com/intent/tweet?text=WOW!!!&url=${URL}`}
        />
      </div>
    </div>
  )
}

export default ShareProduct
