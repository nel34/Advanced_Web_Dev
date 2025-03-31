import './index.sass'

export default function SearchBar({ placeholder }) {
  if (!placeholder) {
    placeholder = 'Rechercher...'
  }

  return (
    <div className="search-bar">
      <img src="https://img.icons8.com/ios-filled/50/000000/search.png" alt="search" className="search-bar__icon" />
      <input type="text" className="search-bar__input" placeholder={placeholder} />
    </div>
  )
}