const BuyButton = ({ text, icon: Icon, isGhost, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isGhost
          ? "bg-sky-700/30 text-sky-700 hover:bg-sky-700/40"
          : "bg-sky-700 hover:bg-sky-800 text-white"
      } flex items-center justify-center gap-2 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-0`}
    >
      {text}
      {Icon && <Icon />}
    </button>
  )
}

export default BuyButton
