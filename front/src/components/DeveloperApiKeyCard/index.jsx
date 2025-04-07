import './index.sass'

export default function DeveloperApiKeyCard({ apiKey, loadingKey, onRegenerate }) {
  return (
    <div className="developer-api-key-card">
      <h2>🔐 Votre clé API</h2>
      {loadingKey ? <p>Chargement...</p> : <code>{apiKey || 'Aucune clé disponible'}</code>}
      <button onClick={onRegenerate}>Régénérer la clé</button>
    </div>
  )
}