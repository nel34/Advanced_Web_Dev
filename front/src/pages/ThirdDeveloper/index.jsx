import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.sass'

export default function ThirdDeveloper() {
  const [apiKey, setApiKey] = useState(null)
  const [loadingKey, setLoadingKey] = useState(false)
  const [components, setComponents] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [showComponents, setShowComponents] = useState(false)
  const [apiKeyError, setApiKeyError] = useState(null)
  // const token = localStorage.getItem('accessToken')
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImRldmVsb3BlciIsImlhdCI6MTc0Mzk0MTk4NiwiZXhwIjoxNzQzOTQyODg2fQ.SD2if1I5clBx5L0aX3qC9NQA8CMvIlup2L3Bd2z1dD4";

  const fetchApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.get('http://localhost:8080/api/auth/developer/key', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false 
      })
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur récupération clé :', err)
    } finally {
      setLoadingKey(false)
    }
  }  

  const regenerateApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.put('http://localhost:8080/api/auth/developer/regenerate', null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur régénération :', err)
    } finally {
      setLoadingKey(false)
    }
  }
  
  const validateApiKey = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/developer/validatekey', {
        apiKey
      });
  
      return res.data.valid;
    } catch (err) {
      console.error('Erreur validation clé API :', err);
      return false;
    }
  };
  
  const fetchComponents = async () => {
    setLoadingComponents(true);
  
    const isValid = await validateApiKey();
    if (!isValid) {
      setApiKeyError("Clé API invalide ou expirée.");
      setLoadingComponents(false);
      return;
    }
  
    try {
      const res = await axios.get('http://localhost:8080/api/developer/components', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComponents(res.data);
    } catch (err) {
      console.error('Erreur récupération composants :', err);
    } finally {
      setLoadingComponents(false);
    }
  };
  
  const downloadComponent = async (name) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/developer/components/${name}/download`, {
        responseType: 'blob', // Important pour récupérer un fichier
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Erreur téléchargement composant :', err);
    }
  };
  
  useEffect(() => {
    fetchApiKey();
  }, []);  
  
  const toggleComponentList = async () => {
    if (!showComponents && components.length === 0) {
      await fetchComponents()
    }
    setShowComponents(!showComponents)
  }

  return (
    <div className="third-developer">
      <h1>Espace Développeur</h1>
  
      <section className="api-key-section">
        <h2>Votre clé API</h2>
        {loadingKey ? <p>Chargement...</p> : <code className="api-key">{apiKey || 'Aucune clé disponible'}</code>}
        <div className="actions">
          <button onClick={regenerateApiKey}>Régénérer la clé</button>
        </div>
      </section>
  
      <section className="components-section">
        <h2>Composants logiciels disponibles</h2>
  
        <button onClick={toggleComponentList} style={{ marginBottom: '15px' }}>
          {showComponents ? 'Masquer la liste' : 'Récupérer la liste des composants'}
        </button>
  
        {loadingComponents && <p>Chargement...</p>}
        {showComponents && !loadingComponents && (
          <>
            {apiKeyError ? (
              <p style={{ color: 'red', fontWeight: 'bold' }}>{apiKeyError}</p>
            ) : (
              <div className="components-list">
                {components.map((comp) => (
                  <div key={comp.id} className="component-card">
                    <h3>{comp.name}</h3>
                    <p>{comp.description}</p>
                    <small>Version : {comp.version}</small>
                    <button onClick={() => downloadComponent(comp.name)}>Télécharger</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}