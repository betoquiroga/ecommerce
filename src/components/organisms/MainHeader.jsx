import Logo from "../molecules/header/Logo"

const MainHeader = ({ children }) => {
  return (
    <div className="fixed bg-gradient w-full z-10">
      <div className="w-full m-auto flex items-center lg:max-w-256">
        <Logo />
        {children}
      </div>
    </div>
  )
}

export default MainHeader
