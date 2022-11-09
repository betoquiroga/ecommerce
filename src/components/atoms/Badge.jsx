const Badge = ({ text, color }) => {
  return (
    <span
      className={`${
        color ? color : "bg-orange-500"
      } py-1 px-2 rounded-lg text-xs text-white font-semibold`}
    >
      {text}
    </span>
  )
}

export default Badge
