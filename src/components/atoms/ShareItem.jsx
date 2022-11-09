const ShareItem = ({ icon: Icon, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-gray-500 hover:text-gray-700 transition-colors text-2xl"
    >
      <Icon />
    </a>
  )
}

export default ShareItem
