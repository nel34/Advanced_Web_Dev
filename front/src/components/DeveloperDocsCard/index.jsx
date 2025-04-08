import './index.sass'

export default function DeveloperDocsCard() {
  const docs = [
    { name: 'Authentification', url: 'http://localhost:8080/api/auth/docs' },
    { name: 'Restaurants', url: 'http://localhost:8080/api/restaurants/docs/' },
    { name: 'Produits', url: 'http://localhost:8080/api/products/docs/' },
    { name: 'Menus', url: 'http://localhost:8080/api/menus/docs/' },
    { name: 'Commandes', url: 'http://localhost:8080/api/orders/docs' },
    { name: 'Développement', url: 'http://localhost:8080/api/developer/docs/' },
    { name: 'Technique', url: 'http://localhost:8080/api/technical/docs/' },
  ]

  return (
    <div className='developer-docs-card'>
      <h2>Documentation des APIs</h2>
      <p>Consultez les documentation des différentes APIs REST de nos microservices.</p>
      <div className='docs-grid'>
        {docs.map((doc, index) => (
          <div
            key={index}
            className='doc-item clickable'
            onClick={() => window.open(doc.url, '_blank')}
          >
            <span>{doc.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}