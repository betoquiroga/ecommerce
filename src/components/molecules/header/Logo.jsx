import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div className="flex">
      <Link to="/">
        <img
          src="https://ed.team/images/logo/logo-monocolor.svg"
          alt="Logo EDteam White"
        />
      </Link>
    </div>
  )
}

export default Logo