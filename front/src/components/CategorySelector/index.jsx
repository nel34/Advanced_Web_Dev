import './index.sass'

export default function CategorySelector({ categories }) {
  // function that add clicked category to the url
  const handleCategoryClick = (category) => {
    const url = new URL(window.location.href)
    url.searchParams.set('category', category)
    window.history.pushState({}, '', url)
  }

  return (
    <div className='category-selector'>
      {categories.map((category, index) => (
        <div key={index} className='category-selector__item' onClick={() => handleCategoryClick(category)}>
          <img src={`/assets/categories/${category}.png`} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/categories/Default.png' }} alt={category} />
          <p>{category}</p>
        </div>
      ))}
    </div>
  )
}